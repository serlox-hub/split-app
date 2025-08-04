"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import {
  ActionBar,
  Portal,
  Box,
  Button,
  VStack,
  Heading,
  ListRoot,
  ListItem,
} from "@chakra-ui/react";

import { TbArrowsJoin2 } from "react-icons/tb";
import { CreateGroupBarAction } from "@/components/actionBar/CreateGroupBarAction";

export default function HomePage() {
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    fetch("/api/groups", {
      headers: {
        "x-user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setGroups(data);
      })
      .catch((err) => {
        console.error("Error cargando grupos:", err);
      });
  }, []);

  return (
    <Box
      p={6}
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxW={"lg"}
      mx="auto"
    >
      <VStack w="100%">
        {groups.length > 0 && (
          <Box w="100%">
            <Heading mb={2}>Tus grupos</Heading>
            <ListRoot variant={"unstyled"}>
              {groups.map((group) => (
                <ListItem key={group.id} mb={2}>
                  <Button
                    variant="outline"
                    w="full"
                    onClick={() => router.push(`/${group.id}`)}
                  >
                    {group.name}
                  </Button>
                </ListItem>
              ))}
            </ListRoot>
          </Box>
        )}
      </VStack>
      <ActionBar.Root open>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <Button variant="outline" size="sm">
                <TbArrowsJoin2 />
                Join
              </Button>
              <CreateGroupBarAction
                onGroupCreated={(group) => setGroups([...groups, group])}
              />
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </Box>
  );
}
