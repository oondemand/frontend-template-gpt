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
import { AssistantService } from "../../../services/assistant";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";
import { useConfirmation } from "../../../hooks/confirmationModal";

export function ListAssistant() {
  const navigate = useNavigate();
  const { requestConfirmation } = useConfirmation();

  const {
    data: assistants,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-assistants"],
    queryFn: AssistantService.listAssistant,
  });

  const { mutateAsync: deleteAssistantMutation } = useMutation({
    mutationFn: AssistantService.deleteAssistant,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-assistants"],
      });
    },
  });

  const onDelete = async (id) => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja deletar assistente?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (response.action === "confirmed") {
      try {
        const response = await deleteAssistantMutation({ id });
        if (response.status === 200) {
          toast.success("Assistente deletado com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao deletar assistente!");
      }
    }
  };

  const { mutateAsync: cloneAssistant } = useMutation({
    mutationFn: AssistantService.cloneAssistant,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-assistants"],
      });
    },
  });

  const onClone = async (id) => {
    // const response = await requestConfirmation({
    //   title: "Tem certeza que deseja deletar assistente?",
    //   description: "Essa operação não pode ser desfeita!",
    // });

    // if (response.action === "confirmed") {
    try {
      const response = await cloneAssistant({ id });
      if (response.status === 200) {
        toast.success("Assistente clonado com sucesso");
      }
    } catch (error) {
      toast.error("Erro ao clonar assistente!");
    }
    // }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="2xl" color="orange.500">
          Assistente
        </Heading>
        <Button
          onClick={() => navigate("/adm/assistentes/create")}
          colorPalette="cyan"
        >
          Criar assistente
        </Button>
      </Flex>

      <Box mt="8" maxH="800px" overflow="auto">
        {isLoading && <Text>Listando assistentes...</Text>}
        {!isLoading && error && (
          <Text>Ouve um erro ao listar assistentes!</Text>
        )}
        {!isLoading && !error && assistants.length == 0 && (
          <Text>Não foram encontradas assistentes</Text>
        )}
        {!isLoading && assistants && assistants.length > 0 && (
          <Table.Root variant="line" striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                <Table.ColumnHeader>Descrição</Table.ColumnHeader>
                <Table.ColumnHeader />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {assistants.map((assistant) => (
                <Table.Row key={assistant._id}>
                  <Table.Cell>{assistant.nome}</Table.Cell>
                  <Table.Cell>{assistant.descricao}</Table.Cell>
                  <Table.Cell maxW="300px"></Table.Cell>
                  <Table.Cell placeItems="end">
                    <Flex gap="4">
                      <IconButton
                        onClick={() =>
                          navigate(`/adm/assistentes/${assistant._id}`)
                        }
                        colorPalette="cyan"
                        size="xs"
                      >
                        <FilePenLine />
                      </IconButton>
                      <IconButton
                        onClick={() => onClone(assistant._id)}
                        colorPalette="green"
                        size="xs"
                      >
                        <CopyPlus />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          onDelete(assistant._id);
                        }}
                        colorPalette="red"
                        size="xs"
                      >
                        <Trash2 />
                      </IconButton>
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
