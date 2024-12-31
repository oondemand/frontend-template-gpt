import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { CoinsForm } from "./form";

import { CoinService } from "../../services/coin";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../config/react-query";

export function CreateCoins() {
  const { mutateAsync: createCoinsMutation } = useMutation({
    mutationFn: CoinService.createCoin,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-coins"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createCoinsMutation({
        body: {
          ...data,
          status: data.status[0],
          tipoCotacao: data.tipoCotacao[0],
        },
      });

      if (response.status === 201) {
        toast.success("Moeda criada com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao criar moeda!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Criar moeda
        </Heading>
        <Button type="submit" form="create-coin-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      <CoinsForm onSubmit={onSubmit} formId="create-coin-form" />
    </Box>
  );
}
