"use client";

import { ROUTES } from "@/lib/constants";
import { Menu } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function UserSettingsOpt() {
  const router = useRouter();
  const t = useTranslations();

  const handleClick = () => {
    router.push(ROUTES.USER.path());
  };

  return (
    <Menu.Item value="edit_name" onClick={handleClick}>
      {t("appBar.opt_userSettings")}
    </Menu.Item>
  );
}
