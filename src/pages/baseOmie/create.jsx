import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { BaseOmiesForm } from "./form";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../config/react-query";
import { BaseOmieService } from "../../services/baseOmie";
import { BackButton } from "../../components/ui/back-button";

export function CreateBaseOmies() {
  const { mutateAsync: createBaseOmieMutation } = useMutation({
    mutationFn: BaseOmieService.createBaseOmie,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-base-omies"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createBaseOmieMutation({
        body: {
          ...data,
          status: data.status[0],
        },
      });

      if (response.status === 201) {
        toast.success("Base omie criada com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao criar base omie!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Criar base omie
        </Heading>
        <Flex alignItems="center" gap="2">
          <BackButton />
          <Button type="submit" form="create-coin-form" colorPalette="cyan">
            Salvar
          </Button>
        </Flex>
      </Flex>
      <BaseOmiesForm onSubmit={onSubmit} formId="create-coin-form" />
    </Box>
  );
}
