import {
  HStack,
  Button,
  Flex,
  Box,
  Center,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { FileSliders } from "lucide-react";

export function Home() {
  return (
    <Center rounded="md" bg="white" h="full" flex="1">
      <VStack mt="-10" color="orange.500" textAlign="center">
        <FileSliders size={72} />
        <Heading textAlign="center" lineHeight="1.1" fontSize="5xl">
          Fatura personalizada
        </Heading>
      </VStack>
    </Center>
  );
}
