import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { FilePenLine, Trash2, CopyPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";
import { CoinService } from "../../services/coin";
import { useConfirmation } from "../../hooks/confirmationModal";

import { tipoCotacaoMap, statusMap } from "../../_constants/maps.js";
import { useAuth } from "../../hooks/auth.jsx";

export function ListCoins() {
  const navigate = useNavigate();
  const { requestConfirmation } = useConfirmation();
  const { user } = useAuth();

  const {
    data: coins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-coins"],
    queryFn: CoinService.listCoins,
  });

  console.log("Coins", coins);

  const { mutateAsync: deleteCoinMutation } = useMutation({
    mutationFn: CoinService.deleteCoinById,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-coins"],
      });
    },
  });

  const onDelete = async (id) => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja deletar moeda?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (response.action === "confirmed") {
      try {
        const response = await deleteCoinMutation({ id });
        if (response.status === 200) {
          toast.success("Moeda deletada com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao deletar moeda!");
      }
    }
  };

  return (
    <>
      <Box maxH="800px" overflow="auto">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize="2xl" color="orange.500">
            Moedas
          </Heading>

          {user.tipo !== "padrao" && (
            <Button
              onClick={() => navigate("/moedas/create")}
              colorPalette="cyan"
            >
              Criar moeda
            </Button>
          )}
        </Flex>

        <Box mt="8">
          {isLoading && <Text>Listando moedas...</Text>}
          {!isLoading && error && <Text>Ouve um erro ao listar moedas!</Text>}
          {!isLoading && !error && coins.length == 0 && (
            <Text>Não foram encontradas moedas</Text>
          )}
          {!isLoading && coins && coins.length > 0 && (
            <Table.Root variant="line" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                  <Table.ColumnHeader>Símbolo</Table.ColumnHeader>
                  <Table.ColumnHeader>Tipo de cotação</Table.ColumnHeader>
                  <Table.ColumnHeader>Valor</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {coins.map((coin) => (
                  <Table.Row key={coin._id}>
                    <Table.Cell>{coin.nome}</Table.Cell>
                    <Table.Cell>{coin.simbolo}</Table.Cell>
                    <Table.Cell>{tipoCotacaoMap[coin.tipoCotacao]}</Table.Cell>
                    <Table.Cell>
                      {Number(coin?.cotacao?.valorFinal).toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>{statusMap[coin.status]}</Table.Cell>
                    <Table.Cell placeItems="end">
                      <Flex gap="4">
                        <IconButton
                          onClick={() => navigate(`/moeda/${coin._id}`)}
                          colorPalette="cyan"
                          size="xs"
                        >
                          <FilePenLine />
                        </IconButton>

                        {user.tipo !== "padrao" && (
                          <IconButton
                            onClick={() => navigate(`/moeda/${coin._id}/clone`)}
                            colorPalette="green"
                            size="xs"
                          >
                            <CopyPlus />
                          </IconButton>
                        )}

                        {user.tipo !== "padrao" && (
                          <IconButton
                            onClick={() => {
                              onDelete(coin._id);
                            }}
                            colorPalette="red"
                            size="xs"
                          >
                            <Trash2 />
                          </IconButton>
                        )}
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Box>
      </Box>
    </>
  );
}
