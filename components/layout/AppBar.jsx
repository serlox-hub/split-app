import { Box, Flex, Spacer } from "@chakra-ui/react";
import { AppBarAvatar } from "./AppBarAvatar";
import { AppBarHeader } from "./AppBarHeader";
import { getCurrentUser } from "@/server/user/service";

export default async function AppBar() {
  const user = await getCurrentUser();

  return (
    <Box
      as="header"
      bg="brand.500"
      px={6}
      py={4}
      w="100%"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex align="center">
        <AppBarHeader />
        <Spacer />
        <AppBarAvatar userName={user?.name} />
      </Flex>
    </Box>
  );
}
