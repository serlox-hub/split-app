import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(request) {
  const body = await request.json();
  const { name, userId } = body;

  if (!name || !userId) {
    return new Response(
      JSON.stringify({ error: "Faltan campos: name y userId son requeridos" }),
      {
        status: 400,
      }
    );
  }

  const { data: person, error } = await supabaseAdmin
    .from("persons")
    .insert([{ name, user_id: userId }])
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(person), { status: 201 });
}
