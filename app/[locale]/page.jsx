import { Box, VStack, Heading, Text, Image } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { OnboardingForm } from "@/components/home/OnboardingForm";
import { APP_NAME } from "@/lib/constants";

export default function HomePage() {
  const t = useTranslations("home");

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
          {t("welcome", { name: APP_NAME })}
        </Heading>
        <Text fontSize="lg" color="gray.600" marginBottom={6}>
          {t("description")}
        </Text>

        <OnboardingForm />
      </VStack>
    </Box>
  );
}
