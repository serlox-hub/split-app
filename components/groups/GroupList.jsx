import { Box, Stack, Alert } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/lib/constants";
import { GroupCard } from "@/components/groups/GroupCard";
import { useState } from "react";

export default function GroupList({ groups }) {
  const router = useRouter();
  const t = useTranslations();
  const [selectedGroups, setSelectedGroups] = useState([]);

  const handleGroupClick = (groupId) => {
    router.push(ROUTES.GROUP.path(groupId));
  };

  const handleCheck = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      const newSelectedGroups = selectedGroups.filter((id) => id !== groupId);
      setSelectedGroups(newSelectedGroups);
    } else {
      const newSelectedGroups = [...selectedGroups, groupId];
      setSelectedGroups(newSelectedGroups);
    }
  };

  return (
    <Box>
      <Stack spacing={4}>
        {groups.length === 0 && (
          <Alert.Root status="info" variant="surface">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{t("groups.noGroups")}</Alert.Title>
              <Alert.Description>
                {t("groups.noGroupsDescription")}
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onClick={handleGroupClick}
            checked={selectedGroups.includes(group.id)}
            onCheck={handleCheck}
          />
        ))}
      </Stack>
    </Box>
  );
}
