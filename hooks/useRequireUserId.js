"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserId } from "@/lib/userUtils";

export function useRequireUserId(redirectTo = "/") {
  const router = useRouter();

  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      router.replace(redirectTo);
    }
  }, [router, redirectTo]);
}
