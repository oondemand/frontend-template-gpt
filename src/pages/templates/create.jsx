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

export function CreateTemplate() {
  const onSubmit = async (data) => {
    console.log("[DATA]:", data);

    return true;
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Criar template
        </Heading>
        <Button type="submit" form="create-include-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      <TemplateForm onSubmit={onSubmit} formId="create-include-form" />
      <IaChat />
    </Box>
  );
}
