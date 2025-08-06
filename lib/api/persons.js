import { createUserId } from "@/lib/util/userUtils";

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

export async function getPersonByUserId(userId) {
  if (!userId) {
    return { success: false, error: "Invalid userId" };
  }

  try {
    const res = await fetch(`/api/persons?userId=${userId}`);

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

export async function updatePerson(userId, name) {
  if (!userId || !name) {
    return { success: false, error: "Invalid data" };
  }

  try {
    const res = await fetch("/api/persons", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, name }),
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
