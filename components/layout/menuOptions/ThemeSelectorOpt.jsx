"use client";

import { Menu } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useColorMode } from "@/components/ui/color-mode";

export function ThemeSelectorOpt() {
  const t = useTranslations();
  const { colorMode, toggleColorMode } = useColorMode();
  const themeLabel =
    colorMode === "light"
      ? t("appBar.opt_darkTheme")
      : t("appBar.opt_lightTheme");

  return (
    <Menu.Item value="theme_opt" onClick={toggleColorMode}>
      {themeLabel}
    </Menu.Item>
  );
}
