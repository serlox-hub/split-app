"use server";

import { supabaseAdmin } from "@/lib/supabaseServer";
import { setUserCookie, getUserCookie } from "@/server/util/cookieUtils";

export async function createUserAction(name) {
  const trimmed = name?.trim();
  if (!trimmed) return { success: false, error: "Missing field: name" };

  const { data: user, error } = await supabaseAdmin
    .from("persons")
    .insert([{ name: trimmed }])
    .select()
    .single();

  if (error || !user) {
    return {
      success: false,
      error: error?.message || "Failed to create person",
    };
  }

  setUserCookie(user.id);

  return { success: true, user };
}

export async function updateUserAction(name) {
  const trimmed = name?.trim();
  if (!trimmed) return { success: false, error: "Missing field: name" };

  const userId = await getUserCookie();

  if (!userId) return { success: false, error: "Missing userId cookie" };

  const { data: user, error } = await supabaseAdmin
    .from("persons")
    .update({ name: trimmed })
    .eq("id", userId)
    .select()
    .single();

  if (error || !user) {
    return {
      success: false,
      error: error?.message || "Failed to update person",
    };
  }

  return { success: true, user };
}
