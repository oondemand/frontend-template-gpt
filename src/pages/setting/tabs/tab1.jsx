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
import { SelectEtapa } from "../../../components/selectEtapa";

export function Tab1({ settings }) {
  const { mutateAsync: updateSettingsMutation } = useMutation({
    mutationFn: SettingService.updateSetting,
  });

  const handleValueChange = async (e) => {
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
        <Text fontWeight="semibold" fontSize="md" color="orange.500">
          Email:
        </Text>
        <Flex wrap="wrap" gap="4" mt="4" alignItems="end">
          <FlushedInput {...inputSettingConfig("email-from")} />
          <FlushedInput {...inputSettingConfig("email-from-nome")} />
          <FlushedInput {...inputSettingConfig("email-copia")} />

          <SelectTemplate
            {...selectSettingConfig("template-email-assunto")}
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Template Assunto e-mail"
            placeholder="Template Assunto e-mail"
          />

          <SelectTemplate
            {...selectSettingConfig("template-email-corpo")}
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Template corpo"
          />

          <FlushedInput
            {...inputSettingConfig("sendgrid-api-key")}
            placeholder="***************"
            type="password"
          />
        </Flex>
      </Box>
      <Box mt="6">
        <Text fontWeight="semibold" fontSize="md" color="orange.500">
          Fatura/documento:
        </Text>
        <SelectTemplate
          {...selectSettingConfig("template-fatura")}
          w="md"
          size="md"
          variant=""
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          label="Template fatura"
        />
      </Box>
      <Box mt="6">
        <Text fontWeight="semibold" fontSize="md" color="orange.500">
          Etapas/omie
        </Text>
        <Flex wrap="wrap" gap="4" mt="4">
          <SelectEtapa
            {...selectSettingConfig("omie-etapa-gerar")}
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Etapa gerar"
          />
          <SelectEtapa
            {...selectSettingConfig("omie-etapa-processado")}
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Etapa processando"
          />
          <SelectEtapa
            {...selectSettingConfig("omie-etapa-erro")}
            w="md"
            size="md"
            variant=""
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            label="Etapa erro"
          />
        </Flex>
        <CaracteristicasForm
          title="Características do sistema"
          initialSettings={settings}
        />
      </Box>
    </Box>
  );
}
