import { Flex, Heading, VStack, Text } from "@chakra-ui/react";
import { Form } from "./form";
import { FileSliders } from "lucide-react";

export function Login() {
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
        <Flex
          color="white"
          gap="2"
          alignItems="center"
          px="8"
          h="96"
          bg="orange.400"
        >
          <Flex flexDir="column" alignItems="center">
            <Flex alignItems="center">
              <FileSliders size={22} />
              <Heading>Fatura personalizada</Heading>
            </Flex>
            <Text>v 1.0.0</Text>
          </Flex>
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
