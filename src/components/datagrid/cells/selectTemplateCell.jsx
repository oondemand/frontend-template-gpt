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
import { TemplateService } from "../../../services/template";

export const SelectTemplateCell = ({
  getValue,
  row,
  column,
  table,
  ...rest
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  console.log("[value]:", initialValue);

  const { data: templates } = useQuery({
    queryKey: ["list-templates"],
    queryFn: TemplateService.listTemplates,
    staleTime: Infinity,
  });

  const templatesCollection = useMemo(() => {
    return createListCollection({
      items:
        templates?.map((e) => {
          return { label: e.codigo, value: e._id };
        }) ?? [],
    });
  }, [templates]);

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
      collection={templatesCollection}
      size="xs"
      variant="unstyled"
    >
      <SelectTrigger
        focusRing="inside"
        focusRingColor="gray.500"
        focusRingWidth="2px"
        rounded="sm"
      >
        <SelectValueText cursor="pointer" placeholder="Selecione um template" />
      </SelectTrigger>
      <SelectContent onBlur={onBlur}>
        {templatesCollection.items.map((item) => (
          <SelectItem
            cursor="pointer"
            rounded="sm"
            _hover={{ bg: "gray.100" }}
            item={item}
            key={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
