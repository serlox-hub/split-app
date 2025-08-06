import { createUserId } from "@/lib/util/userUtils";
import { fetchWithHandling } from "@/lib/util/fetchUtils";

export async function createPerson(name) {
  return await fetchWithHandling("/api/persons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": createUserId(),
    },
    body: JSON.stringify({
      name,
    }),
  });
}

export async function getPersonByUserId(userId) {
  return await fetchWithHandling(`/api/persons?userId=${userId}`, {
    headers: { "x-user-id": userId },
  });
}

export async function updatePerson(userId, name) {
  return await fetchWithHandling("/api/persons", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({ userId, name }),
  });
}
