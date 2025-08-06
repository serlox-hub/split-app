"use client";

import { getPersonByUserId, updatePerson } from "@/lib/api/persons";
import { getUserId } from "@/lib/util/userUtils";
import { Box, Flex, Heading, Avatar, Spacer, Float } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { toaster } from "../ui/toaster";
import { getColorFromString } from "@/lib/util/colorUtils";
import { OneInputDialog } from "../dialogs/OneInputDialog";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";

export default function AppBar() {
  const t = useTranslations();
  const [name, setName] = useState("");
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const fetchPerson = async () => {
      const userId = getUserId();
      if (!userId) return; // Automatically redirected to home if no userId

      const result = await getPersonByUserId(userId);
      if (!result.success) return showUnexpectedErrorToast(t);

      const person = result?.data;
      setName(person.name);
    };

    fetchPerson();
  }, [t]);

  const handleSave = async (value) => {
    const response = await updatePerson(getUserId(), value);
    if (response.success) {
      toaster.create({
        title: t("app.nameUpdated"),
        variant: "success",
      });
    }
    setName(value);
    return response.success;
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
          {t("app.name")}
        </Heading>
        <Spacer />
        <OneInputDialog
          title={t("app.editYourName")}
          placeholder={t("app.namePlaceholder")}
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
