import {
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
import { ImportOmieVariables } from "./importOmieVariables";

const schema = z.object({
  nome: z.string().nonempty("Nome obrigatório!"),
  codigo: z.string().nonempty("Código obrigatório!"),
  descricao: z.string().nonempty("Descrição obrigatória!"),
  templateEjs: z.string().nonempty("Conteúdo obrigatório!"),
  status: z.string().nonempty("Status obrigatório!").array(),
  omieVar: z.string().refine(
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
      omieVar: data.variables,
    },
  });

  const fieldValues = watch();

  const onImportOmieVariables = ({ baseOmie, os }) => {
    console.log(baseOmie, os);
  };

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
            <Flex alignItems="center" gap="4" mb="2">
              <Text color="orange.600">Variáveis OMIE (JSON)</Text>
              <ImportOmieVariables
                onImportOmieVariables={onImportOmieVariables}
                // isLoading
              />
            </Flex>
            <Textarea fontSize="sm" h="56" {...register("omieVar")} />
            {errors.omieVar?.message && (
              <Text color="red.500" fontSize="sm">
                {errors.omieVar?.message}
              </Text>
            )}
          </Box>
        </Flex>
      </form>
      <PreviewDialog
        content={fieldValues.templateEjs}
        omieVar={fieldValues.omieVar}
      />
    </>
  );
}
