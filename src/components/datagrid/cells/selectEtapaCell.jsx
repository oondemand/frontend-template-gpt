import { useEffect, useState, useMemo } from "react";
import { createListCollection } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { SettingService } from "../../../services/settings";
import { DEFAULT_ETAPAS_SETTINGS } from "../../../_constants/defaultConfigs";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select";

export const SelectEtapaCell = ({ getValue, row, column, table, ...rest }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const { data: etapasOmie } = useQuery({
    queryKey: ["list-etapas", row.original?.kanbanOmie],
    queryFn: () => SettingService.listOmieStage(),
    staleTime: Infinity,
  });

  const etapasCollection = useMemo(() => {
    const source = etapasOmie
      ? etapasOmie[row.original?.kanbanOmie]
      : DEFAULT_ETAPAS_SETTINGS;

    const items = source.map((etapa) => ({
      label: `${etapa.codigo} - ${etapa.descricao}`,
      value: etapa.codigo,
    }));

    return createListCollection({ items });
  }, [etapasOmie, row.original?.kanbanOmie]);

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
