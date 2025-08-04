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

export function getUserName() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("userName") || "";
}

export function setUserName(name) {
  if (typeof window === "undefined") return;
  localStorage.setItem("userName", name);
}
