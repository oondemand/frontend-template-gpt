import { Flex, createListCollection } from "@chakra-ui/react";

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

import { useQuery } from "@tanstack/react-query";
import { BaseOmieService } from "../../services/baseOmie";
import { SelectBaseOmie } from "./selectBaseOmie";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  codigo: z.string().min(1, "Código é obrigatório"),
  valor: z.coerce.number().min(1, "Valor é obrigatório"),
  baseOmie: z.string().min(1, "Base omie é obrigatória").array(),
});

export function SettingsForm({ onSubmit, formId, data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      valor: data?.valor ? data.valor.intervaloSincronizacao?.toString() : "",
      baseOmie: data?.baseOmie ? [data.baseOmie] : "",
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Flex wrap="wrap" alignItems="center" gap="2">
        <Controller
          control={control}
          name="baseOmie"
          render={({ field }) => (
            <SelectBaseOmie
              label="Base omie"
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              onInteractOutside={() => field.onBlur()}
              w="xs"
            />
          )}
        />

        <TextInput
          label="Nome *"
          {...register("nome")}
          error={errors.nome?.message}
        />

        <TextInput
          label="Código *"
          {...register("codigo")}
          error={errors.codigo?.message}
        />

        <TextInput
          label="Valor"
          {...register("valor")}
          error={errors.valor?.message}
        />
      </Flex>
    </form>
  );
}
