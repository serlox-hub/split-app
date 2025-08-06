"use client";

import { useEffect, useState } from "react";
import { Box, VStack, Spinner } from "@chakra-ui/react";

import { getUserId } from "@/lib/util/userUtils";
import GroupList from "@/components/groups/GroupList";
import GroupActions from "@/components/groups/GroupActions";

export default function GroupsPage() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const storedId = getUserId();

    const fetchGroups = (userId) => {
      // TODO de la otra manera
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

    if (storedId) {
      fetchGroups(storedId);
    }

    setLoading(false);
  }, []);

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
