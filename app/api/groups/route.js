import { supabaseAdmin } from '@/lib/supabaseServer';

export async function GET(request) {
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Falta userId" }), { status: 400 });
  }

  const { data: persons, error } = await supabaseAdmin
    .from("persons")
    .select("group_id")
    .eq("user_id", userId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const groupIds = [...new Set(persons.map((p) => p.group_id))];

  if (groupIds.length === 0) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const { data: groups, error: groupError } = await supabaseAdmin
    .from("groups")
    .select()
    .in("id", groupIds);

  if (groupError) {
    return new Response(JSON.stringify({ error: groupError.message }), { status: 500 });
  }

  return new Response(JSON.stringify(groups), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const { name, userId } = body;

  if (!name || !userId) {
    return new Response(JSON.stringify({ error: "Faltan campos: name y userId son requeridos" }), {
      status: 400,
    });
  }

  const { data: group, error } = await supabaseAdmin
    .from("groups")
    .insert([{ name }])
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Crear una persona asociada al grupo y al userId
  await supabaseAdmin.from("persons").insert([
    {
      name: "Yo", // puedes dejar que lo cambie luego
      group_id: group.id,
      user_id: userId,
    },
  ]);

  return new Response(JSON.stringify(group), { status: 201 });
}
