import { supabaseAdmin } from "@/lib/supabaseServer";
import { getUserCookie } from "@/server/util/cookieUtils";

export async function GET() {
  const userId = await getUserCookie();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), {
      status: 400,
    });
  }

  const { data: person, error: personError } = await supabaseAdmin
    .from("persons")
    .select("id")
    .eq("id", userId)
    .single();

  if (personError || !person) {
    return new Response(
      JSON.stringify({ error: "No person found for this user id" }),
      { status: 404 }
    );
  }

  // Fetch groups where the person is a member with their members
  const { data: groups, error: groupsError } = await supabaseAdmin
    .from("group_members")
    .select(
      `
      group:groups (
        id,
        name,
        created_at,
        members:group_members (
          person:persons (
            id,
            name
          )
        )
      )
    `
    )
    .eq("person_id", person.id);

  if (groupsError) {
    return new Response(JSON.stringify({ error: groupsError.message }), {
      status: 500,
    });
  }

  // Plainly format the response to include group details and members
  const groupList = groups.map((gm) => {
    const group = gm.group;
    const members = group.members.map((m) => m.person);
    return {
      id: group.id,
      name: group.name,
      created_at: group.created_at,
      members,
    };
  });

  return new Response(JSON.stringify(groupList), { status: 200 });
}

export async function POST(request) {
  const userId = await getUserCookie();
  const { name } = await request.json();

  if (!userId || !name) {
    return new Response(
      JSON.stringify({ error: "Person not found for the given userId" }),
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

  // Create the group
  const { data: group, error: groupError } = await supabaseAdmin
    .from("groups")
    .insert({ name })
    .select()
    .single();

  if (groupError) {
    return new Response(JSON.stringify({ error: groupError.message }), {
      status: 500,
    });
  }

  const { error: memberError } = await supabaseAdmin
    .from("group_members")
    .insert({ group_id: group.id, person_id: person.id });

  if (memberError) {
    return new Response(
      JSON.stringify({ error: "Group created but failed to assign member" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify(group), { status: 201 });
}

export async function DELETE(request, { params }) {
  const groupId = params?.id;
  const userId = await getUserCookie();

  if (!userId || !groupId) {
    return new Response(
      JSON.stringify({ error: "Missing userId or groupId" }),
      { status: 400 }
    );
  }

  const { data: person, error: personError } = await supabaseAdmin
    .from("persons")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (personError || !person) {
    return new Response(
      JSON.stringify({ error: "Person not found for the given userId" }),
      { status: 404 }
    );
  }

  const { count, error: membershipError } = await supabaseAdmin
    .from("group_members")
    .select("*", { count: "exact", head: true })
    .eq("group_id", groupId)
    .eq("person_id", person.id);

  if (membershipError) {
    return new Response(JSON.stringify({ error: membershipError.message }), {
      status: 500,
    });
  }

  if (count === 0) {
    return new Response(
      JSON.stringify({ error: "You are not a member of this group" }),
      { status: 403 }
    );
  }

  const { error: deleteError } = await supabaseAdmin
    .from("groups")
    .delete()
    .eq("id", groupId);

  if (deleteError) {
    return new Response(JSON.stringify({ error: deleteError.message }), {
      status: 500,
    });
  }

  return new Response(null, { status: 204 });
}
