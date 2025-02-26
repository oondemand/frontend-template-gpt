import {
  Formik,
  Field,
  ErrorMessage,
  Form as FormikForm,
  useFormik,
} from "formik";

import {
  Button,
  Input,
  VStack,
  Text,
  Box,
  HStack,
  Flex,
  Textarea,
  createListCollection,
} from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";

import { useForm, Controller } from "react-hook-form";

import { TextInput } from "../../components/input/textInput";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const statusOptions = createListCollection({
  items: [
    { label: "Ativo", value: "ativo" },
    { label: "Inativo", value: "inativo" },
    { label: "Arquivado", value: "arquivado" },
  ],
});

const countingOptions = createListCollection({
  items: [
    { label: "Cotação", value: "cotacao" },
    { label: "Porcentagem", value: "porcentagem" },
    { label: "Valor fixo", value: "valorFixo" },
  ],
});

const schema = z.object({
  nome: z.string().min(1, "O nome é obrigatório").optional(),
  simbolo: z
    .string()
    .max(5, "Símbolo deve ter no máximo 5 caracteres")
    .min(1, "Símbolo é obrigatório"),
  valor: z.coerce.number().positive("Valor deve ser positivo").optional(),
  status: z.enum(["ativo", "inativo", "arquivado"]).array().optional(),
  tipoCotacao: z
    .enum(["cotacao", "porcentagem", "valorFixo"])
    .array()
    .optional(),
});

export function CoinsForm({ onSubmit, formId, data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      status: data?.status ? [data.status] : ["ativo"],
      tipoCotacao: data?.tipoCotacao ? [data.tipoCotacao] : ["cotacao"],
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Flex wrap="wrap" alignItems="center" gap="2">
        <TextInput
          label="Simbolo *"
          {...register("simbolo")}
          error={errors.simbolo?.message}
        />

        {data && (
          <TextInput
            label="Valor"
            {...register("valor")}
            error={errors.valor?.message}
          />
        )}

        {data && (
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <SelectRoot
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={statusOptions}
                w="xs"
              >
                <SelectLabel fontSize="md" color="orange.500">
                  Status
                </SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder={field.name} />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.items.map((status) => (
                    <SelectItem item={status} key={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          />
        )}

        {data && (
          <Controller
            control={control}
            name="tipoCotacao"
            render={({ field }) => (
              <SelectRoot
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={countingOptions}
                w="xs"
              >
                <SelectLabel fontSize="md" color="orange.500">
                  Cotação
                </SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder={field.name} />
                </SelectTrigger>
                <SelectContent>
                  {countingOptions.items.map((tipoCotacao) => (
                    <SelectItem item={tipoCotacao} key={tipoCotacao.value}>
                      {tipoCotacao.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          />
        )}
      </Flex>
    </form>
  );
}
