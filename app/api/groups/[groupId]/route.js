import { supabaseAdmin } from "@/lib/supabaseServer";

export async function PUT(request) {
  const { name, groupId } = await request.json();
  const userId = request.headers.get("x-user-id");

  if (!userId || !groupId || !name) {
    return new Response(
      JSON.stringify({ error: "Missing userId, groupId or name" }),
      { status: 400 }
    );
  }

  const { data: person, error: personError } = await supabaseAdmin
    .from("persons")
    .select("id")
    .eq("id", userId)
    .single();

  if (personError || !person) {
    return new Response(
      JSON.stringify({ error: "Person not found for the given userId" }),
      { status: 404 }
    );
  }

  const { error: updateError } = await supabaseAdmin
    .from("groups")
    .update({ name })
    .eq("id", groupId);

  if (updateError) {
    return new Response(JSON.stringify({ error: updateError.message }), {
      status: 500,
    });
  }

  return new Response(null, { status: 204 });
}
