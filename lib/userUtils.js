import { v4 as uuidv4 } from "uuid";

export function getOrCreateUserId() {
  if (typeof window === "undefined") return null;

  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
  }
  return userId;
}
