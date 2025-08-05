"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, VStack, Spinner } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useTranslations } from "next-intl";
import { useRedirectIfUserIdExists } from "@/hooks/useRedirectIfUserIdExists";
import { createPerson } from "@/lib/api/persons";

export function OnboardingForm() {
  const [name, setName] = useState("");
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("home");

  useRedirectIfUserIdExists("/groups", () => setChecking(false));

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setLoading(true);
    const response = await createPerson(trimmed);
    setLoading(false);
    if (!response.success) {
      toaster.create({
        title: t("errorCreatingPerson"),
        variant: "destructive",
      });
      return;
    } else {
      toaster.create({
        title: t("welcome", { name: trimmed }),
        description: t("redirectDescription"),
      });
      router.push("/groups");
    }
  };

  if (checking) {
    return <Spinner size="md" color={"#54c1be"} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <VStack spacing={4} w="full" maxW="md">
        <Input
          placeholder={t("placeholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb={1}
        />
        <Button
          loading={loading}
          colorScheme="primary"
          size="lg"
          w="full"
          onClick={handleSubmit}
          type="submit"
          isDisabled={!name.trim()}
        >
          {t("getStarted")}
        </Button>
      </VStack>
    </form>
  );
}
