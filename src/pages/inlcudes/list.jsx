import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { FilePenLine, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ListIncludes() {
  const navigate = useNavigate();

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="2xl" color="orange.500">
          Includes
        </Heading>
        <Button
          onClick={() => navigate("/includes/create")}
          colorPalette="cyan"
        >
          Criar include
        </Button>
      </Flex>

      <Box mt="8">
        <Table.Root variant="line" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Nome</Table.ColumnHeader>
              <Table.ColumnHeader>Conteúdo</Table.ColumnHeader>
              <Table.ColumnHeader>Descricao</Table.ColumnHeader>
              <Table.ColumnHeader>Content type</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>include.name</Table.Cell>
              <Table.Cell>include.content</Table.Cell>
              <Table.Cell>include.description</Table.Cell>
              <Table.Cell>include.contenType</Table.Cell>
              <Table.Cell>include.status</Table.Cell>
              <Table.Cell placeItems="end">
                <Flex gap="4">
                  <IconButton colorPalette="cyan" size="xs">
                    <FilePenLine />
                  </IconButton>
                  <IconButton colorPalette="red" size="xs">
                    <Trash2 />
                  </IconButton>
                </Flex>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}
