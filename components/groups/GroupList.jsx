import {
  Box,
  Heading,
  Checkbox,
  AvatarGroup,
  Avatar,
  Card,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getColorFromString } from "@/lib/util/colorUtils";

export default function GroupList({ groups }) {
  const router = useRouter();
  const t = useTranslations();

  if (!groups.length) return null;

  return (
    <Box>
      <Heading size="md" mb={4}>
        {t("groups.yourGroups")}
      </Heading>

      <Stack spacing={4}>
        {groups.map((group) => (
          <Card.Root
            key={group.id}
            cursor="pointer"
            onClick={() => router.push(`/${group.id}`)}
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
