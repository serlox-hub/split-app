"use client";

import { updatePerson } from "@/lib/api/persons";
import { getUserId } from "@/lib/util/userUtils";
import { Box, Flex, Heading, Avatar, Spacer, Float } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { toaster } from "../ui/toaster";
import { getColorFromString } from "@/lib/util/colorUtils";
import { OneInputDialog } from "../dialogs/OneInputDialog";
import { useUser } from "../providers/UserProvider";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";
import { APP_NAME } from "@/lib/constants";

export default function AppBar() {
  const t = useTranslations();
  const { user, setUser } = useUser();
  const [hovering, setHovering] = useState(false);

  const name = user?.name || "";

  const handleSave = async (value) => {
    const result = await updatePerson(getUserId(), value);
    if (!result.success) {
      showUnexpectedErrorToast(t);
    } else {
      setUser({ ...user, name: value });
      toaster.create({
        title: t("appBar.nameUpdated"),
        variant: "success",
      });
    }
    return result.success;
  };

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
        <Heading color={"blackAlpha.900"} size="xl" fontWeight="bold">
          {APP_NAME}
        </Heading>
        <Spacer />
        <OneInputDialog
          title={t("appBar.editYourName")}
          placeholder={t("appBar.namePlaceholder")}
          defaultValue={name}
          onSubmit={handleSave}
          trigger={
            <Avatar.Root
              colorPalette={getColorFromString(name)}
              size="md"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <Avatar.Fallback name={hovering ? " " : name} />
              {hovering && (
                <Float placement="center" offsetX="1" offsetY="1">
                  <FiEdit2 />
                </Float>
              )}
            </Avatar.Root>
          }
        />
      </Flex>
    </Box>
  );
}
