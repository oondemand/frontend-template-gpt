import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { FilePenLine, Trash2, CopyPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PromptService } from "../../../services/prompt";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";
import { useConfirmation } from "../../../hooks/confirmationModal";

export function ListPrompts() {
  const navigate = useNavigate();

  const {
    data: prompts,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-prompts"],
    queryFn: PromptService.listPrompt,
  });

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="2xl" color="orange.500">
          Prompts
        </Heading>
        {/* <Button onClick={() => navigate("/prompts/create")} colorPalette="cyan">
          Criar prompt
        </Button> */}
      </Flex>

      <Box mt="8" maxH="800px" overflow="auto">
        {isLoading && <Text>Listando prompts...</Text>}
        {!isLoading && error && <Text>Ouve um erro ao listar prompts!</Text>}
        {!isLoading && !error && prompts.length == 0 && (
          <Text>Não foram encontradas prompts</Text>
        )}
        {!isLoading && prompts && prompts.length > 0 && (
          <Table.Root variant="line" striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                <Table.ColumnHeader>Tipo</Table.ColumnHeader>
                <Table.ColumnHeader>Código</Table.ColumnHeader>
                {/* <Table.ColumnHeader>Conteúdo</Table.ColumnHeader> */}
                <Table.ColumnHeader>Descricao</Table.ColumnHeader>
                <Table.ColumnHeader />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {prompts.map((prompt) => (
                <Table.Row key={prompt._id}>
                  <Table.Cell>{prompt.nome}</Table.Cell>
                  <Table.Cell>{prompt.tipo}</Table.Cell>
                  <Table.Cell>{prompt.codigo}</Table.Cell>
                  <Table.Cell maxW="300px">
                    {/* <Text truncate>{prompt.conteudo}</Text> */}
                  </Table.Cell>
                  <Table.Cell>{prompt.descricao}</Table.Cell>
                  <Table.Cell placeItems="end">
                    <Flex gap="4">
                      <IconButton
                        onClick={() => navigate(`/adm/prompt/${prompt._id}`)}
                        colorPalette="cyan"
                        size="xs"
                      >
                        <FilePenLine />
                      </IconButton>
                      {/* <IconButton
                        onClick={() => navigate(`/prompt/${prompt._id}/clone`)}
                        colorPalette="green"
                        size="xs"
                      >
                        <CopyPlus />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          onDelete(prompt._id);
                        }}
                        colorPalette="red"
                        size="xs"
                      >
                        <Trash2 />
                      </IconButton> */}
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Box>
    </Box>
  );
}
