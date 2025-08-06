import { createUserId } from "@/lib/util/userUtils";
import { fetchWithHandling } from "@/lib/util/fetchUtils";

export async function createPerson(name) {
  return await fetchWithHandling("/api/persons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      userId: createUserId(),
    }),
  });
}

export async function getPersonByUserId(userId) {
  return await fetchWithHandling(`/api/persons?userId=${userId}`);
}

export async function updatePerson(userId, name) {
  return await fetchWithHandling("/api/persons", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, name }),
  });
}
