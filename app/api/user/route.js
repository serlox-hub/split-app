import { supabaseAdmin } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";
import { getUserCookie, setUserCookie } from "@/lib/util/serverApiUtils";

export async function GET() {
  const userId = await getUserCookie();

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId cookie" },
      { status: 401 }
    );
  }

  const { data: person, error } = await supabaseAdmin
    .from("persons")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !person) {
    return NextResponse.json(
      { error: error?.message || "Person not found" },
      { status: 404 }
    );
  }

  const response = NextResponse.json(person, { status: 200 });
  setUserCookie(response, person.id); // Refresh cookie
  return response;
}

export async function POST(request) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: "Missing field: name" }, { status: 400 });
  }

  const { data: person, error } = await supabaseAdmin
    .from("persons")
    .insert([{ name }])
    .select()
    .single();

  if (error || !person) {
    return NextResponse.json(
      { error: error?.message || "Failed to create person" },
      { status: 500 }
    );
  }

  const response = NextResponse.json(person, { status: 201 });
  setUserCookie(response, person.id);
  return response;
}

export async function PUT(request) {
  const userId = await getUserCookie();

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId cookie" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: "Missing field: name" }, { status: 400 });
  }

  const { data: person, error } = await supabaseAdmin
    .from("persons")
    .update({ name })
    .eq("id", userId)
    .select()
    .single();

  if (error || !person) {
    return NextResponse.json(
      { error: error?.message || "Failed to update person" },
      { status: 500 }
    );
  }

  return NextResponse.json(person, { status: 200 });
}
