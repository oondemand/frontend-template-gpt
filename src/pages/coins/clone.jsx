import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { CoinsForm } from "./form";

import { CoinService } from "../../services/coin";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../config/react-query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { withRestriction } from "../../components/withRestriction";

export function _CloneCoins() {
  _;
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

  const { mutateAsync: cloneCoinsMutation } = useMutation({
    mutationFn: CoinService.createCoin,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-coins"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await cloneCoinsMutation({
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
          Clonar moeda
        </Heading>
        <Button type="submit" form="clone-coin-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      {coin && !isLoading && (
        <CoinsForm data={coin} onSubmit={onSubmit} formId="clone-coin-form" />
      )}
    </Box>
  );
}

export const CloneCoins = withRestriction(["padrao"], _CloneCoins);
