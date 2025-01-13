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
} from "../../../components/ui/select";

import { useForm, Controller } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nome: z.string().nonempty("Nome obrigatório!"),
  codigo: z.string().nonempty("Código obrigatório!"),
  descricao: z.string().nonempty("Descrição obrigatória!"),
  conteudo: z.string().nonempty("Conteúdo obrigatório!"),
  tipo: z.enum(["assistant", "function", "system", "tool", "user"]).array(),
});

import { TextInput } from "../../../components/input/textInput";

const options = createListCollection({
  items: [
    { label: "Assistente", value: "assistant" },
    { label: "Função", value: "function" },
    { label: "Sistema", value: "system" },
    { label: "Ferramenta", value: "tool" },
    { label: "Usuário", value: "user" },
  ],
});

export function PromptForm({ onSubmit, formId, data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      tipo: data?.tipo ? [data.tipo] : ["user"],
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

          <Controller
            control={control}
            name="tipo"
            render={({ field }) => (
              <SelectRoot
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={options}
                w="sm"
              >
                <SelectLabel fontSize="md" color="orange.500">
                  Tipo
                </SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder={field.value} />
                </SelectTrigger>
                <SelectContent>
                  {options.items.map((status) => (
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
          <Textarea h="28" {...register("descricao")} />
          {errors.descricao?.message && (
            <Text color="red.500" fontSize="sm">
              {errors.descricao?.message}
            </Text>
          )}
        </Box>
        <Box>
          <Text color="orange.600">Conteúdo *</Text>
          <Textarea h="44" {...register("conteudo")} />
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
