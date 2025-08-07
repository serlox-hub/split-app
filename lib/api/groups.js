import { fetchWithHandling } from "@/lib/util/fetchUtils";

export async function getUserGroups(userId) {
  return await fetchWithHandling("/api/groups", {
    headers: { "x-user-id": userId },
  });
}

export async function createGroup(userId, name) {
  return await fetchWithHandling("/api/groups", {
    method: "POST",
    headers: { "x-user-id": userId, "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

export async function deleteGroup(userId, groupId) {
  return await fetchWithHandling(`/api/groups/${groupId}`, {
    method: "DELETE",
    headers: { "x-user-id": userId },
  });
}
