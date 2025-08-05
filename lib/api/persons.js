import { createUserId } from "@/lib/userUtils";

export async function createPerson(name) {
  if (!name) {
    return { success: false, error: "Invalid data" };
  }

  try {
    const res = await fetch("/api/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        userId: createUserId(),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      return {
        success: false,
        error: err?.message || `Request failed with status ${res.status}`,
      };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
