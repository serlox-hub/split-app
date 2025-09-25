import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { ROUTES } from "./lib/constants";
import {
  getUserCookie,
  updateCookieInResponse,
} from "./server/util/cookieUtils";

const intl = createMiddleware(routing);
const LOCALES = routing.locales;

function getLocaleFromPath(pathname) {
  const first = pathname.split("/")[1];
  return LOCALES?.includes(first) ? first : null;
}

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  const locale = getLocaleFromPath(pathname);

  // 1) If there is no locale, let next-intl add it (redirects to /{locale}/*)
  if (!locale) return intl(req);

  // 2) If there is a locale apply the following rules
  const userId = await getUserCookie();
  const homePath = ROUTES.HOME.path();
  const withoutLocale = pathname.replace(`/${locale}`, "") || homePath;

  // Rule 1: If there is a user and you are in home → /{locale}/groups
  if (userId && withoutLocale === homePath) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${ROUTES.GROUPS.path()}`;
    return NextResponse.redirect(url);
  }

  // Rule 2: If there is no user and you are not in home → /{locale}
  if (!userId && withoutLocale !== homePath) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // 3) If no redirect is needed, refresh cookie and let next-intl continue (headers, rewrites, etc.)
  const res = intl(req);
  updateCookieInResponse(res, userId);
  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
