"use server";

import { supabaseAdmin } from "@/lib/supabaseServer";
import { setUserCookie, getUserCookie } from "@/server/util/cookieUtils";
import { randomToken, sha256Base64Url } from "@/lib/util/cryptoUtils";
import { ROUTES } from "@/lib/constants";

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

export async function createUserLink() {
  const userId = await getUserCookie();
  if (!userId) return { success: false, error: "Missing userId cookie" };

  const raw = randomToken(48);
  const hash = sha256Base64Url(raw);
  const expiresAt = new Date(
    Date.now() +
      process.env.NEXT_PUBLIC_APP_MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000
  );

  const { data, error } = await supabaseAdmin
    .from("user_links")
    .insert([{ person_id: userId, token_hash: hash, expires_at: expiresAt }])
    .select()
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message || "Failed to create user link",
    };
  }

  return {
    success: true,
    link: `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTES.LOGIN_LINK.path(raw)}`,
  };
}
