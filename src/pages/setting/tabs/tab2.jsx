import { Box, Flex, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";
import { SettingService } from "../../../services/settings";
import { toast } from "sonner";
import { FlushedInput } from "../input";
import { useState } from "react";
import { CaracteristicasForm } from "./caracteristicas";
import { SelectBaseOmie } from "../../../components/selectBaseOmie";
import { SelectEtapa } from "../../../components/selectEtapa";
import { Switch } from "../../../components/ui/switch";
import { SelectCategoria } from "../../../components/selectCategoria";

export function Tab2({ settings, defaultBaseOmie }) {
  const [baseOmie, setBaseOmie] = useState(defaultBaseOmie);
  const [addManualCode, setAddManualCode] = useState(false);

  const { mutateAsync: updateSettingsMutation } = useMutation({
    mutationFn: SettingService.updateSetting,
  });

  const { mutateAsync: createSettingsMutation } = useMutation({
    mutationFn: SettingService.createSetting,
  });

  const settingsPerBaseOmie = settings?.filter(
    (e) => e?.baseOmie?._id === baseOmie
  );

  const handleValueChange = async (e) => {
    if (e.target.defaultValue === e.target.value) return;

    try {
      const settingBaseOmie = settingsPerBaseOmie?.find(
        (setting) => setting.codigo == e.target.name
      );

      if (!settingBaseOmie) {
        await createSettingsMutation({
          body: {
            baseOmie,
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

  const handleSwitchChange = async (e) => {
    try {
      const settingBaseOmie = settingsPerBaseOmie?.find(
        (setting) => setting.codigo == e.target.name
      );

      if (!settingBaseOmie) {
        await createSettingsMutation({
          body: {
            baseOmie,
            valor: e.target.checked,
            codigo: e.target.name,
          },
        });
      }

      if (settingBaseOmie) {
        await updateSettingsMutation({
          id: settingBaseOmie?._id,
          body: { valor: e.target.checked },
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
      defaultValue: settingsPerBaseOmie?.find(
        (setting) => setting.codigo == name
      )?.valor,
      onBlur: handleValueChange,
      name,
    };
  };

  const selectSettingConfig = (name) => {
    return {
      defaultValue: settingsPerBaseOmie?.find(
        (setting) => setting.codigo == name
      )?.valor,
      onChange: handleValueChange,
      name,
    };
  };

  const switchSettingConfig = (name) => {
    return {
      checked:
        settingsPerBaseOmie?.find((setting) => setting.codigo == name)?.valor ==
        true,
      onChange: handleSwitchChange,
      name,
    };
  };

  return (
    <Box>
      <Box mt="2">
        <SelectBaseOmie
          defaultValue={[baseOmie]}
          w="xs"
          variant=""
          rounded="xs"
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          onChange={(e) => {
            setBaseOmie(e.target.value);
            setAddManualCode(false);
          }}
        />
      </Box>

      <Box mt="6">
        {/* <Text fontWeight="semibold" fontSize="md" color="orange.500">
          Etapas/omie
        </Text>
        <Flex wrap="wrap" gap="4" mt="4">
          <SelectEtapa
            {...selectSettingConfig("omie-etapa-gerar")}
            baseOmieId={baseOmie}
            clearable
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Etapa gerar"
          />
          <SelectEtapa
            {...selectSettingConfig("omie-etapa-processado")}
            baseOmieId={baseOmie}
            clearable
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Etapa processando"
          />
          <SelectEtapa
            {...selectSettingConfig("omie-etapa-erro")}
            baseOmieId={baseOmie}
            clearable
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Etapa erro"
          />
        </Flex> */}
        {/* <Flex mt="6" gap="4" alignItems="center">
          <Text fontWeight="semibold" fontSize="md" color="orange.500">
            Adiantamento
          </Text>
          <Switch
            colorPalette="orange"
            {...switchSettingConfig("omie-adiantamento-gerar")}
          />
        </Flex> */}

        {/* <Flex wrap="wrap" gap="4" mt="4" alignItems="flex-end">
          <SelectCategoria
            {...selectSettingConfig("omie-adiantamento-categoria")}
            clearable
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Categoria adiantamento"
            baseOmieId={baseOmie}
          />
        </Flex> */}
        {/* <Flex flexDir="column" mt="4" gap="2">
          <Box
            py="0.5"
            w="md"
            color="gray.500"
            cursor="pointer"
            fontSize="sm"
            _hover={{ color: "gray.800" }}
            onClick={() => setAddManualCode(!addManualCode)}
          >
            <Text>Adicionar cód categoria manualmente</Text>
          </Box>
          {addManualCode && (
            <FlushedInput
              {...inputSettingConfig("omie-adiantamento-categoria")}
              placeholder="Digite cód categoria"
              label=" "
            />
          )}
        </Flex> */}

        {baseOmie && (
          <CaracteristicasForm
            title="Características do omie"
            initialSettings={settingsPerBaseOmie}
            baseOmie={baseOmie}
          />
        )}
      </Box>
    </Box>
  );
}
