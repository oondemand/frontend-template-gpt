import { Flex, Box, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { Form } from "./form";

export function Auth() {
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
