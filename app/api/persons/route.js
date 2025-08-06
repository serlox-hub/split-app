import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(request) {
  const userId = request.headers.get("x-user-id");
  const body = await request.json();
  const { name } = body;

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

export async function GET(request) {
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Falta el campo userId" }), {
      status: 400,
    });
  }

  const { data: person, error } = await supabaseAdmin
    .from("persons")
    .select()
    .eq("user_id", userId)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(person), { status: 200 });
}

export async function PUT(request) {
  const userId = request.headers.get("x-user-id");
  const body = await request.json();
  const { name } = body;

  if (!userId || !name) {
    return new Response(
      JSON.stringify({ error: "Faltan campos: id y name son requeridos" }),
      {
        status: 400,
      }
    );
  }

  const { data: person, error } = await supabaseAdmin
    .from("persons")
    .update({ name })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(person), { status: 200 });
}
