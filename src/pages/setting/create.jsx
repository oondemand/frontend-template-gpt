import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { SettingsForm } from "./form";

import { SettingService } from "../../services/settings";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../config/react-query";
import { withRestriction } from "../../components/withRestriction";

export function _CreateSettings() {
  const { mutateAsync: createSettingsMutation } = useMutation({
    mutationFn: SettingService.createSetting,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-settings"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createSettingsMutation({
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
          Criar configuração
        </Heading>
        <Button type="submit" form="create-setting-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>

      <SettingsForm onSubmit={onSubmit} formId="create-setting-form" />
    </Box>
  );
}

export const CreateSettings = withRestriction(["padrao"], _CreateSettings);
