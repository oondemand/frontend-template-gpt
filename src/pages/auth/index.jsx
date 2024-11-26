import { Flex, Box, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "./form";

import { env } from "../../config/env";

export function Auth() {
  console.log("ENV", env);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        rounded="lg"
        shadow="md"
        overflow="hidden"
      >
        <Flex alignItems="center" px="8" h="96" bg="orange.400">
          <Heading color="white">Poc Template Gpt</Heading>
        </Flex>
        <VStack px="8" gap="8">
          <VStack>
            <Heading color="orange.600">Que bom ter você por aqui!:</Heading>
            <Text color="gray.700">
              Vamos juntos transformar sua rotina com tecnologia.
            </Text>
          </VStack>
          <Form />
        </VStack>
      </Flex>
    </Flex>
  );
}
