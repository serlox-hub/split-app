"use client";

import { Heading } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { useTranslations } from "next-intl";

export function AppBarHeader() {
  const t = useTranslations();
  const pathname = usePathname().substring(3); // remove language path

  const getRouteTitle = () => {
    const allRoutes = Object.values(ROUTES);
    const pathConfig = allRoutes.find((route) => route.path === pathname);
    return pathConfig ? t(pathConfig.title) : null;
  };

  const title = getRouteTitle();

  return (
    <Heading color={"blackAlpha.900"} size="xl" fontWeight="bold">
      {title ?? APP_NAME}
    </Heading>
  );
}
