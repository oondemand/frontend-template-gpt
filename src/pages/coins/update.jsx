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
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BackButton } from "../../components/ui/back-button";

export function UpdateCoins() {
  const { id } = useParams();

  const {
    data: coin,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["coin", { id }],
    queryFn: async () => await CoinService.getCoin({ id }),
  });

  const { mutateAsync: updateCoinsMutation } = useMutation({
    mutationFn: CoinService.updateCoin,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-coins"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateCoinsMutation({
        id,
        body: {
          ...data,
          status: data.status[0],
          tipoCotacao: data.tipoCotacao[0],
        },
      });

      if (response.status === 200) {
        toast.success("Moeda atualizada com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao atualizar moeda!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Detalhes da moeda
        </Heading>
        <Flex alignItems="center" gap="2">
          <BackButton />
          <Button type="submit" form="update-coin-form" colorPalette="cyan">
            Atualizar
          </Button>
        </Flex>
      </Flex>
      {coin && !isLoading && (
        <CoinsForm data={coin} onSubmit={onSubmit} formId="update-coin-form" />
      )}
    </Box>
  );
}
