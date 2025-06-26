import {
  Button,
  Flex,
  Box,
  Text,
  Heading,
  Center,
  VStack,
  Table,
} from "@chakra-ui/react";
import { env } from "../../config/env";
import { useTenant } from "../../hooks/tenant";
import { useClipboard } from "../../hooks/useClipboard";

import { Copy, Clipboard, FileSliders, Paperclip } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/axios";
import { mesAnoExtenso } from "../../utils/date";
import { toUpperFirstCase } from "../../utils";

export function Home() {
  const { data } = useQuery({
    queryKey: ["caracteristicas"],
    queryFn: async () => {
      const response = await api.get("/caracteristicas");
      return response.data;
    },
  });

  console.log("Data", data);

  return (
    <Box rounded="md" bg="white" h="full" py="2">
      <Box>
        <Text fontSize="sm" color="gray.400">
          Dashboard
        </Text>
        <Text fontSize="20px" color="gray.700">
          Visão geral
          {/* {mesAnoExtenso()} */}
        </Text>
      </Box>
      <Flex gap="8" py="8">
        <Center py="2" pb="6" px="8" bg="orange.500" rounded="lg" shadow="sm">
          <Box color="gray.50" pr="4">
            <Paperclip size={50} />
          </Box>
          <Box>
            <Text h="60px" color="gray.50" fontSize="6xl" fontWeight="bold">
              {data?.quantidadeTotal}
            </Text>
            <Text mt="4" color="gray.100" fontSize="sm" fontWeight="semibold">
              Documentos gerados
            </Text>
          </Box>
        </Center>

        <Box
          py="2"
          pb="6"
          px="8"
          rounded="lg"
          border="1px dashed"
          borderColor="orange.200"
        >
          <Text h="60px" color="orange.400" fontSize="6xl" fontWeight="bold">
            {
              data?.quantidadePorKanbanEStatus?.find(
                (e) => e?.kanban === "PedidoVenda"
              )?.total
            }
          </Text>
          <Text mt="4" color="gray.400" fontSize="sm" fontWeight="semibold">
            Documentos gerados <br />
            por Pedido de Venda
          </Text>
        </Box>

        <Box
          py="2"
          pb="6"
          px="8"
          rounded="lg"
          border="1px dashed"
          borderColor="orange.200"
        >
          <Text h="60px" color="orange.400" fontSize="6xl" fontWeight="bold">
            {
              data?.quantidadePorKanbanEStatus?.find(
                (e) => e?.kanban === "OrdemServiço"
              )?.total
            }
          </Text>
          <Text mt="4" color="gray.400" fontSize="sm" fontWeight="semibold">
            Documentos gerados <br />
            por Ordem de serviço
          </Text>
        </Box>
      </Flex>

      <Box borderBottom="1px dashed" w="full" borderColor="gray.200" />

      <Flex pt="8" gap="8">
        <Box
          bg="white"
          p="4"
          rounded="lg"
          border="1px dashed"
          borderColor="orange.200"
        >
          <Text color="orange.400" fontWeight="semibold">
            Documentos por status
          </Text>
          <Table.Root mt="4">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader
                  fontSize="xs"
                  color="gray.600"
                  fontWeight="light"
                  py="0.5"
                >
                  STATUS
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontSize="xs"
                  color="gray.600"
                  fontWeight="light"
                  py="0.5"
                >
                  QUANTIDADE
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.quantidadePorStatus?.map((item) => (
                <Table.Row>
                  <Table.Cell border="none">
                    {toUpperFirstCase(item?._id)}
                  </Table.Cell>
                  <Table.Cell border="none">{item?.quantidade}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        <Box
          bg="white"
          p="4"
          rounded="lg"
          border="1px dashed"
          borderColor="orange.200"
        >
          <Text color="orange.400" fontWeight="semibold">
            Documentos por status <br />
            Pedido de Venda
          </Text>
          <Table.Root mt="4">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader
                  fontSize="xs"
                  color="gray.600"
                  fontWeight="light"
                  py="0.5"
                >
                  STATUS
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontSize="xs"
                  color="gray.600"
                  fontWeight="light"
                  py="0.5"
                >
                  QUANTIDADE
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.quantidadePorKanbanEStatus
                ?.find((e) => e?.kanban === "PedidoVenda")
                ?.porStatus.map((item) => (
                  <Table.Row>
                    <Table.Cell border="none">
                      {toUpperFirstCase(item?.status)}
                    </Table.Cell>
                    <Table.Cell border="none">{item?.quantidade}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Box>

        <Box
          bg="white"
          p="4"
          rounded="lg"
          border="1px dashed"
          borderColor="orange.200"
        >
          <Text color="orange.400" fontWeight="semibold">
            Documentos por status <br />
            Ordem de Serviço
          </Text>
          <Table.Root mt="4">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader
                  fontSize="xs"
                  color="gray.600"
                  fontWeight="light"
                  py="0.5"
                >
                  STATUS
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontSize="xs"
                  color="gray.600"
                  fontWeight="light"
                  py="0.5"
                >
                  QUANTIDADE
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.quantidadePorKanbanEStatus
                ?.find((e) => e?.kanban === "OrdemServiço")
                ?.porStatus.map((item) => (
                  <Table.Row>
                    <Table.Cell border="none">
                      {toUpperFirstCase(item?.status)}
                    </Table.Cell>
                    <Table.Cell border="none">{item?.quantidade}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </Box>
  );
}
