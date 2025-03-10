import { createListCollection } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

import { useQuery } from "@tanstack/react-query";
import { SettingService } from "../../services/settings";

import { Box } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { queryClient } from "../../config/react-query";

export function SelectCategoria({
  label,
  baseOmieId,
  placeholder,
  defaultValue,
  clearable,
  onChange,
  ...props
}) {
  const [value, setValue] = useState([defaultValue]);

  const { data: categorias } = useQuery({
    queryKey: ["list-categorias", { baseOmieId }],
    queryFn: async () => await SettingService.listOmieCategories(baseOmieId),
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  const categoriasCollection = createListCollection({
    items:
      categorias?.map((e) => {
        return { label: `${e?.descricao} - ${e?.codigo}`, value: e?.codigo };
      }) ?? [],
  });

  return (
    <Box>
      <SelectRoot
        rounded="md"
        collection={categoriasCollection}
        value={value}
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
          {categoriasCollection?.items?.map((category) => (
            <SelectItem
              cursor="pointer"
              rounded="sm"
              _hover={{ bg: "gray.100" }}
              item={category}
              key={category.value}
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
}
