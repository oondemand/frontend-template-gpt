import { createListCollection } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { SettingService } from "../../services/settings";

import { useMemo } from "react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

import { Field } from "@chakra-ui/react";
import { DEFAULT_ETAPAS_SETTINGS } from "../../_constants/defaultConfigs";
import { formatarEtapasOmie } from "../../utils";

const filtrarEtapasPorKanban = (kanban, etapas) => {
  const keyMap = {
    OrdemServiço: "Venda de Serviço",
    PedidoVenda: "Venda de Produto",
  };

  if (!kanban || !etapas || !keyMap[kanban]) return [];

  const etapasFiltradas = etapas?.filter(
    (e) => e?.cDescOperacao === keyMap[kanban]
  );

  return formatarEtapasOmie({ etapas: etapasFiltradas });
};

export function SelectEtapa({
  label,
  placeholder,
  clearable,
  kanban,
  name,
  errors,
  ...props
}) {
  const { data: etapasOmie } = useQuery({
    queryKey: ["list-etapas", kanban],
    queryFn: () => SettingService.listOmieStage(),
    staleTime: Infinity,
  });

  const etapasCollection = useMemo(() => {
    const source = etapasOmie
      ? filtrarEtapasPorKanban(kanban, etapasOmie)
      : DEFAULT_ETAPAS_SETTINGS;

    const items = source.map((etapa) => ({
      label: etapa.cDescricao
        ? `${etapa.cCodigo} - ${etapa.cDescricao}`
        : etapa.cCodigo,
      value: etapa.cCodigo,
    }));

    return createListCollection({ items });
  }, [etapasOmie, kanban]);

  return (
    <Field.Root invalid={!!errors?.[name]}>
      {label && (
        <Field.Label fontSize="xs" color="gray.700">
          {label}
        </Field.Label>
      )}
      <SelectRoot collection={etapasCollection} {...props}>
        <SelectTrigger clearable={clearable}>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent zIndex={9999}>
          {etapasCollection?.items?.map((etapas) => (
            <SelectItem
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              item={etapas}
              key={etapas.value}
            >
              {etapas.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      {errors?.[name] && (
        <Field.ErrorText>{errors?.[name]?.message}</Field.ErrorText>
      )}
    </Field.Root>
  );
}
