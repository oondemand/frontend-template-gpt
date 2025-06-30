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
import { TemplateService } from "../../services/template";

import { Box } from "@chakra-ui/react";

export function SelectTemplate({ label, placeholder, defaultValue, ...props }) {
  const { data: templates } = useQuery({
    queryKey: ["list-templates"],
    queryFn: TemplateService.listTemplates,
  });

  const templateCollection = createListCollection({
    items:
      templates?.map((e) => {
        return { label: e.codigo, value: e?._id };
      }) ?? [],
  });

  return (
    <SelectRoot
      defaultValue={[defaultValue]}
      rounded="xs"
      collection={templateCollection}
      {...props}
    >
      {label && (
        <SelectLabel fontSize="xs" color="gray.700">
          {label}
        </SelectLabel>
      )}
      <SelectTrigger>
        <SelectValueText />
      </SelectTrigger>
      <SelectContent zIndex={9999}>
        {templateCollection?.items?.map((template) => (
          <SelectItem
            cursor="pointer"
            rounded="sm"
            _hover={{ bg: "gray.100" }}
            item={template}
            key={template.value}
          >
            {template.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
