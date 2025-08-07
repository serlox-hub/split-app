import { fetchWithHandling } from "@/lib/util/fetchUtils";

export async function getUserGroups() {
  return await fetchWithHandling("/api/groups");
}

export async function createGroup(name) {
  return await fetchWithHandling("/api/groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

export async function deleteGroup(groupId) {
  return await fetchWithHandling(`/api/groups/${groupId}`, {
    method: "DELETE",
  });
}
