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

export function ListTemplates() {
  const navigate = useNavigate();

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="2xl" color="orange.500">
          Templates
        </Heading>
        <Button
          onClick={() => navigate("/templates/create")}
          colorPalette="cyan"
        >
          Criar template
        </Button>
      </Flex>

      <Box mt="8">
        <Table.Root variant="line" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Nome</Table.ColumnHeader>
              <Table.ColumnHeader>Conteúdo</Table.ColumnHeader>
              <Table.ColumnHeader>Descrição</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>template.name</Table.Cell>
              <Table.Cell>template.content</Table.Cell>
              <Table.Cell>template.description</Table.Cell>
              <Table.Cell>template.status</Table.Cell>
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
