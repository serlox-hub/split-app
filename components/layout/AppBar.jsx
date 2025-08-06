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

export default function AppBar() {
  const t = useTranslations("app");
  const [name, setName] = useState("");
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const fetchPerson = async () => {
      const response = await getPersonByUserId(getUserId());
      console.log("Fetched person:", response);
      if (!response.success) {
        queueMicrotask(() => {
          toaster.create({
            title: t("errorFetchingPerson"),
            variant: "error",
          });
        });
        return;
      }

      const person = response.data;
      setName(person.name);
    };

    fetchPerson();
  }, [t]);

  const handleSave = async (value) => {
    const response = await updatePerson(getUserId(), value);
    if (response.success) {
      toaster.create({
        title: t("nameUpdated"),
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
          {t("name")}
        </Heading>
        <Spacer />
        <OneInputDialog
          title={t("editYourName")}
          placeholder={t("namePlaceholder")}
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
