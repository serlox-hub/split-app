import { cookies } from "next/headers";

const USER_COOKIE_NAME = "userId";

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 730, // 2 years
};

export function updateCookieInResponse(res, userId) {
  res.cookies.set(USER_COOKIE_NAME, userId, COOKIE_CONFIG);
}

export async function setUserCookie(userId) {
  const myCookies = await cookies();
  myCookies.set(USER_COOKIE_NAME, userId, COOKIE_CONFIG);
}

export async function getUserCookie() {
  const myCookies = await cookies();
  const cookie = myCookies.get(USER_COOKIE_NAME);
  return cookie ? cookie.value : null;
}

export async function getUserCookieHeader() {
  const cookie = await getUserCookie();
  if (!cookie) return {};
  return { Cookie: `userId=${cookie}` };
}
