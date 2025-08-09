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

async function getUserCookieHeader() {
  const cookie = await getUserCookie();
  if (!cookie) return {};
  return { Cookie: `userId=${cookie}` };
}

export async function getCurrentUser() {
  const userId = await getUserCookie();

  if (!userId) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    headers: await getUserCookieHeader(),
    cache: "no-store",
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Unexpected error");

  return response.json();
}
