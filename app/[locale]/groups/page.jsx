"use client";

import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Input,
  Text,
  Spinner,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { TbEdit, TbCheck } from "react-icons/tb";

import { getUserId } from "@/lib/util/userUtils";
import GroupList from "@/components/groups/GroupList";
import GroupActions from "@/components/groups/GroupActions";

export default function GroupsPage() {
  const t = useTranslations("groups");
  const appT = useTranslations("app");

  const [username, setUsername] = useState("");
  const [tempName, setTempName] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  // Cargar datos del usuario y grupos
  useEffect(() => {
    const storedName = "Demo name";
    const storedId = getUserId();

    if (storedName) {
      setUsername(storedName);
    }

    if (storedId) {
      fetchGroups(storedId);
    }

    setLoading(false);
  }, []);

  // Fetch grupos
  const fetchGroups = (userId) => {
    fetch("/api/groups", {
      headers: {
        "x-user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setGroups(data);
      })
      .catch((err) => console.error("Error cargando grupos:", err));
  };

  const handleSaveName = () => {
    const trimmed = tempName.trim();
    if (!trimmed) return;

    // TODO: Implementar función para guardar el nombre del usuario
  };

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" px={6} pt={4} pb={20} maxW="lg" mx="auto">
      <VStack spacing={6} align="stretch">
        <GroupList groups={groups} />
      </VStack>
      <GroupActions
        onGroupCreated={(group) => setGroups((prev) => [...prev, group])}
      />
    </Box>
  );
}
