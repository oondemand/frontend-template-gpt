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
import { GatilhoService } from "../../services/gatilho";

export function SelectGatilho({ label, ...props }) {
  const { data: gatilhos } = useQuery({
    queryKey: ["triggers"],
    queryFn: GatilhoService.listTodosGatilhos,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  const gatilhosCollection = createListCollection({
    items:
      gatilhos?.map((e) => {
        return {
          label: `${e?._id.substring(0, 6)} - ${e?.kanbanOmie} | ${
            e?.etapaGeracao
          } - ${e?.etapaProcessado} - ${e?.etapaErro}`,
          value: e?._id,
        };
      }) ?? [],
  });

  return (
    <SelectRoot collection={gatilhosCollection} {...props}>
      {label && (
        <SelectLabel fontSize="xs" color="gray.700">
          {label}
        </SelectLabel>
      )}
      <SelectTrigger>
        <SelectValueText placeholder="Selecione gatilho" />
      </SelectTrigger>
      <SelectContent zIndex={9999}>
        {gatilhosCollection?.items?.map((gatilho) => (
          <SelectItem
            cursor="pointer"
            rounded="sm"
            _hover={{ bg: "gray.100" }}
            item={gatilho}
            key={gatilho.value}
          >
            {gatilho.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
