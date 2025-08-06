import { useState } from "react";
import {
  Input,
  Button,
  Dialog,
  Portal,
  useDisclosure,
  Box,
  Field,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export function OneInputDialog({
  title,
  placeholder,
  defaultValue = "",
  onSubmit,
  trigger,
  leftButtonText,
  rightButtonText,
}) {
  const t = useTranslations("common");
  const { open, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    const trimmedValue = inputValue.trim();
    setErrorMsg(!trimmedValue ? t("required") : "");

    if (!trimmedValue) return;

    setLoading(true);
    try {
      const success = await onSubmit(trimmedValue);
      if (!success) {
        setErrorMsg(t("submissionError"));
        return;
      }
      onClose();
    } catch (error) {
      console.error("Error submitting input:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setErrorMsg("");
    setInputValue(value);
  };

  const handleOpen = () => {
    setInputValue(defaultValue);
    onOpen();
  };

  return (
    <Dialog.Root placement="center" open={open}>
      <Dialog.Trigger asChild>
        <Box onClick={handleOpen} cursor="pointer">
          {trigger}
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description>
                <Field.Root invalid={!!errorMsg}>
                  <Input
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <Field.ErrorText>{errorMsg}</Field.ErrorText>
                </Field.Root>
              </Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer>
              <Button size="sm" variant="secondary" onClick={onClose}>
                {leftButtonText ?? t("cancel")}
              </Button>
              <Button
                size="sm"
                loading={loading}
                onClick={handleSubmit}
                disabled={defaultValue === inputValue}
              >
                {rightButtonText ?? t("submit")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
