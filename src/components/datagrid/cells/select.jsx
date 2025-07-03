import { useEffect, useState, useMemo } from "react";
import { Select, createListCollection, Portal } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectItemText,
} from "../../ui/select";

export const SelectCell = ({
  getValue,
  row,
  column,
  table,
  options,
  ...rest
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const optionsCollection = useMemo(() => {
    return createListCollection({
      items: [...options],
    });
  }, [options]);

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
      collection={optionsCollection}
      size="xs"
      variant="unstyled"
    >
      <SelectTrigger
        focusRing="inside"
        focusRingColor="gray.500"
        focusRingWidth="2px"
        rounded="sm"
      >
        <SelectValueText cursor="pointer" placeholder="Selecione uma opção" />
      </SelectTrigger>
      <SelectContent onBlur={onBlur}>
        {optionsCollection.items?.map((framework) => (
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
