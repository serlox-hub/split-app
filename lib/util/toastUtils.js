import { toaster } from "@/components/ui/toaster";

export const showUnexpectedErrorToast = (t) => {
  toaster.create({
    title: t("alert.error"),
    description: t("common.unexpectedError"),
    type: "error",
  });
};
