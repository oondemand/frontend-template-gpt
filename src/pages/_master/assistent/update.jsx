import {
  Box,
  Heading,
  Button,
  Flex,
  Text,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { AssistantForm } from "./form";
import { AssistantService } from "../../../services/assistant";
import { PromptService } from "../../../services/prompt";

import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";

import { toast } from "sonner";

import { useParams } from "react-router-dom";
import {
  FilePenLine,
  CopyPlus,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useConfirmation } from "../../../hooks/confirmationModal";
import { usePromptDialog } from "../../../hooks/promptContext";
import { BackButton } from "../../../components/ui/back-button";

export function UpdateAssistente() {
  const { id } = useParams();
  const { requestConfirmation } = useConfirmation();
  const { openPromptDialog } = usePromptDialog();

  const {
    data: assistant,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["assistant", { id }],
    queryFn: async () => await AssistantService.getAssistant({ id }),
  });

  const {
    data: prompts,
    isFetching: isFetchingPrompts,
    error: errorPrompts,
    isLoading: isLoadingPrompts,
  } = useQuery({
    queryKey: ["list-prompts"],
    queryFn: () => PromptService.listPrompt({ id }),
  });

  const { mutateAsync: updateAssistantMutation } = useMutation({
    mutationFn: AssistantService.updateAssistant,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-prompts"],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateAssistantMutation({
        id,
        body: {
          ...data,
        },
      });
      if (response) {
        toast.success("Prompt atualizado com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar prompt!");
    }
  };

  const { mutateAsync: deletePromptMutation } = useMutation({
    mutationFn: PromptService.deletePrompt,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-prompts"],
      });
    },
  });

  const onDelete = async (id) => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja deletar prompt?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (response.action === "confirmed") {
      try {
        const response = await deletePromptMutation({ id });
        if (response.status === 200) {
          toast.success("Prompt deletado com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao deletar prompt!");
      }
    }
  };

  const { mutateAsync: updatePromptMutation } = useMutation({
    mutationFn: PromptService.updatePrompt,
  });

  const onUpPromptOrder = async (prompt) => {
    try {
      const promptIndex = prompts.findIndex((e) => e._id === prompt._id);

      if (promptIndex === 0) {
        return;
      }

      const r1 = await updatePromptMutation({
        id: prompt._id,
        body: {
          ordem: prompt.ordem - 10,
        },
      });

      const previousPrompt = prompts[promptIndex - 1];

      const r2 = await updatePromptMutation({
        id: previousPrompt._id,
        body: {
          ordem: previousPrompt.ordem + 10,
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["list-prompts"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDownPromptOrder = async (prompt) => {
    try {
      const promptIndex = prompts.findIndex((e) => e._id === prompt._id);

      if (promptIndex === prompts.length - 1) {
        return;
      }

      await updatePromptMutation({
        id: prompt._id,
        body: {
          ordem: prompt.ordem + 10,
        },
      });

      const afterPrompt = prompts[promptIndex + 1];

      await updatePromptMutation({
        id: afterPrompt._id,
        body: {
          ordem: afterPrompt.ordem - 10,
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["list-prompts"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="6">
        <Heading fontSize="2xl" color="orange.500">
          Detalhes do prompt
        </Heading>
        <Flex alignItems="center" gap="2">
          <BackButton />
          <Button
            type="submit"
            form="update-assistant-form"
            colorPalette="cyan"
          >
            Atualizar
          </Button>
        </Flex>
      </Flex>
      {!isLoading && assistant && (
        <AssistantForm
          data={assistant}
          onSubmit={onSubmit}
          formId="update-assistant-form"
        />
      )}

      <Box mt="6">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize="2xl" color="orange.500">
            Mensagens
          </Heading>
          <Button
            onClick={() => {
              openPromptDialog({ data: { assistente: id }, type: "create" });
            }}
            border="1px solid"
            colorPalette="cyan"
          >
            Criar mensagem
          </Button>
        </Flex>

        <Box mt="6" maxH="800px" overflow="auto">
          {isLoadingPrompts && <Text>Listando mensagens...</Text>}
          {!isLoadingPrompts && errorPrompts && (
            <Text>Ouve um erro ao listar mensagens!</Text>
          )}
          {!isLoadingPrompts && !errorPrompts && prompts.length == 0 && (
            <Text>Não foram encontradas mensagens</Text>
          )}
          {!isLoadingPrompts && prompts && prompts.length > 0 && (
            <Table.Root variant="line" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Código</Table.ColumnHeader>
                  <Table.ColumnHeader>Tipo</Table.ColumnHeader>
                  <Table.ColumnHeader>Tipo de conteúdo</Table.ColumnHeader>
                  <Table.ColumnHeader>Conteúdo</Table.ColumnHeader>
                  <Table.ColumnHeader />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {prompts?.map((prompt, i) => (
                  <Table.Row key={prompt._id}>
                    <Table.Cell>{prompt.codigo}</Table.Cell>
                    <Table.Cell>{prompt.tipo}</Table.Cell>
                    <Table.Cell>{prompt.tipoConteudo}</Table.Cell>
                    <Table.Cell maxW="300px">
                      <Text truncate>{prompt.conteudo}</Text>
                    </Table.Cell>
                    <Table.Cell placeItems="end">
                      <Flex gap="4">
                        <IconButton
                          disabled={i === 0}
                          onClick={() => {
                            onUpPromptOrder(prompt);
                          }}
                          colorPalette="gray"
                          variant="surface"
                          size="xs"
                        >
                          <ArrowUp />
                        </IconButton>
                        <IconButton
                          disabled={i === prompts.length - 1}
                          onClick={() => {
                            onDownPromptOrder(prompt);
                          }}
                          colorPalette="gray"
                          variant="surface"
                          size="xs"
                        >
                          <ArrowDown />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            openPromptDialog({
                              data: { ...prompt, assistente: id },
                              type: "update",
                            });
                          }}
                          colorPalette="cyan"
                          size="xs"
                        >
                          <FilePenLine />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            openPromptDialog({
                              data: {
                                ...prompt,
                                nome: prompt.nome + " (copia)",
                                assistente: id,
                              },
                              type: "clone",
                            })
                          }
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
    </Box>
  );
}
