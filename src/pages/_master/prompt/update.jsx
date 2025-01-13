import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { PromptForm } from "./form";
import { PromptService } from "../../../services/prompt";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";

import { toast } from "sonner";

import { useParams } from "react-router-dom";

export function UpdatePrompt() {
  const { id } = useParams();
  const {
    data: prompt,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["prompt", { id }],
    queryFn: async () => await PromptService.getPrompt({ id }),
  });

  const { mutateAsync: updatePromptMutation } = useMutation({
    mutationFn: PromptService.updatePrompt,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-prompts"],
      });
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await updatePromptMutation({
        id,
        body: {
          ...data,
          tipo: data.tipo[0],
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

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Detalhes do prompt
        </Heading>
        <Button type="submit" form="update-prompt-form" colorPalette="cyan">
          Atualizar
        </Button>
      </Flex>
      {!isLoading && prompt && (
        <PromptForm
          data={prompt}
          onSubmit={onSubmit}
          formId="update-prompt-form"
        />
      )}
    </Box>
  );
}
