"use client";

import { useUser } from "@/components/providers/UserProvider";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";
import { updateUserAction } from "@/server/user/actions";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";

import { Button, Field, Fieldset, Input } from "@chakra-ui/react";

export function UserTabEditName() {
  const user = useUser();
  const t = useTranslations();
  const [inputValue, setInputValue] = useState(user.name);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (value) => {
    const result = await updateUserAction(value);
    if (!result.success) {
      showUnexpectedErrorToast(t);
    } else {
      toaster.create({
        title: t("alert.success"),
        description: t("userSettings.nameUpdated"),
        type: "success",
      });
    }
    return result.success;
  };

  const handleSubmit = async () => {
    const trimmedValue = inputValue.trim();
    setErrorMsg(!trimmedValue ? t("common.required") : "");
    if (!trimmedValue) return;

    setLoading(true);
    const success = await onSubmit(trimmedValue);
    if (!success) {
      setErrorMsg(t("common.submissionError"));
      setLoading(false);
      return;
    }
    setLoading(false);
    close();
  };

  const handleInputChange = (e) => {
    setErrorMsg("");
    setInputValue(e.target.value);
  };

  return (
    <Fieldset.Root size="lg" maxW="md" mx="auto" mt={6}>
      <Fieldset.Content>
        <Field.Root invalid={!!errorMsg}>
          <Field.Label>{t("userSettings.editNameLabel")}</Field.Label>
          <Field.HelperText>
            {t("userSettings.editNameHelper")}
          </Field.HelperText>
          <Input
            placeholder={t("userSettings.namePlaceholder")}
            variant={"filled"}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Field.ErrorText>{errorMsg}</Field.ErrorText>
        </Field.Root>
      </Fieldset.Content>
      <Button
        alignSelf="flex-start"
        size="sm"
        loading={loading}
        onClick={handleSubmit}
        disabled={user.name.trim() === inputValue.trim()}
      >
        {t("common.submit")}
      </Button>
    </Fieldset.Root>
  );
}
