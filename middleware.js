import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { getCurrentUser } from "@/server/user/service";
import { ROUTES } from "./lib/constants";
import { setUserCookie } from "./server/util/cookieUtils";

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
  const user = await getCurrentUser();
  const homePath = ROUTES.HOME.path();
  const withoutLocale = pathname.replace(`/${locale}`, "") || homePath;

  if (user) setUserCookie(user.id);

  // Rule 1: If there is a user and you are in home → /{locale}/groups
  if (user && withoutLocale === homePath) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${ROUTES.GROUPS.path()}`;
    return NextResponse.redirect(url);
  }

  // Rule 2: If there is no user and you are not in home → /{locale}
  if (!user && withoutLocale !== homePath) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // 3) If no redirect is needed, let next-intl continue (headers, rewrites, etc.)
  return intl(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
