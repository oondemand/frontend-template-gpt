import { HStack, Flex, createListCollection } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../../components/ui/select";

import { useForm, Controller } from "react-hook-form";

import { TextInput } from "../../../components/input/textInput";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const statusOptions = createListCollection({
  items: [
    { label: "Ativo", value: "ativo" },
    { label: "Inativo", value: "inativo" },
    { label: "Arquivado", value: "arquivado" },
  ],
});

const tipeOptions = createListCollection({
  items: [
    { label: "Padrão", value: "usuario" },
    { label: "Administrador tenant", value: "admin-tenant" },
  ],
});

export function UsersForm({ onSubmit, formId, data, isCreating }) {
  const schema = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z
      .string()
      .transform((value) => (value === "" ? null : value))
      .nullable()
      .refine((value) => value === null || value.length >= 6, {
        message: "A senha deve ter no mínimo 6 caracteres",
      }),
    status: z.enum(["ativo", "inativo", "arquivado"]).array(),
    tipo: z.enum(["usuario", "admin-tenant"]).array(),
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
      status: data?.status ? [data.status] : ["ativo"],
      tipo: data?.tipo ? [data.tipo] : ["usuario"],
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="2">
        <HStack>
          <TextInput
            label="Nome *"
            {...register("nome")}
            error={errors.nome?.message}
          />

          <TextInput
            label="Email *"
            {...register("email")}
            error={errors.email?.message}
          />

          <TextInput
            label="Senha"
            type="password"
            {...register("senha")}
            error={errors.senha?.message}
          />

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
              >
                <SelectLabel fontSize="md" color="orange.500">
                  Status
                </SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder={field.value} />
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

          <Controller
            control={control}
            name="tipo"
            render={({ field }) => (
              <SelectRoot
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={tipeOptions}
              >
                <SelectLabel fontSize="md" color="orange.500">
                  Tipo
                </SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder={field.value} />
                </SelectTrigger>
                <SelectContent>
                  {tipeOptions.items.map((type) => (
                    <SelectItem item={type} key={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          />
        </HStack>
      </Flex>
    </form>
  );
}
