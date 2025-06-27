import { createListCollection } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

import { Box } from "@chakra-ui/react";

const kanbanOmieCollection = createListCollection({
  items: [
    { label: "Ordem de Serviço", value: "OrdemServico" },
    { label: "Pedido de Venda", value: "PedidoVenda" },
  ],
});

export function SelectKanbanOmie({ label, placeholder, ...props }) {
  return (
    <Box>
      <SelectRoot collection={kanbanOmieCollection} {...props}>
        {label && (
          <SelectLabel mb="-2" fontSize="xs" color="gray.700">
            {label}
          </SelectLabel>
        )}
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent zIndex={9999}>
          {kanbanOmieCollection?.items?.map((item) => (
            <SelectItem
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              item={item}
              key={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
}
