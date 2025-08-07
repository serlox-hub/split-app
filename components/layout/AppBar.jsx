import { Box, Flex, Spacer } from "@chakra-ui/react";
import { AppBarAvatar } from "./AppBarAvatar";
import { AppBarHeader } from "./AppBarHeader";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import { getUserCookieHeader } from "@/lib/util/serverApiUtils";

export default async function AppBar() {
  const t = await getTranslations();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    headers: await getUserCookieHeader(),
    cache: "no-store",
  });
  if (response.status === 401) redirect(ROUTES.HOME.path());
  if (!response.ok) throw new Error(t("common.unexpectedError"));

  const user = await response.json();

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
