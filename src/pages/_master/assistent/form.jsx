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
  Select,
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
  descricao: z.string().optional(),
  modelo: z.string(),
});

const modelsOptions = createListCollection({
  items: [
    { label: "GPT-4.1", value: "gpt-4.1" },
    { label: "GPT-4.1 mine", value: "gpt-4.1-mini" },
    { label: "GPT-4O", value: "gpt-4o" },
    { label: "GPT-4O mine", value: "gpt-4o-mini" },
    { label: "GPT-4", value: "gpt-4" },
    { label: "GPT-3.5 turbo", value: "gpt-3.5-turbo" },
    { label: "O3 mine", value: "o3-mini" },
    { label: "O1 pro", value: "o1-pro" },
    { label: "O1", value: "o1" },
    { label: "O1 mine", value: "o1-mine" },
  ],
});

import { TextInput } from "../../../components/input/textInput";

export function AssistantForm({ onSubmit, formId, data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
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

          <Controller
            control={control}
            name="modelo"
            render={({ field }) => (
              <SelectRoot
                name={field.name}
                value={[field.value]}
                onValueChange={({ value }) => field.onChange(value[0])}
                onInteractOutside={() => field.onBlur()}
                collection={modelsOptions}
                w="sm"
              >
                <SelectLabel fontSize="md" color="orange.500">
                  Modelo
                </SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder={field.value} />
                </SelectTrigger>
                <SelectContent zIndex={9999}>
                  {modelsOptions.items.map((status) => (
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
      </Flex>
    </form>
  );
}
