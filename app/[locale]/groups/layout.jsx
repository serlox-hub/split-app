"use client";

import AppBar from "@/components/layout/AppBar";
import { UserProvider } from "@/components/providers/UserProvider";

export default function LocaleLayout({ children }) {
  return (
    <UserProvider>
      <AppBar />
      {children}
    </UserProvider>
  );
}
