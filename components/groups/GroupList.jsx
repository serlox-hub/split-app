import { Box, Heading, ListItem, ListRoot, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function GroupList({ groups }) {
  const router = useRouter();
  const t = useTranslations("groups");

  if (!groups.length) return null;

  return (
    <Box>
      <Heading size="md" mb={2}>
        {t("yourGroups")}
      </Heading>
      <ListRoot variant="unstyled">
        {groups.map((group) => (
          <ListItem key={group.id} mb={2}>
            <Button
              variant="outline"
              w="full"
              onClick={() => router.push(`/${group.id}`)}
            >
              {group.name}
            </Button>
          </ListItem>
        ))}
      </ListRoot>
    </Box>
  );
}
