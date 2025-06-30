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
} from "../../../../components/ui/select";

import { useForm, Controller } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  codigo: z
    .string()
    .nonempty("Código obrigatório!")
    .transform((valor) => valor.toLowerCase().trim())
    .refine((valor) => /^[a-z0-9\-_]+$/.test(valor), {
      message: "Somente letras, números, '-' e '_' são permitidos.",
    }),
  descricao: z.string().optional(),
  conteudo: z.string().optional(),
  tipo: z.enum(["assistant", "function", "system", "tool", "user"]).array(),
  tipoConteudo: z.enum(["texto", "arquivo", "objetoJson", "ejs"]).array(),
});

import { SelectCode } from "../../../../components/selectCode";
import { Search } from "lucide-react";
import { VariablesDialog } from "./dialog";

const options = createListCollection({
  items: [
    { label: "Assistente", value: "assistant" },
    { label: "Função", value: "function" },
    { label: "Sistema", value: "system" },
    { label: "Ferramenta", value: "tool" },
    { label: "Usuário", value: "user" },
  ],
});

const optionsConteudo = createListCollection({
  items: [
    { label: "Texto", value: "texto" },
    { label: "Arquivo", value: "arquivo" },
    { label: "Objeto JSON", value: "objetoJson" },
    { label: "EJS", value: "ejs" },
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
      tipoConteudo: data?.tipoConteudo ? [data.tipoConteudo] : ["user"],
    },
  });

  const defaultCodes = [
    "mensagem_de_contexto_inicializacao",
    "contexto_de_geracao",
    "contexto_variaveis_omie",
    "contexto_variaveis_template",
    "contexto_variaveis_sistema",
    "contexto_de_imagem",
    "contexto_de_chat",
  ];

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="2">
        <HStack flexWrap="wrap">
          <Box>
            <Controller
              control={control}
              name="codigo"
              render={({ field }) => (
                <SelectCode
                  w="sm"
                  name={field.name}
                  value={field.value}
                  onChange={({ value }) => {
                    field.onChange(value);
                  }}
                  data={defaultCodes}
                />
              )}
            />
            {errors?.codigo?.message && (
              <Text fontSize="sm" color="red.500">
                {errors.codigo.message}
              </Text>
            )}
          </Box>

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
                <SelectContent zIndex={9999}>
                  {options.items.map((status) => (
                    <SelectItem
                      cursor="pointer"
                      item={status}
                      key={status.value}
                    >
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          />
        </HStack>

        <Box>
          <Text color="orange.600">Descrição</Text>
          <Textarea h="28" {...register("descricao")} />
          {errors.descricao?.message && (
            <Text color="red.500" fontSize="sm">
              {errors.descricao?.message}
            </Text>
          )}
        </Box>

        <Controller
          control={control}
          name="tipoConteudo"
          render={({ field }) => (
            <SelectRoot
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              onInteractOutside={() => field.onBlur()}
              collection={optionsConteudo}
              w="sm"
            >
              <SelectLabel fontSize="md" color="orange.500">
                Tipo de conteúdo
              </SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder={field.value} />
              </SelectTrigger>
              <SelectContent zIndex={9999}>
                {optionsConteudo.items.map((status) => (
                  <SelectItem cursor="pointer" item={status} key={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
        />

        <Box>
          <Text color="orange.600">Conteúdo</Text>
          <Textarea h="44" {...register("conteudo")} />
          {errors.conteudo?.message && (
            <Text color="red.500" fontSize="sm">
              {errors.conteudo?.message}
            </Text>
          )}
        </Box>
        {/* <VariablesDialog /> */}
      </Flex>
    </form>
  );
}
