"use client";

import { useState } from "react";
import { Input, Button, VStack, Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useTranslations } from "next-intl";
import { createUser } from "@/lib/api/users";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function OnboardingForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const t = useTranslations();

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const trimmed = name.trim();
    setInvalid(!trimmed);
    if (!trimmed) return;

    setLoading(true);
    const result = await createUser(trimmed);
    setLoading(false);

    if (!result.success) return showUnexpectedErrorToast(t);

    toaster.create({
      title: t("home.welcomeBack", { name: trimmed }),
      description: t("home.redirectDescription"),
    });

    router.push(ROUTES.GROUPS.path);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setName(value);
    setInvalid(false);
  };

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
