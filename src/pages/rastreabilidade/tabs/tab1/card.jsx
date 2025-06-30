import { Box, Text, Badge, Flex } from "@chakra-ui/react";
import { memo } from "react";
import { methodsColorMap } from "../../../../_constants/maps";
import { getStatusColor } from "../../../../utils";
import { JsonView } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const customTheme = {};

export const DetailsCard = memo(({ data }) => {
  return (
    <Box>
      <Text fontSize="sm" fontWeight="bold">
        Detalhes
      </Text>
      <Flex gap="4" align="center" justifyContent="space-between" mt="4">
        <Badge
          fontWeight="semibold"
          colorPalette={methodsColorMap[data?.metodo]}
        >
          {data?.metodo}
        </Badge>
        <Text bg="gray.50" px="1.5" rounded="sm">
          {data?.endpoint}
        </Text>
        <Badge
          fontWeight="semibold"
          colorPalette={getStatusColor(data?.statusResposta)}
        >
          {data?.statusResposta}
        </Badge>
      </Flex>
      <Flex gap="4" align="center" justifyContent="space-between" mt="4">
        <Text>
          <b>Usuario:</b> {data?.usuario?.nome}
        </Text>
        <Text>
          <b>IP:</b> {data?.ip}
        </Text>
      </Flex>
      <Flex gap="2" mt="3">
        <Text fontSize="sm" fontWeight="bold">
          Tempo de resposta:
        </Text>
        <Text>{data?.tempoResposta}ms</Text>
      </Flex>
      <Box mt="3" borderTop="1px dashed" borderColor="gray.200" pt="2">
        <Text fontSize="sm" fontWeight="bold">
          Dados da requisição:
        </Text>
        <JsonView
          shouldExpandNode={() => false}
          data={data?.dadosRequisicao ?? {}}
          style={customTheme}
        />
      </Box>
      <Box mt="3" borderTop="1px dashed" borderColor="gray.200" pt="2">
        <Text fontSize="sm" fontWeight="bold">
          Dados da resposta:
        </Text>
        <JsonView
          shouldExpandNode={() => false}
          data={JSON.parse(data?.dadosResposta ?? "{}")}
          style={customTheme}
        />
      </Box>
    </Box>
  );
});
