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
import { AssistantService } from "../../services/assistant";

import { Box } from "@chakra-ui/react";

export function SelectAssistant({ label, ...props }) {
  const { data: assistants } = useQuery({
    queryKey: ["list-assistants"],
    queryFn: AssistantService.listAssistant,
  });

  const assistantsCollection = createListCollection({
    items:
      assistants?.map((e) => {
        return { label: e.nome, value: e._id };
      }) ?? [],
  });

  return (
    <Box>
      <SelectRoot rounded="md" collection={assistantsCollection} {...props}>
        {label && (
          <SelectLabel fontSize="md" color="orange.500">
            {label}
          </SelectLabel>
        )}
        <SelectTrigger>
          <SelectValueText placeholder="Selecione um assistente" />
        </SelectTrigger>
        <SelectContent zIndex={9999}>
          {assistantsCollection?.items?.map((assistant) => (
            <SelectItem
              cursor="pointer"
              rounded="sm"
              _hover={{ bg: "gray.100" }}
              item={assistant}
              key={assistant.value}
            >
              {assistant.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
}
