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
import { BaseOmieService } from "../../services/baseOmie";
import { useConfirmation } from "../../hooks/confirmationModal";

import { tipoCotacaoMap, statusMap } from "../../_constants/maps.js";

export function ListBaseOmies() {
  const navigate = useNavigate();
  const { requestConfirmation } = useConfirmation();

  const {
    data: baseOmies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-base-omies"],
    queryFn: BaseOmieService.listBaseOmies,
  });

  const { mutateAsync: deleteBaseOmieMutation } = useMutation({
    mutationFn: BaseOmieService.deleteBaseOmieById,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-base-omies"],
      });
    },
  });

  const onDelete = async (id) => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja deletar base omie?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (response.action === "confirmed") {
      try {
        const response = await deleteBaseOmieMutation({ id });
        if (response.status === 200) {
          toast.success("Moeda deletada com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao deletar base omie!");
      }
    }
  };

  return (
    <>
      <Box maxH="800px" overflow="auto">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize="2xl" color="orange.500">
            Base Omies
          </Heading>
          <Button
            onClick={() => navigate("/base-omies/create")}
            colorPalette="cyan"
          >
            Criar base omie
          </Button>
        </Flex>

        <Box mt="8">
          {isLoading && <Text>Listando base omies...</Text>}
          {!isLoading && error && (
            <Text>Ouve um erro ao listar base omies!</Text>
          )}
          {!isLoading && !error && baseOmies.length == 0 && (
            <Text>Não foram encontradas base omies</Text>
          )}
          {!isLoading && baseOmies && baseOmies.length > 0 && (
            <Table.Root variant="line" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                  <Table.ColumnHeader>Cnpj</Table.ColumnHeader>
                  {/* <Table.ColumnHeader>App key</Table.ColumnHeader>
                  <Table.ColumnHeader>App secret</Table.ColumnHeader> */}
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {baseOmies.map((baseOmie) => (
                  <Table.Row key={baseOmie._id}>
                    <Table.Cell>{baseOmie.nome}</Table.Cell>
                    <Table.Cell>{baseOmie.cnpj}</Table.Cell>
                    {/* <Table.Cell>{baseOmie.appKey}</Table.Cell>
                    <Table.Cell>{baseOmie.appSecret}</Table.Cell> */}
                    <Table.Cell>{statusMap[baseOmie.status]}</Table.Cell>
                    <Table.Cell placeItems="end">
                      <Flex gap="4">
                        <IconButton
                          onClick={() => navigate(`/base-omie/${baseOmie._id}`)}
                          colorPalette="cyan"
                          size="xs"
                        >
                          <FilePenLine />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            navigate(`/base-omie/${baseOmie._id}/clone`)
                          }
                          colorPalette="green"
                          size="xs"
                        >
                          <CopyPlus />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            onDelete(baseOmie._id);
                          }}
                          colorPalette="red"
                          size="xs"
                        >
                          <Trash2 />
                        </IconButton>
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
