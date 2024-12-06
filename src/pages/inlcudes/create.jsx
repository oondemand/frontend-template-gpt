import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { IaChat } from "../../components/iaChat";
import { IncludeForm } from "./form";

export function CreateInclude() {
  const onSubmit = async (data) => {
    console.log("[DATA]:", data);

    return true;
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Criar include
        </Heading>
        <Button type="submit" form="create-include-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      <IncludeForm onSubmit={onSubmit} formId="create-include-form" />
      <IaChat />
    </Box>
  );
}
