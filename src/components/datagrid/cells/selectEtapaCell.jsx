import { useEffect, useState, useMemo } from "react";
import { createListCollection } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select";

import { DEFAULT_ETAPAS_SETTINGS } from "../../../_constants/defaultConfigs";
import { useQuery } from "@tanstack/react-query";
import { SettingService } from "../../../services/settings";

export const SelectEtapaCell = ({
  getValue,
  row,
  column,
  table,
  options,
  ...rest
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const { data: etapasOmie } = useQuery({
    queryKey: ["list-etapas", { baseOmieId: row.original?.["base-omie"] }],
    queryFn: () => SettingService.listOmieStage(row.original?.["base-omie"]),
    staleTime: Infinity,
    enabled: !!row.original?.["base-omie"],
  });

  const etapasCollection = useMemo(() => {
    const source = etapasOmie ?? DEFAULT_ETAPAS_SETTINGS;

    const items = source.map((etapa) => ({
      label: etapa.cDescricao
        ? `${etapa.cDescricao} - ${etapa.cCodigo}`
        : etapa.cCodigo,
      value: etapa.cCodigo,
    }));

    return createListCollection({ items });
  }, [etapasOmie]);

  const onBlur = async () => {
    if (value !== initialValue) {
      try {
        await table.options.meta?.updateData({
          id: row.original._id,
          data: { [column.columnDef.accessorKey]: value },
        });
      } catch (error) {
        console.log(error);
        setValue(initialValue);
      }
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <SelectRoot
      value={[value]}
      onValueChange={(e) => {
        setValue(e.value[0]);
      }}
      collection={etapasCollection}
      size="xs"
      variant="unstyled"
    >
      <SelectTrigger
        focusRing="inside"
        focusRingColor="gray.500"
        focusRingWidth="2px"
        rounded="sm"
      >
        <SelectValueText cursor="pointer" placeholder="Selecione uma etapa" />
      </SelectTrigger>
      <SelectContent onBlur={onBlur}>
        {etapasCollection.items.map((framework) => (
          <SelectItem
            cursor="pointer"
            rounded="sm"
            _hover={{ bg: "gray.100" }}
            item={framework}
            key={framework.value}
          >
            {framework.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
