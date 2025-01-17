import {
  Button,
  Flex,
  Box,
  Text,
  Heading,
  Center,
  VStack,
} from "@chakra-ui/react";
import { env } from "../../config/env";
import { useTenant } from "../../hooks/tenant";
import { useClipboard } from "../../hooks/useClipboard";

import { Copy, Clipboard, FileSliders } from "lucide-react";

export function Home() {
  const { getTenant } = useTenant();
  const { copyToClipboard, copied } = useClipboard();

  const url = `${env.VITE_API_URL}/webhooks/gerar-fatura/${getTenant()._id}`;

  return (
    <Box rounded="md" bg="white" h="full">
      <Box>
        <Heading color="gray.600">Integração com omie </Heading>

        <Text mt="4" mb="2">
          Para integrar o fatura personalizada com o omie, na etapa de criação
          de aplicação use a url de integração abaixo:
        </Text>
        <Flex alignItems="center" gap="4" mb="4">
          <Text
            rounded="sm"
            border="1px solid"
            borderColor="gray.200"
            py="2"
            px="4"
            color="gray.600"
            backgroundColor="gray.50"
          >
            {url}
          </Text>
          <Button variant="surface" onClick={() => copyToClipboard(url)}>
            {copied && <Clipboard />}
            {!copied && <Copy />}
            Copiar
          </Button>
        </Flex>

        <Text mb="2">Selecione a opção abaixo no omie:</Text>

        <Box
          border="1px solid"
          w="480px"
          h="270px"
          overflow="hidden"
          backgroundColor="red.500"
          rounded="sm"
          borderColor="gray.200"
        >
          <img width={480} height={270} src="/images/config_omie.png" alt="" />
        </Box>

        <Text mt="4">Agora, tudo pronto 🧡</Text>
      </Box>

      {/* <Center rounded="md" bg="white" h="full" flex="1">
        <VStack mt="-10" color="orange.500" textAlign="center">
          <FileSliders size={72} />
          <Heading textAlign="center" lineHeight="1.1" fontSize="5xl">
            Fatura personalizada
          </Heading>
        </VStack>
      </Center> */}
    </Box>
  );
}
