import { useEffect, useState, useMemo } from "react";
import { createListCollection } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select";

import { useQuery } from "@tanstack/react-query";
import { BaseOmieService } from "../../../services/baseOmie";

export const SelectBaseOmieCell = ({
  getValue,
  row,
  column,
  table,
  ...rest
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const { data: baseOmies } = useQuery({
    queryKey: ["list-base-omies"],
    queryFn: BaseOmieService.listBaseOmies,
    staleTime: Infinity,
  });

  const baseOmiesCollection = useMemo(() => {
    return createListCollection({
      items:
        baseOmies?.map((e) => {
          return { label: e.nome, value: e._id };
        }) ?? [],
    });
  }, [baseOmies]);

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
      collection={baseOmiesCollection}
      size="xs"
      variant="unstyled"
    >
      <SelectTrigger
        focusRing="inside"
        focusRingColor="gray.500"
        focusRingWidth="2px"
        rounded="sm"
      >
        <SelectValueText cursor="pointer" placeholder="Selecione uma base" />
      </SelectTrigger>
      <SelectContent onBlur={onBlur}>
        {baseOmiesCollection.items.map((framework) => (
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
