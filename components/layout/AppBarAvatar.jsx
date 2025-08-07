"use client";

import { useState } from "react";
import { Avatar, Float } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { getColorFromString } from "@/lib/util/colorUtils";
import { OneInputDialog } from "../dialogs/OneInputDialog";
import { updateUser } from "@/lib/api/users";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";
import { useTranslations } from "next-intl";
import { toaster } from "../ui/toaster";

export function AppBarAvatar({ userName }) {
  const t = useTranslations();
  const [hovering, setHovering] = useState(false);
  const [name, setName] = useState(userName);

  const handleSave = async (value) => {
    const result = await updateUser(value);
    if (!result.success) {
      showUnexpectedErrorToast(t);
    } else {
      setName(value);
      toaster.create({
        title: t("appBar.nameUpdated"),
        variant: "success",
      });
    }
    return result.success;
  };

  return (
    <OneInputDialog
      title={t("appBar.editYourName")}
      placeholder={t("appBar.namePlaceholder")}
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
  );
}
