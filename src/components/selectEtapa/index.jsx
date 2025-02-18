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

const etapas = [
  {
    cCodigo: "00",
    cDescrPadrao: "Proposta",
    cDescricao: "Proposta",
    cInativo: "S",
  },
  {
    cCodigo: "10",
    cDescrPadrao: "Ordem de Serviço",
    cDescricao: "Ordem de Serviço",
    cInativo: "N",
  },
  {
    cCodigo: "20",
    cDescrPadrao: "Em Execução",
    cDescricao: "Em Execução",
    cInativo: "N",
  },
  {
    cCodigo: "30",
    cDescrPadrao: "Executada",
    cDescricao: "Gerar Invoice",
    cInativo: "N",
  },
  {
    cCodigo: "50",
    cDescrPadrao: "Faturar",
    cDescricao: "Faturar",
    cInativo: "N",
  },
  {
    cCodigo: "60",
    cDescrPadrao: "Faturado",
    cDescricao: "Faturado",
    cInativo: "N",
  },
];

export function SelectEtapa({ label, placeholder, defaultValue, ...props }) {
  const etapasCollection = createListCollection({
    items:
      etapas?.map((e) => {
        return {
          label: `${e.cDescricao} - n ${e?.cCodigo}`,
          value: e?.cCodigo,
        };
      }) ?? [],
  });

  return (
    <Box>
      <SelectRoot
        defaultValue={[defaultValue]}
        rounded="xs"
        collection={etapasCollection}
        {...props}
      >
        {label && (
          <SelectLabel mb="-2" fontSize="xs" color="gray.700">
            {label}
          </SelectLabel>
        )}
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent zIndex={9999}>
          {etapasCollection?.items?.map((etapas) => (
            <SelectItem
              cursor="pointer"
              rounded="sm"
              _hover={{ bg: "gray.100" }}
              item={etapas}
              key={etapas.value}
            >
              {etapas.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
}
