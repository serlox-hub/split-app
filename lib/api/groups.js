export async function fetchUserGroups(userId) {
  try {
    const res = await fetch("/api/groups", {
      headers: { "x-user-id": userId },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Error loading groups");
    }

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid response format");

    return data;
  } catch (err) {
    console.error("fetchUserGroups error:", err);
    throw err;
  }
}
