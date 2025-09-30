import { randomBytes, createHash } from "crypto";

export function randomToken(bytes = 48) {
  return randomBytes(bytes).toString("base64url");
}
export function sha256Base64Url(input) {
  return createHash("sha256").update(input).digest("base64url");
}
