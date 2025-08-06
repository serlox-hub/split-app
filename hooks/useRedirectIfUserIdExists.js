"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserId } from "@/lib/util/userUtils";

export function useRedirectIfUserIdExists(redirectTo, onNoUserId) {
  const router = useRouter();

  useEffect(() => {
    const uid = getUserId();
    if (uid) {
      router.replace(redirectTo);
    } else {
      onNoUserId?.();
    }
  }, [router, redirectTo, onNoUserId]);
}
