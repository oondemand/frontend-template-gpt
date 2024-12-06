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

import * as Yup from "yup";

const schema = Yup.object({
  nome: Yup.string().required("Nome obrigatório!"),
  codigo: Yup.string().required("Código obrigatório!"),
  descricao: Yup.string().required("Descrição obrigatória!"),
  conteudo: Yup.string().required("Conteúdo obrigatório!"),
  contentType: Yup.string().required("Content Type obrigatório!"),
  status: Yup.string().required("Status obrigatório!"),
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
  const formik = useFormik({
    initialValues: {
      nome: data?.nome || "",
      codigo: data?.codigo || "",
      descricao: data?.descricao || "",
      conteudo: data?.conteudo || "",
      contentType: data?.contentType || "",
      status: data?.status || "ativo",
    },
    onSubmit: onSubmit,
    validateOnChange: false,
    validationSchema: schema,
  });

  return (
    <form
      id={formId}
      onSubmit={(value) => {
        formik.handleSubmit(value);
        !data && formik.handleReset();
      }}
      onReset={formik.handleReset}
    >
      <Flex flexDir="column" gap="2">
        <HStack>
          <TextInput
            name="nome"
            label="Nome *"
            onChange={formik.handleChange}
            error={formik.errors.nome}
            value={formik.values.nome}
          />

          <TextInput
            name="codigo"
            label="Código *"
            onChange={formik.handleChange}
            error={formik.errors.codigo}
            value={formik.values.codigo}
          />

          <TextInput
            name="contentType"
            label="Content Type *"
            onChange={formik.handleChange}
            error={formik.errors.contentType}
            value={formik.values.contentType}
          />

          <SelectRoot
            onValueChange={({ items, value }) =>
              formik.setFieldValue("status", value[0])
            }
            collection={statusOptions}
          >
            <SelectLabel fontSize="md" color="orange.500">
              Status
            </SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder={formik.values.status} />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.items.map((status) => (
                <SelectItem item={status} key={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </HStack>

        <Box>
          <Text color="orange.600">Descrição *</Text>
          <Textarea
            name="descricao"
            onChange={formik.handleChange}
            value={formik.values.descricao}
          />
          {formik.errors.descricao && (
            <Text color="red.500" fontSize="sm">
              {formik.errors.descricao}
            </Text>
          )}
        </Box>
        <Box>
          <Text color="orange.600">Conteúdo *</Text>
          <Textarea
            name="conteudo"
            onChange={formik.handleChange}
            value={formik.values.conteudo}
          />
          {formik.errors.conteudo && (
            <Text color="red.500" fontSize="sm">
              {formik.errors.conteudo}
            </Text>
          )}
        </Box>
      </Flex>
    </form>
  );
}
