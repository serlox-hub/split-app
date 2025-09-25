import { Avatar } from "@chakra-ui/react";
import { getColorFromString } from "@/lib/util/colorUtils";
import { Tooltip } from "@/components/ui/tooltip";
import { getCurrentUser } from "@/server/user/service";

export async function AppBarAvatar() {
  const user = await getCurrentUser();
  const name = user.name;
  const id = "app-bar-avatar";

  return (
    <Tooltip
      ids={{ trigger: id }}
      openDelay={200}
      closeDelay={100}
      showArrow
      content={user.name}
    >
      <Avatar.Root
        ids={{ root: id }}
        colorPalette={getColorFromString(name)}
        size="md"
      >
        <Avatar.Fallback name={name} />
      </Avatar.Root>
    </Tooltip>
  );
}
