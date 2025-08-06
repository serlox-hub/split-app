import { toaster } from "@/components/ui/toaster";

export const showUnexpectedErrorToast = (t) => {
  toaster.create({
    title: t("common.unexpectedError"),
    variant: "error",
  });
};
