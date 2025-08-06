"use client";

import { useState } from "react";
import { Input, Button, VStack, Spinner, Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useTranslations } from "next-intl";
import { useRedirectIfUserIdExists } from "@/hooks/useRedirectIfUserIdExists";
import { createPerson } from "@/lib/api/persons";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";
import { ROUTES } from "@/lib/constants";

export function OnboardingForm() {
  const [name, setName] = useState("");
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const t = useTranslations();

  useRedirectIfUserIdExists(ROUTES.GROUPS, () => setChecking(false));

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const trimmed = name.trim();
    setInvalid(!trimmed);
    if (!trimmed) return;

    setLoading(true);
    const result = await createPerson(trimmed);
    setLoading(false);

    if (!result.success) return showUnexpectedErrorToast(t);

    // Automatically redirect to the groups page with useRedirectIfUserIdExists
    toaster.create({
      title: t("home.welcomeBack", { name: trimmed }),
      description: t("home.redirectDescription"),
    });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setName(value);
    setInvalid(false);
  };

  if (checking) {
    return <Spinner size="md" color={"brand.500"} />;
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
        <Field.Root invalid={invalid}>
          <Input
            placeholder={t("home.placeholder")}
            value={name}
            onChange={handleInputChange}
            mb={1}
          />
          <Field.ErrorText>{t("common.required")}</Field.ErrorText>
        </Field.Root>
        <Button
          loading={loading}
          colorScheme="primary"
          size="lg"
          w="full"
          onClick={handleSubmit}
          type="submit"
          isDisabled={!name.trim()}
        >
          {t("home.getStarted")}
        </Button>
      </VStack>
    </form>
  );
}
