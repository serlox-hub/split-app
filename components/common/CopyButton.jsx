"use client";
import { Tooltip } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

export function CopyButton({ textToCopy }) {
  const t = useTranslations();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Tooltip
      openDelay={100}
      closeDelay={200}
      open={isCopied ? true : undefined}
      showArrow
      content={isCopied ? t("common.copied") : t("common.copy")}
    >
      <MdOutlineContentCopy onClick={handleCopy} cursor={"pointer"} />
    </Tooltip>
  );
}
