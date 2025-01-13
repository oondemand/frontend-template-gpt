import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { TemplateForm } from "./form";
import { TemplateService } from "../../services/template";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { toast } from "sonner";

import { useParams } from "react-router-dom";

export function UpdateTemplate() {
  const { id } = useParams();
  const {
    data: template,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["template", { id }],
    queryFn: async () => await TemplateService.getTemplate({ id }),
  });

  const { mutateAsync: updateTemplateMutation } = useMutation({
    mutationFn: TemplateService.updateTemplate,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-templates"],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateTemplateMutation({
        id,
        body: {
          ...data,
          status: data.status ? data?.status[0] : "",
        },
      });
      if (response.status === 200) {
        toast.success("Template atualizado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao atualizar template!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Detalhes do template
        </Heading>
        <Flex gap="2" alignItems="center">
          <Button type="submit" form="update-template-form" colorPalette="cyan">
            Atualizar
          </Button>
        </Flex>
      </Flex>
      {!isLoading && template && (
        <TemplateForm
          data={template}
          onSubmit={onSubmit}
          formId="update-template-form"
        />
      )}
    </Box>
  );
}
