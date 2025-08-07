"use client";

import { useEffect, useState, useCallback } from "react";
import { Box, VStack } from "@chakra-ui/react";

import GroupList from "@/components/groups/GroupList";
import GroupActions from "@/components/groups/GroupActions";
import { getUserGroups } from "@/lib/api/groups";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/Spinner";

export default function GroupsPage() {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    const result = await getUserGroups();
    setLoading(false);
    if (!result.success) return showUnexpectedErrorToast(t);
    setGroups(result.data || []);
  }, [t]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

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
      <GroupActions onGroupCreated={fetchGroups} />
    </Box>
  );
}
