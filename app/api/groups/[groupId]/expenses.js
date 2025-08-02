import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const { groupId } = req.query;

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("group_id", groupId)
      .order("date", { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ expenses: data });
  }

  if (req.method === "POST") {
    const { description, amount, paidBy, participants, date } = req.body;
    const { data, error } = await supabase.from("expenses").insert([
      {
        group_id: groupId,
        description,
        amount,
        paid_by: paidBy,
        participants,
        date,
      },
    ]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data[0]);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Método ${req.method} no permitido`);
}
