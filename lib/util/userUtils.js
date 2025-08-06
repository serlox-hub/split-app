import { v4 as uuidv4 } from "uuid";

export const getUserId = () => localStorage.getItem("userId");
export const createUserId = () => {
  localStorage.setItem("userId", uuidv4());
  return getUserId();
};
