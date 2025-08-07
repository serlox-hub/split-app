import { Provider } from "@/components/ui/provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: APP_NAME,
  description:
    "Split App - Easily manage group expenses, no sign-ups, no hassle.",
};

export default async function BaseLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
