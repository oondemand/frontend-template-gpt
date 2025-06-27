import { Box, Flex, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";
import { SettingService } from "../../../services/settings";
import { toast } from "sonner";
import { FlushedInput } from "../input";
import { CaracteristicasForm } from "./caracteristicas";

export function Tab1({ settings }) {
  const { mutateAsync: updateSettingsMutation } = useMutation({
    mutationFn: SettingService.updateSetting,
  });

  const { mutateAsync: createSettingsMutation } = useMutation({
    mutationFn: SettingService.createSetting,
  });

  const settingsWithoutBaseOmies = settings?.filter((e) => !e?.baseOmie);

  const handleValueChange = async (e) => {
    if (e.target.defaultValue === e.target.value) return;

    try {
      const settingBaseOmie = settingsWithoutBaseOmies?.find(
        (setting) => setting.codigo == e.target.name
      );

      if (!settingBaseOmie) {
        await createSettingsMutation({
          body: {
            valor: e.target.value?.trim() ?? "",
            codigo: e.target.name,
          },
        });
      }

      if (settingBaseOmie) {
        await updateSettingsMutation({
          id: settingBaseOmie?._id,
          body: { valor: e.target.value?.trim() ?? "" },
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["list-settings"],
      });

      toast.success("Configuração atualizada com sucesso!");
    } catch (error) {
      toast.error("Ouve um erro ao atualizar campo!");
      console.error(error);
    }
  };

  const inputSettingConfig = (name) => {
    return {
      defaultValue: settingsWithoutBaseOmies?.find(
        (setting) => setting.codigo == name
      )?.valor,
      onBlur: handleValueChange,
      name,
    };
  };

  return (
    <Box>
      <Box mt="2">
        <Text fontWeight="semibold" fontSize="md" color="orange.500">
          Email:
        </Text>
        <Flex wrap="wrap" gap="4" mt="4" alignItems="end">
          <FlushedInput {...inputSettingConfig("email-from")} />
          <FlushedInput {...inputSettingConfig("email-from-nome")} />
          <FlushedInput {...inputSettingConfig("email-copia")} />

          <FlushedInput
            {...inputSettingConfig("sendgrid-api-key")}
            placeholder="***************"
            type="password"
          />
        </Flex>
      </Box>

      <Box mt="6">
        <CaracteristicasForm
          title="Características do sistema"
          initialSettings={settings}
        />
      </Box>
    </Box>
  );
}
