import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
} from "../../components/ui/dialog";

import {
  FileUploadRoot,
  FileUploadDropzone,
  FileUploadList,
} from "../../components/ui/file-upload";

import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Flex,
  Box,
  Textarea,
  Text,
  Spinner,
  Separator,
  Collapsible,
  Heading,
  Input,
} from "@chakra-ui/react";

import { toast } from "sonner";

import { SelectBaseOmie } from "../../components/selectBaseOmie";
import { z } from "zod";
import { FaturaService } from "../../services/fatura";
import { ExternalIframe } from "../iframe";
import { IntegrationGptService } from "../../services/integration-gpt";
import { useState } from "react";
import Markdown from "react-markdown";
import { Save } from "lucide-react";

import { Prose } from "../../components/ui/prose";

import { TemplateService } from "../../services/template";
import { queryClient } from "../../config/react-query";

const previewSchema = z.object({
  baseOmie: z.string().min(1, "Base omie é obrigatória").array(),
  templateEjs: z.string().min(1, "templateEjs é obrigatório."),
  omieVar: z.string(),
});

const chatSchema = z.object({
  baseOmie: z.string().min(1, "Base omie é obrigatória").array(),
  question: z.string().min(1, "Escreva sua pergunta."),
  file: z.any(),
  templateEjs: z.string().min(1, "templateEjs é obrigatório."),
  omieVar: z.string(),
  systemVar: z.string(),
});

const saveSchema = z.object({
  templateEjs: z.string().min(1, "templateEjs é obrigatório."),
});

