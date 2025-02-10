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
import { withRestriction } from "../../components/withRestriction";

function _CloneSettings() {
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

  const { mutateAsync: cloneSettingsMutation } = useMutation({
    mutationFn: SettingService.createSetting,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-settings"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await cloneSettingsMutation({
        body: {
          ...data,
          baseOmie: data.baseOmie[0],
        },
      });

      if (response.status === 201) {
        toast.success("Configuração criada com sucesso!");
      }
    } catch (error) {
      console.log(error);

      toast.error("Ouve um erro ao criar configuração!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Clonar configuração
        </Heading>
        <Button type="submit" form="clone-setting-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      {!isLoading && setting && (
        <SettingsForm
          data={setting}
          onSubmit={onSubmit}
          formId="clone-setting-form"
        />
      )}
    </Box>
  );
}

export const CloneSettings = withRestriction(["padrao"], _CloneSettings);
