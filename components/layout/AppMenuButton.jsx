import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import {
  ThemeSelectorOpt,
  UserSettingsOpt,
} from "@/components/layout/menuOptions";
import { useTranslations } from "next-intl";

export function AppMenuButton() {
  const t = useTranslations();
  const isThemeSelectorEnabled =
    process.env.APP_THEME_SELECTOR_ENABLED === "true";

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          aria-label={t("appBar.menu")}
          variant="plain"
          color={"blackAlpha.900"}
        >
          <HiDotsVertical />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {isThemeSelectorEnabled && <ThemeSelectorOpt />}
            <UserSettingsOpt />
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
