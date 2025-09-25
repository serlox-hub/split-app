import { UserTabEditName } from "@/components/user/UserTabEditName";
import { Tabs, Box } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

export default async function UserPage() {
  const t = await getTranslations();
  const tabs = [
    {
      label: t("userSettings.dataTab"),
      value: "tab-1",
      content: <UserTabEditName />,
    },
    {
      label: t("userSettings.sessionTab"),
      value: "tab-2",
      content: "Tab 2: Content coming soon...",
    },
  ];

  return (
    <Box
      bg="bg.emphasized"
      px={{ base: 4, md: 6 }}
      py={6}
      borderRadius="md"
      color="fg"
      width="full"
      maxW="lg"
      mx="auto"
      my={8}
      boxShadow="md"
    >
      <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Content key={tab.value} value={tab.value}>
            {tab.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
}
