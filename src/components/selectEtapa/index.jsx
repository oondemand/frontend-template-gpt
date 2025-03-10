import { createListCollection } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { SettingService } from "../../services/settings";

import { useEffect, useMemo, useState } from "react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

import { Box } from "@chakra-ui/react";
import { DEFAULT_ETAPAS_SETTINGS } from "../../_constants/defaultConfigs";

export function SelectEtapa({
  label,
  placeholder,
  defaultValue,
  clearable,
  baseOmieId,
  onChange,
  ...props
}) {
  const [value, setValue] = useState([defaultValue]);

  const { data: etapasOmie } = useQuery({
    queryKey: ["list-etapas", { baseOmieId }],
    queryFn: async () => await SettingService.listOmieStage(baseOmieId),
    staleTime: 1000 * 60 * 10, // 10 minutos
    enabled: !!baseOmieId,
  });

  let items = [];

  if (etapasOmie) {
    items = etapasOmie?.map((etapa) => ({
      label: `${etapa?.cDescricao} - ${etapa?.cCodigo}`,
      value: etapa?.cCodigo,
    }));
  }

  if (!etapasOmie) {
    items = DEFAULT_ETAPAS_SETTINGS.map((etapa) => ({
      label: `${etapa?.cCodigo}`,
      value: etapa?.cCodigo,
    }));
  }

  const etapasCollection = useMemo(() => {
    return createListCollection({ items });
  }, [etapasOmie, baseOmieId]);

  useEffect(() => {
    setValue([defaultValue]);
  }, [defaultValue, baseOmieId]);

  return (
    <Box>
      <SelectRoot
        value={value}
        rounded="xs"
        collection={etapasCollection}
        onValueChange={(e) => {
          setValue((prev) => {
            onChange({
              target: {
                name: props.name,
                value: e.value[0],
                defaultValue: prev[0],
              },
            });

            return e.value;
          });
        }}
        {...props}
      >
        {label && (
          <SelectLabel mb="-2" fontSize="xs" color="gray.700">
            {label}
          </SelectLabel>
        )}
        <SelectTrigger clearable={clearable}>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent zIndex={9999}>
          {etapasCollection?.items?.map((etapas) => (
            <SelectItem
              cursor="pointer"
              rounded="sm"
              _hover={{ bg: "gray.100" }}
              item={etapas}
              key={etapas.value}
            >
              {etapas.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
}
