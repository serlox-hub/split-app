import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const { groupId } = req.query;

  if (req.method === "GET") {
    const { data: group, error } = await supabase
      .from("groups")
      .select("id, created_at")
      .eq("id", groupId)
      .single();

    if (error && error.code === "PGRST116") {
      await supabase.from("groups").insert({ id: groupId });
      return res.status(200).json({ id: groupId, created_at: new Date() });
    }
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(group);
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Método ${req.method} no permitido`);
}
