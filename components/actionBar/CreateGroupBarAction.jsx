"use client";

import { useState } from "react";
import { Input, Button, Dialog, Portal, useDisclosure } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { getUserId } from "@/lib/userUtils";

export function CreateGroupBarAction({ onGroupCreated }) {
  const { open, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const trimmedName = groupName.trim();
    if (!trimmedName) return;

    const userId = getUserId();
    setLoading(true);
    const res = await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmedName, userId }),
    });

    if (res.ok) {
      const group = await res.json();
      onGroupCreated(group);
    } else {
      const err = await res.json();
      console.error("Error al crear grupo:", err.error);
    }
    setLoading(false);
    onClose();
  };

  const handleOpen = () => {
    setGroupName("");
    onOpen();
  };
  console.log("Loading state:", loading);
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
