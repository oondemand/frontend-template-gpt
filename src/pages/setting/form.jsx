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

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  codigo: z.string().min(1, "Código é obrigatório"),
  valor: z.coerce.number().min(1, "Valor é obrigatório"),
  baseOmie: z.string().min(1, "Base omie é obrigatória").array(),
});

export function SettingsForm({ onSubmit, formId, data }) {
  const {
    data: baseOmies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-base-omies"],
    queryFn: BaseOmieService.listBaseOmies,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      valor: data?.valor ? data.valor.intervaloSincronizacao.toString() : "",
      baseOmie: data?.baseOmie ? [data.baseOmie] : "",
    },
  });

  if (!baseOmies && !isLoading) {
    return <div>Base omies não encontradas</div>;
  }

  if (isLoading) {
    return <div>Listando base omies</div>;
  }

  const baseOmiesCollection = createListCollection({
    items: baseOmies.map((e) => {
      return { label: e.nome, value: e._id };
    }),
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Flex wrap="wrap" alignItems="center" gap="2">
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

        <Controller
          control={control}
          name="baseOmie"
          render={({ field }) => (
            <SelectRoot
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              onInteractOutside={() => field.onBlur()}
              collection={baseOmiesCollection}
              w="xs"
            >
              <SelectLabel fontSize="md" color="orange.500">
                Base omie
              </SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Selecione base omie" />
              </SelectTrigger>
              <SelectContent>
                {baseOmiesCollection.items.map((baseOmie) => (
                  <SelectItem item={baseOmie} key={baseOmie.value}>
                    {baseOmie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
        />
      </Flex>
    </form>
  );
}