export function PreviewDialog({
  templateId,
  isOpen,
  templateEjs,
  omieVar,
  onClose,
}) {
  const [iaResponse, setIaResponse] = useState();
  const [actionType, setActionType] = useState();

  const submitTypeSchema = {
    CHAT: chatSchema,
    PREVIEW: previewSchema,
    SAVE: saveSchema,
  };

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
    reset: formReset,
  } = useForm({
    resolver: zodResolver(submitTypeSchema[actionType]),
    values: {
      templateEjs,
      omieVar,
    },
  });

  const {
    mutateAsync: generatePreviewMutation,
    data,
    reset,
    isLoading,
  } = useMutation({
    mutationFn: FaturaService.generatePreview,
  });

  const {
    mutateAsync: questionIaMutation,
    isLoading: isQuestionIaMutationLoading,
  } = useMutation({
    mutationFn: IntegrationGptService.askQuestion,
  });

  const {
    mutateAsync: getSystemVarsMutation,
    isLoading: getSystemVarsIsLoading,
  } = useMutation({
    mutationFn: FaturaService.getSystemVars,
  });

  const { mutateAsync: updateTemplateMutation } = useMutation({
    mutationFn: TemplateService.updateTemplate,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-templates"],
      });
    },
  });

  const onSaveSubmit = async (values) => {
    try {
      const response = await updateTemplateMutation({
        id: templateId,
        body: {
          ...values,
        },
      });
      if (response.status === 200) {
        toast.success("Template atualizado com sucesso!");
      }
    } catch (error) {
      console.log(error);

      toast.error("Erro ao atualizar template!");
    }
  };

  const handleBaseOmieChange = async (value) => {
    if (value.length === 0) return;
    try {
      const { data } = await getSystemVarsMutation({
        body: {
          baseOmie: value[0],
        },
      });

      if (data) {
        toast.success("Variáveis de ambiente atualizadas!");
        setValue("systemVar", JSON.stringify(data, null, 2));
      }
    } catch (error) {
      toast.error("Ouve um erro em buscar variáveis de sistema.");
    }
  };

  const onPreviewSubmit = async (values) => {
    try {
      const response = await generatePreviewMutation({
        body: {
          content: values.templateEjs,
          omieVar: values.omieVar,
          baseOmie: values.baseOmie[0],
        },
      });

      if (response.status === 200) {
        toast.success("Preview gerada com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao gerar preview!");
    }
  };

  const onChatSubmit = async (values) => {
    try {
      const response = await questionIaMutation({
        body: {
          ...values,
          templateEjs: values.templateEjs,
        },
      });

      const regex = /```ejs([\s\S]*?)```/;

      if (response.data.data.match(regex)[1]) {
        setValue("templateEjs", response.data.data.match(regex)[1].trim());
      }

      const text = response.data.data.replace(regex, "");
      setIaResponse(text);

      if (response.status === 200) {
        toast.success("Tudo certo!");
      }
    } catch (error) {
      toast.error("Ouve um erro na conexão com openIa");
    }
  };

  const submitTypeMap = {
    CHAT: onChatSubmit,
    PREVIEW: onPreviewSubmit,
    SAVE: onSaveSubmit,
  };

  const onSubmit = async (values) => {
    await submitTypeMap[actionType](values);
  };

  return (
    <DialogRoot
      placement="center"
      size="full"
      open={isOpen}
      onOpenChange={(e) => {
        formReset();
        onClose();
        reset();
      }}
    >
      <DialogContent position="relative" h="full">
        <DialogBody p="2" h="full" asChild>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex h="full">
              <Flex
                alignItems="center"
                position="absolute"
                top="2"
                left="2"
                gap="2"
              >
                <Box>
                  <Controller
                    control={control}
                    name="baseOmie"
                    render={({ field }) => (
                      <SelectBaseOmie
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          handleBaseOmieChange(value);
                          field.onChange(value);
                        }}
                        onInteractOutside={() => field.onBlur()}
                        w="xs"
                        size="xs"
                      />
                    )}
                  />
                  {errors?.baseOmie && (
                    <Text ml="1" fontSize="xs" color="red.500">
                      Selecione base omie
                    </Text>
                  )}
                </Box>
                {getSystemVarsIsLoading && <Spinner />}
              </Flex>

              <Flex
                flexDir="column"
                justifyContent="space-between"
                h="full"
                w="1/3"
                px="2"
              >
                <Box>
                  <Heading color="gray.400" my="12">
                    Chat ia
                  </Heading>

                  {iaResponse && (
                    <Flex
                      rounded="md"
                      px="2"
                      maxH="96"
                      gap="2"
                      border="1px dashed"
                      borderColor="gray.200"
                      overflow="auto"
                    >
                      <Prose fontSize="sm">
                        <Markdown>{iaResponse}</Markdown>
                      </Prose>
                    </Flex>
                  )}
                </Box>

                <Box>
                  <Flex alignItems="center" gap="2" mb="2">
                    <Input
                      {...register("question")}
                      size="xl"
                      placeholder="Faça uma pergunta"
                      resize="none"
                    />
                    <Button
                      disabled={isLoading || isQuestionIaMutationLoading}
                      type="submit"
                      variant="surface"
                      size="xl"
                      onClick={() => {
                        setActionType("CHAT");
                      }}
                    >
                      {!isQuestionIaMutationLoading && "Enviar"}
                      {isQuestionIaMutationLoading && <Spinner />}
                    </Button>
                  </Flex>
                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <FileUploadRoot
                        accept="image/*"
                        onFileAccept={(e) => {
                          field.onChange(e.files);
                        }}
                        maxW="full"
                        alignItems="stretch"
                        maxFiles={1}
                      >
                        <FileUploadList showSize clearable />
                        <FileUploadDropzone
                          label="Drag and drop here to upload"
                          description=".png, .jpg up to 5MB"
                        />
                      </FileUploadRoot>
                    )}
                  />
                </Box>
              </Flex>
              <Separator orientation="vertical" />

              <Flex ml="2" flex="1" h="full" flexDir="column" w="full">
                <Collapsible.Root mt="2">
                  <Flex gap="4" mb="3">
                    <Collapsible.Trigger cursor="pointer">
                      <Text fontSize="lg">Variáveis (Json)</Text>
                    </Collapsible.Trigger>
                  </Flex>
                  <Collapsible.Content display="flex" gap="4">
                    <Flex w="full" flexDir="column">
                      <Text>Variáveis omie</Text>
                      <Textarea fontSize="md" {...register("omieVar")} h="44" />
                    </Flex>
                    <Flex w="full" flexDir="column">
                      <Text>Variáveis do sistema</Text>
                      <Textarea
                        fontSize="md"
                        {...register("systemVar")}
                        h="44"
                      />
                    </Flex>
                  </Collapsible.Content>
                </Collapsible.Root>

                <Separator mt="2" variant="dashed" />

                <Collapsible.Root mt="2">
                  <Flex gap="4" mb="3">
                    <Collapsible.Trigger cursor="pointer">
                      <Text fontSize="lg">Conteúdo</Text>
                    </Collapsible.Trigger>
                  </Flex>
                  <Collapsible.Content>
                    <Textarea
                      fontSize="md"
                      {...register("templateEjs")}
                      h="80"
                    />
                  </Collapsible.Content>
                </Collapsible.Root>

                <Separator mt="2" variant="dashed" />

                <Flex alignItems="start" gap="2" my="2">
                  <Text py="1" px="2" fontSize="lg">
                    Preview
                  </Text>

                  <Button
                    disabled={isLoading || isQuestionIaMutationLoading}
                    w="24"
                    type="submit"
                    size="xs"
                    variant="surface"
                    onClick={() => {
                      setActionType("PREVIEW");
                    }}
                  >
                    {!isLoading && "Gerar preview"}
                    {isLoading && <Spinner />}
                  </Button>
                </Flex>
                {data && <ExternalIframe html={data.data} />}
              </Flex>
            </Flex>

            <Flex
              gap="2"
              alignItems="center"
              position="absolute"
              top="2"
              right="2"
              zIndex="10"
            >
              <Button
                type="submit"
                onClick={() => setActionType("SAVE")}
                variant="subtle"
                size="sm"
              >
                <Save />
                Salvar
              </Button>
              <DialogCloseTrigger
                position="static"
                bg="orange.500"
                color="white"
                fontWeight="600"
              />
            </Flex>
          </form>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
