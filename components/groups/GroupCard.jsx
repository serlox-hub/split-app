import {
  Avatar,
  AvatarGroup,
  Card,
  Checkbox,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { getColorFromString } from "@/lib/util/colorUtils";

export function GroupCard({ group, onClick, checked, onCheck }) {
  const handleClick = (event, groupId) => {
    event.stopPropagation();
    if (typeof onClick === "function") onClick(groupId);
  };

  const handleCheck = (event, groupId) => {
    event.stopPropagation();
    if (typeof onCheck === "function") onCheck(groupId);
  };

  return (
    <Card.Root
      key={group.id}
      cursor="pointer"
      onClick={handleClick}
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
            checked={checked}
            cursor="pointer"
            _hover={{ bg: "gray.700" }}
            onClick={handleCheck}
          />
        </Checkbox.Root>
      </Flex>
    </Card.Root>
  );
}
