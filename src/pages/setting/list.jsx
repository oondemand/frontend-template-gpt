import { Box, Heading, Button, Flex, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";
import { SettingService } from "../../services/settings";
import { useConfirmation } from "../../hooks/confirmationModal";

import { SettingsTable } from "./table";
import { useAuth } from "../../hooks/auth";

export function ListSettings() {
  const navigate = useNavigate();
  const { requestConfirmation } = useConfirmation();
  const { user } = useAuth();

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
          {user.tipo !== "padrao" && (
            <Button
              onClick={() => navigate("/settings/create")}
              colorPalette="cyan"
            >
              Criar configuração
            </Button>
          )}
        </Flex>

        <Box mt="8" maxH="800px" overflow="auto">
          {isLoading && <Text>Listando configurações...</Text>}
          {!isLoading && error && (
            <Text>Ouve um erro ao listar configurações!</Text>
          )}
          {!isLoading && !error && settings.length <= 1 && (
            <Text>Não foram encontradas configurações</Text>
          )}
          {!isLoading && settings && settings.length > 1 && (
            <SettingsTable data={settings} onDelete={onDelete} />
          )}
        </Box>
      </Box>
    </>
  );
}
