import { fetchWithHandling } from "@/lib/util/fetchUtils";

export async function createUser(name) {
  return await fetchWithHandling("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
}

export async function getUser() {
  return await fetchWithHandling(`/api/user`);
}

export async function updateUser(name) {
  return await fetchWithHandling("/api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
}
