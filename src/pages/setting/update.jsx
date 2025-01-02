import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { IaChat } from "../../components/iaChat";
import { SettingsForm } from "./form";

import { SettingService } from "../../services/settings";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../config/react-query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function UpdateSettings() {
  const { id } = useParams();

  const {
    data: setting,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["setting", { id }],
    queryFn: async () => await SettingService.getSetting({ id }),
  });

  const { mutateAsync: updateSettingsMutation } = useMutation({
    mutationFn: SettingService.updateSetting,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-settings"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateSettingsMutation({
        id,
        body: {
          ...data,
          baseOmie: data.baseOmie[0],
          valor: {
            integracaoAutomatica: true,
            intervaloSincronizacao: data.valor,
          },
        },
      });

      if (response.status === 200) {
        toast.success("Configuração atualizada com sucesso!");
      }
    } catch (error) {
      console.log(error);

      toast.error("Ouve um erro ao atualizar configuração!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Destalhes da configuração
        </Heading>
        <Button type="submit" form="update-setting-form" colorPalette="cyan">
          Atualizar
        </Button>
      </Flex>
      {!isLoading && setting && (
        <SettingsForm
          data={setting}
          onSubmit={onSubmit}
          formId="update-setting-form"
        />
      )}
    </Box>
  );
}
