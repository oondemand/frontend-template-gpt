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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nome: z.string().nonempty("Nome obrigatório!"),
  codigo: z.string().nonempty("Código obrigatório!"),
  descricao: z.string().nonempty("Descrição obrigatória!"),
  conteudo: z.string().nonempty("Conteúdo obrigatório!"),
  contenType: z.string().nonempty("Content Type obrigatório!"),
  status: z.string().nonempty("Status obrigatório!").array(),
});

import { TextInput } from "../../components/input/textInput";

const statusOptions = createListCollection({
  items: [
    { label: "ativo", value: "ativo" },
    { label: "inativo", value: "inativo" },
    { label: "arquivado", value: "arquivado" },
  ],
});

export function IncludeForm({ onSubmit, formId, data }) {
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
      <Flex flexDir="column" gap="2">
        <HStack>
          <TextInput
            label="Nome *"
            {...register("nome")}
            error={errors.nome?.message}
          />

          <TextInput
            {...register("codigo")}
            label="Código *"
            error={errors.codigo?.message}
          />

          <TextInput
            {...register("contenType")}
            label="Content Type *"
            error={errors.contenType?.message}
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
        </HStack>

        <Box>
          <Text color="orange.600">Descrição *</Text>
          <Textarea {...register("descricao")} />
          {errors.descricao?.message && (
            <Text color="red.500" fontSize="sm">
              {errors.descricao?.message}
            </Text>
          )}
        </Box>
        <Box>
          <Text color="orange.600">Conteúdo *</Text>
          <Textarea {...register("conteudo")} />
          {errors.conteudo?.message && (
            <Text color="red.500" fontSize="sm">
              {errors.conteudo?.message}
            </Text>
          )}
        </Box>
      </Flex>
    </form>
  );
}
