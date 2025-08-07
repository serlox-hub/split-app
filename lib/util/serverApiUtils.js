import { cookies } from "next/headers";

const USER_COOKIE_NAME = "userId";

export function setUserCookie(response, userId) {
  response.cookies.set(USER_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 730, // 2 years
  });
}

export async function getUserCookie() {
  const myCookies = await cookies();
  const cookie = myCookies.get(USER_COOKIE_NAME);
  return cookie ? cookie.value : null;
}

export async function getUserCookieHeader() {
  const cookie = await getUserCookie();
  console.log("cookie", cookie);
  if (!cookie) return {};
  return { Cookie: `userId=${cookie}` };
}
