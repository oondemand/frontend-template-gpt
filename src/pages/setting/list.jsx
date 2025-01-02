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
import { SettingService } from "../../services/settings";
import { useConfirmation } from "../../hooks/confirmationModal";

export function ListSettings() {
  const navigate = useNavigate();
  const { requestConfirmation } = useConfirmation();

  const {
    data: settings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-settings"],
    queryFn: SettingService.listSettings,
  });

  const { mutateAsync: deleteSettingMutation } = useMutation({
    mutationFn: SettingService.deleteSettingById,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-settings"],
      });
    },
  });

  const onDelete = async (id) => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja deletar configuração?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (response.action === "confirmed") {
      try {
        const response = await deleteSettingMutation({ id });
        if (response.status === 200) {
          toast.success("Configuração deletada com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao deletar Configuração!");
      }
    }
  };

  return (
    <>
      <Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize="2xl" color="orange.500">
            Configurações
          </Heading>
          <Button
            onClick={() => navigate("/settings/create")}
            colorPalette="cyan"
          >
            Criar configuração
          </Button>
        </Flex>

        <Box mt="8">
          {isLoading && <Text>Listando configurações...</Text>}
          {!isLoading && error && (
            <Text>Ouve um erro ao listar configurações!</Text>
          )}
          {!isLoading && !error && settings.length == 0 && (
            <Text>Não foram encontradas configurações</Text>
          )}
          {!isLoading && settings && settings.length > 0 && (
            <Table.Root variant="line" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                  <Table.ColumnHeader>Codigo</Table.ColumnHeader>
                  <Table.ColumnHeader>Valor</Table.ColumnHeader>
                  <Table.ColumnHeader>Base omie</Table.ColumnHeader>
                  <Table.ColumnHeader />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {settings.map((setting) => (
                  <Table.Row key={setting._id}>
                    <Table.Cell>{setting.nome}</Table.Cell>
                    <Table.Cell>{setting.codigo}</Table.Cell>
                    <Table.Cell>
                      {setting?.valor?.intervaloSincronizacao}
                    </Table.Cell>
                    <Table.Cell>{setting.baseOmie}</Table.Cell>
                    <Table.Cell placeItems="end">
                      <Flex gap="4">
                        <IconButton
                          onClick={() => navigate(`/setting/${setting._id}`)}
                          colorPalette="cyan"
                          size="xs"
                        >
                          <FilePenLine />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            navigate(`/setting/${setting._id}/clone`)
                          }
                          colorPalette="green"
                          size="xs"
                        >
                          <CopyPlus />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            onDelete(setting._id);
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
