import { getUserCookie } from "@/server/util/cookieUtils";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function getCurrentUser() {
  const userId = await getUserCookie();

  if (!userId) return null;

  const { data: person, error } = await supabaseAdmin
    .from("persons")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !person) return null;
  return person;
}
