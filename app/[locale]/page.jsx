"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { getUserName, setUserName } from "@/lib/userUtils";

export default function HomePage() {
  const t = useTranslations("home");
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = getUserName();

    if (storedName) {
      router.replace("/groups");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (trimmedName) {
      setUserName(trimmedName);
      router.push("/groups");
    }
  };

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <VStack spacing={4} maxW="md" w="full" textAlign="center">
        <Heading>{t("welcome")}</Heading>
        <Text>{t("askName")}</Text>
        <Input
          placeholder={t("placeholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="md"
        />
        <Button colorScheme="primary" w="full" onClick={handleSubmit}>
          {t("continue")}
        </Button>
      </VStack>
    </Box>
  );
}
