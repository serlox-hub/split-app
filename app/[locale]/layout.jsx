import { Provider } from "@/components/ui/provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from "@/lib/constants";
import { AppBar } from "@/components/layout/AppBar";
import { getCurrentUser } from "@/server/user/service";
import { UserProvider } from "@/components/providers/UserProvider";

export const metadata = {
  title: APP_NAME,
  description:
    "Split App - Easily manage group expenses, no sign-ups, no hassle.",
};

export default async function BaseLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const user = await getCurrentUser();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <Provider>
            <UserProvider user={user}>
              {user && <AppBar />}
              {children}
              <Toaster />
            </UserProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
