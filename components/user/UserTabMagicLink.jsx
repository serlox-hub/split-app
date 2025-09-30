"use client";
import { CopyButton } from "@/components/common/CopyButton";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";
import { createUserLink } from "@/server/user/actions";
import { Button, Fieldset, Input, Field, InputGroup } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function UserTabMagicLink() {
  const t = useTranslations();
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    const result = await createUserLink();
    if (!result.success) {
      showUnexpectedErrorToast(t);
    }
    setLink(result.link);
    setLoading(false);
  };

  return (
    <Fieldset.Root>
      <Field.Root>
        <Field.Label>{t("userSettings.magicLinkTitle")}</Field.Label>
        <Field.HelperText>
          {t("userSettings.magicLinkHelper", {
            minutes: process.env.NEXT_PUBLIC_APP_MAGIC_LINK_EXPIRY_MINUTES,
          })}
        </Field.HelperText>
        {link && (
          <InputGroup endElement={<CopyButton textToCopy={link} />}>
            <Input readOnly variant={"filled"} value={link} />
          </InputGroup>
        )}
      </Field.Root>
      <Button
        alignSelf="flex-start"
        size="sm"
        onClick={handleButtonClick}
        loading={loading}
      >
        {link ? t("common.refresh") : t("common.create")}
      </Button>
    </Fieldset.Root>
  );
}
