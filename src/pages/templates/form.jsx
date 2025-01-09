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
import { PreviewDialog } from "./previewDialog";

const schema = z.object({
  nome: z.string().nonempty("Nome obrigatório!"),
  codigo: z.string().nonempty("Código obrigatório!"),
  descricao: z.string().nonempty("Descrição obrigatória!"),
  templateEjs: z.string().nonempty("Conteúdo obrigatório!"),
  status: z.string().nonempty("Status obrigatório!").array(),
  variables: z.string().refine(
    (value) => {
      try {
        JSON.parse(value);
        return true;
      } catch (error) {
        return false;
      }
    },
    { message: "String não é um JSON válido" }
  ),
});

const statusOptions = createListCollection({
  items: [
    { label: "ativo", value: "ativo" },
    { label: "inativo", value: "inativo" },
    { label: "arquivado", value: "arquivado" },
  ],
});

export function TemplateForm({ onSubmit, formId, data, dialogId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      status: data?.status ? [data.status] : ["ativo"],
    },
  });

  const fieldValues = watch();

  console.log(fieldValues);

  return (
    <>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir="column" gap="2">
          <HStack>
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
            <Textarea h="60" {...register("templateEjs")} />
            {errors.templateEjs?.message && (
              <Text color="red.500" fontSize="sm">
                {errors.templateEjs?.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text color="orange.600">Json Schema *</Text>
            <Textarea fontSize="sm" h="56" {...register("variables")} />
            {errors.variables?.message && (
              <Text color="red.500" fontSize="sm">
                {errors.variables?.message}
              </Text>
            )}
          </Box>
        </Flex>
      </form>
      <PreviewDialog
        content={fieldValues.templateEjs}
        jsonSchema={fieldValues.variables}
      />
    </>
  );
}
