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
import { BaseOmieService } from "../../services/baseOmie";

import { Box } from "@chakra-ui/react";

export function SelectBaseOmie({ label, ...props }) {
  const { data: baseOmies } = useQuery({
    queryKey: ["list-base-omies"],
    queryFn: BaseOmieService.listBaseOmies,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  const baseOmiesCollection = createListCollection({
    items:
      baseOmies?.map((e) => {
        return { label: e.nome, value: e._id };
      }) ?? [],
  });

  return (
    <SelectRoot collection={baseOmiesCollection} {...props}>
      {label && (
        <SelectLabel fontSize="xs" color="gray.700">
          {label}
        </SelectLabel>
      )}
      <SelectTrigger>
        <SelectValueText placeholder="Selecione base omie" />
      </SelectTrigger>
      <SelectContent zIndex={9999}>
        {baseOmiesCollection?.items?.map((baseOmie) => (
          <SelectItem
            cursor="pointer"
            rounded="sm"
            _hover={{ bg: "gray.100" }}
            item={baseOmie}
            key={baseOmie.value}
          >
            {baseOmie.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
