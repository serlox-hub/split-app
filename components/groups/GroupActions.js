import { ActionBar, Portal, Button } from "@chakra-ui/react";
import { TbArrowsJoin2 } from "react-icons/tb";
import { CreateGroupBarAction } from "@/components/actionBar/CreateGroupBarAction";
import { useTranslations } from "next-intl";

export default function GroupActions({ onGroupCreated }) {
  const t = useTranslations("groups");

  return (
    <ActionBar.Root open>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <Button variant="outline" size="sm">
              <TbArrowsJoin2 />
              {t("join")}
            </Button>
            <CreateGroupBarAction onGroupCreated={onGroupCreated} />
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  );
}
