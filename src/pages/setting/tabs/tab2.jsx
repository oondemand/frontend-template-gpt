import {
  Box,
  Flex,
  Heading,
  Input,
  Tabs,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";
import { SettingService } from "../../../services/settings";
import { toast } from "sonner";
import { FlushedInput } from "../input";
import { SelectTemplate } from "../../../components/selectTemplate";
import { useState } from "react";
import { Trash } from "lucide-react";
import { CaracteristicasForm } from "./caracteristicas";
import { SelectBaseOmie } from "../../../components/selectBaseOmie";
import { BaseOmieService } from "../../../services/baseOmie";
import { SelectEtapa } from "../../../components/selectEtapa";

export function Tab2({ settings, defaultBaseOmie }) {
  const [baseOmie, setBaseOmie] = useState(defaultBaseOmie);

  const { mutateAsync: updateSettingsMutation } = useMutation({
    mutationFn: SettingService.updateSetting,
  });

  const handleValueChange = async (e) => {
    console.log("VALUE:", e.target.defaultValue, e.target.value, e.target.name);

    if (e.target.defaultValue === e.target.value) return;

    try {
      await updateSettingsMutation({
        id: settings?.find((setting) => setting.codigo == e.target.name)?._id,
        body: { valor: e.target.value.trim() },
      });

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
      defaultValue: settings?.find((setting) => setting.codigo == name)?.valor,
      onBlur: handleValueChange,
      name,
    };
  };

  const selectSettingConfig = (name) => {
    return {
      defaultValue: settings?.find((setting) => setting.codigo == name)?.valor,
      onChange: handleValueChange,
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
          }}
        />
      </Box>

      <Box mt="6">
        <Text fontWeight="semibold" fontSize="md" color="orange.500">
          Etapas/omie
        </Text>
        <Flex wrap="wrap" gap="4" mt="4">
          <SelectEtapa
            {...selectSettingConfig("omie-etapa-gerar")}
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
            clearable
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Etapa erro"
          />
        </Flex>
        {baseOmie && (
          <CaracteristicasForm
            title="Características do omie"
            initialSettings={settings}
            baseOmie={baseOmie}
          />
        )}
      </Box>
    </Box>
  );
}
