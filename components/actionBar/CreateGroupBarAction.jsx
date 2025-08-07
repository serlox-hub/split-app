"use client";

import { useState } from "react";
import { Input, Button, Dialog, Portal, useDisclosure } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { createGroup } from "@/lib/api/groups";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";
import { useTranslations } from "next-intl";

export function CreateGroupBarAction({ onGroupCreated }) {
  const t = useTranslations();
  const { open, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const trimmedName = groupName.trim();
    if (!trimmedName) return;

    setLoading(true);
    const result = await createGroup(trimmedName);
    setLoading(false);

    if (!result.success) return showUnexpectedErrorToast(t);
    onGroupCreated(result.data);
    onClose();
  };

  const handleOpen = () => {
    setGroupName("");
    onOpen();
  };
  return (
    <Dialog.Root placement="center" open={open}>
      <Dialog.Trigger asChild>
        <Button size="sm" variant="outline" onClick={handleOpen}>
          <LuPlus />
          Create
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create group</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description>
                <Input
                  placeholder="Group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleCreate}
                loading={loading}
                disabled={loading}
              >
                Create
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
