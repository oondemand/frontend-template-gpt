import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { IaChat } from "../../components/iaChat";
import { TemplateForm } from "./form";

import { TemplateService } from "../../services/template";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../config/react-query";

export function CreateTemplate() {
  const { mutateAsync: createTemplateMutation } = useMutation({
    mutationFn: TemplateService.createTemplate,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-templates"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createTemplateMutation({
        dados: { ...data, status: data.status[0] },
      });

      if (response.status === 201) {
        toast.success("Template criada com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao criar template!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Criar template
        </Heading>
        <Button type="submit" form="create-template-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      <TemplateForm onSubmit={onSubmit} formId="create-template-form" />
      <IaChat />
    </Box>
  );
}
