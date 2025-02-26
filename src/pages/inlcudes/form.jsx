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
  Image,
} from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";

import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
  FileInput,
  FileUploadClearTrigger,
} from "../../components/ui/file-upload";

import { InputGroup } from "../../components/ui/input-group";
import { CloseButton } from "../../components/ui/close-button";

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
  conteudo: z
    .string({ message: "Conteúdo obrigatório!" })
    .nonempty("Conteúdo obrigatório!"),
  contenType: z.string().nonempty("Content Type obrigatório!"),
  status: z.string().nonempty("Status obrigatório!").array(),
});

import { TextInput } from "../../components/input/textInput";
import { useState } from "react";

import { FileUpIcon } from "lucide-react";

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
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      status: data?.status ? [data.status] : ["ativo"],
    },
  });

  const [preview, setPreview] = useState(data?.conteudo);

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="2">
        <HStack>
          <TextInput
            {...register("codigo")}
            label="Código *"
            error={errors.codigo?.message}
          />

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <SelectRoot
                w="sm"
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
          <Text color="orange.600">Descrição</Text>
          <Textarea minH="32" {...register("descricao")} />
          {errors.descricao?.message && (
            <Text color="red.500" fontSize="sm">
              {errors.descricao?.message}
            </Text>
          )}
        </Box>

        <Box
          border="2px dashed"
          rounded="sm"
          borderColor="gray.200"
          py="4"
          px="2"
        >
          <Flex alignItems="center" gap="2">
            <Text px="2" fontSize="md" color="orange.500">
              Conteúdo:
            </Text>

            <Box>
              <Controller
                name="conteudo"
                control={control}
                render={({ field }) => (
                  <FileUploadRoot
                    accept="image/*"
                    maxW="xs"
                    alignItems="stretch"
                    maxFiles={1}
                    onFileChange={({ acceptedFiles, rejectedFiles }) => {
                      if (acceptedFiles.length == 0) {
                        setPreview(data?.conteudo ?? null);
                      }

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64Arr = reader.result.split(",");

                        const pureBase64 = base64Arr[1];
                        const contentType = base64Arr[0]
                          .split(";")[0]
                          .split(":")[1];

                        field.onChange(pureBase64);
                        setValue("contenType", contentType);
                        setPreview(pureBase64);
                      };

                      reader.readAsDataURL(acceptedFiles[0]);
                    }}
                  >
                    <InputGroup
                      w="full"
                      startElement={<FileUpIcon size={14} />}
                      endElement={
                        <FileUploadClearTrigger asChild>
                          <CloseButton
                            me="-1"
                            size="xs"
                            variant="plain"
                            focusVisibleRing="inside"
                            focusRingWidth="2px"
                            pointerEvents="auto"
                            color="fg.subtle"
                          />
                        </FileUploadClearTrigger>
                      }
                    >
                      <FileInput
                        truncate
                        size="sm"
                        placeholder="Selecionar arquivo"
                      />
                    </InputGroup>
                  </FileUploadRoot>
                )}
              />

              {errors.conteudo?.message && (
                <Text m="0.5" color="red.500" fontSize="xs">
                  {errors.conteudo?.message}
                </Text>
              )}
            </Box>
          </Flex>
          {preview && (
            <Image
              mt="2"
              pointerEvents="none"
              fit="contain"
              src={`data:image/;base64,${preview}`}
              alt="Imagem em Base64"
            />
          )}
        </Box>
      </Flex>
    </form>
  );
}
