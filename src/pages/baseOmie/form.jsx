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

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(1, "CNPJ é obrigatório"),
  appKey: z.string().min(1, "AppKey é obrigatória"),
  appSecret: z.string().min(1, "AppSecret é obrigatória"),
  status: z.enum(["ativo", "inativo", "arquivado"]).array(),
});

export function BaseOmiesForm({ onSubmit, formId, data }) {
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
    },
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
          label="Cnpj *"
          {...register("cnpj")}
          error={errors.cnpj?.message}
        />

        <TextInput
          label="App key"
          {...register("appKey")}
          error={errors.appKey?.message}
        />

        <TextInput
          type="password"
          label="App secret"
          {...register("appSecret")}
          error={errors.appSecret?.message}
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
              w="xs"
            >
              <SelectLabel fontSize="md" color="orange.500">
                Status
              </SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder={field.name} />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.items?.map((status) => (
                  <SelectItem item={status} key={status.value}>
                    {status.label}
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
