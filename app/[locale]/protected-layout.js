"use client";

import { useRequireUserId } from "@/hooks/useRequireUserId";
import { Toaster } from "@/components/ui/toaster";

export function ProtectedLayout({ children }) {
  useRequireUserId();
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
