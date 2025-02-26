import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { AssistantForm } from "./form";
import { AssistantService } from "../../../services/assistant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";

import { toast } from "sonner";

import { useParams } from "react-router-dom";
import { BackButton } from "../../../components/ui/back-button";

export function CreateAssistant() {
  const { mutateAsync: createAssistantMutation } = useMutation({
    mutationFn: AssistantService.createAssistant,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-assistants"],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createAssistantMutation(data);
      if (response) {
        toast.success("Assistente criado com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar assistente!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Criar assistente
        </Heading>

        <Flex alignItems="center" gap="2">
          <BackButton />
          <Button
            type="submit"
            form="create-assistant-form"
            colorPalette="cyan"
          >
            Salvar
          </Button>
        </Flex>
      </Flex>

      <AssistantForm
        data={prompt}
        onSubmit={onSubmit}
        formId="create-assistant-form"
      />
    </Box>
  );
}
