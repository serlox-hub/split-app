"use client";

import {
  Box,
  Flex,
  Heading,
  Avatar,
  Spacer,
  Input,
  Button,
  HStack,
  Text,
  Dialog,
  Float,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

export default function AppBar() {
  const t = useTranslations("app");
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const stored = "getUserName()"; // Replace with actual function to get stored name
    if (stored) setName(stored);
    // else open dialog to set name
  }, []);

  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 60%, 60%)`;
  }

  const avatarBg = stringToColor(name);

  const handleSave = () => {
    const trimmed = inputName.trim();
    if (!trimmed) return;
    //setUserName(trimmed); // Replace with actual function to save name
    setName(trimmed);
  };

  return (
    <Box
      as="header"
      bg="gray.50"
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor="gray.200"
      w="100%"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex align="center">
        <Heading color={avatarBg} size="md">
          {t("name")}
        </Heading>
        <Spacer />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Box
              position="relative"
              cursor="pointer"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <Avatar.Root colorpalette={avatarBg} size="md">
                <Avatar.Fallback name={hovering ? " " : name} />
                {hovering && (
                  <Float placement="center" offsetX="1" offsetY="1">
                    <FiEdit2 />
                  </Float>
                )}
              </Avatar.Root>
            </Box>
          </Dialog.Trigger>

          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>{t("editYourName")}</Dialog.Title>
              <Dialog.Description>
                <Text mb={2}>{t("namePlaceholder")}</Text>
              </Dialog.Description>

              <Input
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder={t("namePlaceholder")}
                mb={4}
              />

              <HStack justify="flex-end">
                <Dialog.CloseTrigger asChild>
                  <Button variant="ghost">{t("cancel")}</Button>
                </Dialog.CloseTrigger>
                <Dialog.CloseTrigger asChild>
                  <Button colorScheme="primary" onClick={handleSave}>
                    {t("save")}
                  </Button>
                </Dialog.CloseTrigger>
              </HStack>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      </Flex>
    </Box>
  );
}
