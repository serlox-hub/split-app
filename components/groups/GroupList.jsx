import {
  Box,
  Heading,
  Checkbox,
  AvatarGroup,
  Avatar,
  Card,
  Stack,
  Flex,
  Alert,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getColorFromString } from "@/lib/util/colorUtils";
import { ROUTES } from "@/lib/constants";

export default function GroupList({ groups }) {
  const router = useRouter();
  const t = useTranslations();

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
          <Card.Root
            key={group.id}
            cursor="pointer"
            onClick={() => router.push(ROUTES.GROUP.path(group.id))}
            _hover={{ shadow: "md", bg: "gray.900" }}
            transition="all 0.2s"
          >
            <Flex
              align="center"
              verticalAlign={"center"}
              justify="space-between"
              py={3}
              px={4}
            >
              <Stack>
                <Heading size="md">{group.name}</Heading>
                <Flex justify="space-between" align="center">
                  {group.members?.length > 0 && (
                    <AvatarGroup size="xs" stacking="first-on-top">
                      {group.members.map((member) => (
                        <Avatar.Root
                          key={member.id}
                          colorPalette={getColorFromString(member.name)}
                        >
                          <Avatar.Fallback name={member.name} />
                        </Avatar.Root>
                      ))}
                    </AvatarGroup>
                  )}
                </Flex>
              </Stack>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control
                  cursor="pointer"
                  _hover={{ bg: "gray.700" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle checkbox click if needed
                  }}
                />
              </Checkbox.Root>
            </Flex>
          </Card.Root>
        ))}
      </Stack>
    </Box>
  );
}
