import { Box, VStack, Heading, Text, Image } from "@chakra-ui/react";
import { OnboardingForm } from "@/components/home/OnboardingForm";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/util/serverApiUtils";

export default async function HomePage() {
  const t = await getTranslations();
  const user = await getCurrentUser();
  if (user) return redirect(ROUTES.GROUPS.path());

  return (
    <Box
      as="main"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <VStack spacing={6} maxW="xl" textAlign="center" w="full">
        <Image
          src="/logo.png"
          alt={`${APP_NAME} logo`}
          width={120}
          height={120}
          style={{ objectFit: "contain" }}
          priority
        />

        <Heading as="h1" fontSize="4xl">
          {t("home.welcome", { name: APP_NAME })}
        </Heading>
        <Text fontSize="lg" color="gray.600" marginBottom={6}>
          {t("home.description")}
        </Text>

        <OnboardingForm />
      </VStack>
    </Box>
  );
}
