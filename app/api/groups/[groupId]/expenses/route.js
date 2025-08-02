import { supabaseAdmin } from "@/lib/supabaseServer";

export async function GET(request, context) {
  const { groupId } = context.params;

  const { data, error } = await supabaseAdmin
    .from("expenses")
    .select("*")
    .eq("group_id", groupId)
    .order("date", { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request, context) {
  const { groupId } = context.params;
  const { description, amount, paid_by, participants, date } =
    await request.json();

  // Validaciones mínimas
  if (
    !description ||
    typeof amount !== "number" ||
    !Array.isArray(paid_by) ||
    paid_by.length === 0 ||
    !Array.isArray(participants) ||
    participants.length === 0
  ) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid fields" }),
      { status: 400 }
    );
  }

  // Validar suma de pagadores y participantes
  const totalPaid = paid_by.reduce((sum, p) => sum + p.amount, 0);
  const totalShare = participants.reduce((sum, p) => sum + p.share, 0);

  if (totalPaid > amount) {
    return new Response(
      JSON.stringify({ error: "Total paid exceeds amount" }),
      { status: 400 }
    );
  }
  if (totalShare > amount) {
    return new Response(
      JSON.stringify({ error: "Total participants' share exceeds amount" }),
      { status: 400 }
    );
  }

  // 1. Insertar gasto principal
  const { data: expenseData, error: expenseError } = await supabaseAdmin
    .from("expenses")
    .insert([
      {
        group_id: groupId,
        description,
        amount,
        date: date || new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (expenseError) {
    return new Response(JSON.stringify({ error: expenseError.message }), {
      status: 500,
    });
  }

  const expenseId = expenseData.id;

  // 2. Insertar quién pagó qué
  const payerRows = paid_by.map((payer) => ({
    expense_id: expenseId,
    person_id: payer.person_id,
    amount: payer.amount,
  }));

  const { error: payerError } = await supabaseAdmin
    .from("expense_payers")
    .insert(payerRows);

  if (payerError) {
    return new Response(JSON.stringify({ error: payerError.message }), {
      status: 500,
    });
  }

  // 3. Insertar participantes
  const participantRows = participants.map((participant) => ({
    expense_id: expenseId,
    person_id: participant.person_id,
    share: participant.share,
  }));

  const { error: participantError } = await supabaseAdmin
    .from("expense_participants")
    .insert(participantRows);

  if (participantError) {
    return new Response(JSON.stringify({ error: participantError.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(expenseData), { status: 201 });
}
