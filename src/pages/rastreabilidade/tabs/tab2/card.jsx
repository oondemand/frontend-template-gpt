import { Box, Text, Badge, Flex } from "@chakra-ui/react";
import { memo } from "react";
import { trakingStatusMap } from "../../../../_constants/maps";
import { Check, X } from "lucide-react";
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "../../../../components/ui/accordion";

const StatusCard = ({ checked, label }) => {
  return (
    <Flex gap="2" align="center" color="gray.600">
      <Flex
        rounded="full"
        bg={
          checked === undefined ? "gray.200" : checked ? "green.500" : "red.500"
        }
        justify="center"
        align="center"
        p="0.5"
      >
        {checked === undefined && <Box w="3" h="3" />}
        {checked && <Check size={12} color="white" />}
        {checked === false && <X size={12} color="white" />}
      </Flex>
      <Text fontSize="sm" fontWeight="semibold">
        {label}
      </Text>
    </Flex>
  );
};

export const DetailsCard = memo(({ data }) => {
  return (
    <Box w="370px">
      <Text fontSize="sm" fontWeight="bold">
        Detalhes
      </Text>
      <Flex gap="4" align="center" justifyContent="space-between" mt="4">
        <Flex gap="2">
          <Text rounded="sm" fontWeight="semibold">
            Kanban:
          </Text>
          <Text bg="gray.50" px="1.5" rounded="sm">
            {data?.kanban}
          </Text>
        </Flex>
        <Badge
          fontWeight="semibold"
          colorPalette={trakingStatusMap[data?.status]}
        >
          {data?.status}
        </Badge>
      </Flex>
      <Text mt="4">
        <b>Usuário omie:</b> {data?.emailUsuarioOmie}
      </Text>
      <Flex gap="2" mt="3">
        <Text fontSize="sm" fontWeight="bold">
          Tempo de resposta:
        </Text>
        <Text>{data?.tempoProcessamento}ms</Text>
      </Flex>
      <Flex flexDir="column" gap="4" pt="4">
        <StatusCard
          checked={data?.variaveisOmieCarregadas}
          label="Variaveis omie carregadas"
        />
        <StatusCard checked={data?.documentoGerado} label="Documento gerado" />
        <StatusCard
          checked={data?.documentoAnexadoOmie}
          label="Documento anexado no omie"
        />

        {!data?.emailEnviado && (
          <StatusCard checked={data?.emailEnviado} label="Email enviado" />
        )}

        {data?.emailEnviado && (
          <AccordionRoot collapsible p="0">
            <AccordionItem cursor="pointer" border="none" p="0">
              <AccordionItemTrigger
                cursor="pointer"
                fontSize="sm"
                fontWeight="semibold"
                p="0"
              >
                <StatusCard
                  checked={data?.emailEnviado}
                  label="Email enviado"
                />
              </AccordionItemTrigger>
              <AccordionItemContent mt="1" p="0">
                <Text
                  ml="6"
                  color="gray.700"
                  textWrap="wrap"
                  maxW="300px"
                  fontSize="sm"
                >
                  {data?.emailsDestinatarios[0]?.split(",").join(", ")}
                </Text>
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>
        )}

        {data?.kanban === "OrdemServiço" && (
          <StatusCard
            checked={data?.adiantamentoGerado}
            label="Adiantamento gerado"
          />
        )}
      </Flex>
      {data?.detalhesErro && (
        <AccordionRoot
          mt="4"
          collapsible
          borderTop="1px dashed"
          borderColor="gray.200"
        >
          <AccordionItem cursor="pointer" border="none">
            <AccordionItemTrigger
              cursor="pointer"
              fontSize="sm"
              fontWeight="semibold"
              pt="1"
            >
              Detalhes do erro:
            </AccordionItemTrigger>
            <AccordionItemContent p="0">
              <Box maxW="350px">
                <Text textWrap="wrap" fontSize="sm">
                  {data?.detalhesErro?.toString()}
                </Text>
              </Box>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      )}
    </Box>
  );
});
