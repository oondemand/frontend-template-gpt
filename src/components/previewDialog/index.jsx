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

import { useForm, Controller, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Flex,
  Box,
  Text,
  Spinner,
  Separator,
  Heading,
  Input,
} from "@chakra-ui/react";

import { toast } from "sonner";

import { FaturaService } from "../../services/fatura";
import { IntegrationGptService } from "../../services/integration-gpt";
import { useEffect, useState } from "react";
import { Kanban, Save } from "lucide-react";

import { TemplateService } from "../../services/template";
import { queryClient } from "../../config/react-query";
import { PromptService } from "../../services/prompt";
import { SelectAssistant } from "../selectAssistant";
import { useConfirmation } from "../../hooks/confirmationModal";
import { TextCard } from "./card";

import { AutoScroll } from "../autoScroll";

import { saveAs } from "file-saver";
import { useAuth } from "../../hooks/auth";
import { Editor } from "./editor";

import { validation } from "./validation";

export function PreviewDialog({
  templateId,
  isOpen,
  templateEjs,
  omieVar,
  onClose,
}) {
  const { user } = useAuth();
  const [iaChat, setIaChat] = useState([]);
  const [actionType, setActionType] = useState();
  const { requestConfirmation } = useConfirmation();
  const [codeVersion, setCodeVersion] = useState([templateEjs]);

  const submitTypeSchema = {
    CHAT: validation.chatSchema,
    PREVIEW: validation.previewSchema,
    DOWNLOAD_PDF: validation.previewSchema,
    SAVE: validation.saveSchema,
    IMPORT_VARS: validation.importOsSchema,
    ENVIAR_FATURA: validation.enviarFaturaSchema,
  };

  const methods = useForm({
    resolver: zodResolver(submitTypeSchema[actionType]),
    values: {
      templateEjs,
      omieVar,
      emailList: user?.email || "",
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset: formReset,
  } = methods;

  const {
    mutateAsync: generatePreviewMutation,
    data,
    isLoading,
    error: previewError,
    reset: resetPreview,
  } = useMutation({
    mutationFn: FaturaService.generatePreview,
  });

  const {
    mutateAsync: downloadPdfMutation,
    isLoading: isLoadingDownloadPdfMutation,
  } = useMutation({
    mutationFn: FaturaService.downloadPdf,
  });

  const {
    mutateAsync: enviarFaturaMutations,
    isLoading: isLoadingEnviarFaturaMutations,
  } = useMutation({
    mutationFn: FaturaService.enviarFatura,
  });

  const {
    mutateAsync: questionIaMutation,
    isLoading: isQuestionIaMutationLoading,
  } = useMutation({
    mutationFn: IntegrationGptService.askQuestion,
  });

  const { mutateAsync: updateTemplateMutation } = useMutation({
    mutationFn: TemplateService.updateTemplate,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-templates"],
      });
    },
  });

  const { mutateAsync: getOmieVarsMutation, isLoading: omieVarsIsLoading } =
    useMutation({
      mutationFn: FaturaService.getOmieVars,
    });

  const onImportOmieVariables = async (values) => {
    try {
      const { data } = await getOmieVarsMutation({
        body: {
          baseOmie: values.baseOmie[0],
          numero: values.numero,
          gatilho: values.gatilho[0],
        },
      });

      if (data) {
        setValue("omieVar", JSON.stringify(data, null, 2));
        toast.success("Importação feita com sucesso!", {
          description: "Valores atualizados atualizado!",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Ouve um erro ao importar variáveis Omie!", {
        description: error?.response?.data?.message,
      });
    }
  };

  const onSaveSubmit = async (values) => {
    console.log("VAL", values);

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
      console.log(error);
      toast.error("Ouve um erro ao gerar preview!");
    }
  };

  const onDownloadPdfSubmit = async (values) => {
    try {
      const response = await downloadPdfMutation({
        body: {
          content: values.templateEjs,
          omieVar: values.omieVar,
          baseOmie: values.baseOmie[0],
        },
      });

      const blob = new Blob([new Uint8Array(response.data)], {
        type: "application/pdf",
      });

      saveAs(blob, "fatura.pdf");
    } catch (error) {
      console.log(error);
      console.log(error);
      toast.error("Ouve um erro ao baixar pdf!");
    }
  };

  const updateChatIa = ({ type, text, details = null }) => {
    if (iaChat.length > 15) {
      return setIaChat((prev) => {
        const prevChat = [...prev];
        prevChat.shift();
        return [...prevChat, { type, text, details }];
      });
    }

    setIaChat((prev) => [...prev, { type, text, details }]);
  };

  const onChatSubmit = async (values) => {
    try {
      const prompts = await PromptService.listPrompt({
        id: values.assistente[0],
      });

      if (!prompts) {
        return toast.error(
          "Não foi possível recuperar configurações de prompts!",
          {
            description: "Tente novamente mais tarde",
          }
        );
      }

      const modelo = queryClient
        .getQueryData(["list-assistants"])
        .find((e) => e._id === values.assistente[0])?.modelo;

      const response = await questionIaMutation({
        body: {
          ...values,
          templateEjs: values.templateEjs,
          prompts,
          modelo,
        },
      });

      if (values.question) {
        updateChatIa({ type: "user", text: values.question });
      }

      const regex = /```([\s\S]*?)```/;
      const match = response.data.data.response.match(regex);

      if (match && match[1]) {
        const lines = match[1].split("\n");
        lines.shift();

        const code = lines.join("\n").trim();

        setCodeVersion((prev) => [...prev, code]);
        setValue("templateEjs", code);
      }

      const text = response.data.data.response.replace(regex, "");

      updateChatIa({ type: "bot", text, details: response.data.data });

      if (response.status === 200) {
        toast.success("Tudo certo!");
        setValue("question", "");
      }
    } catch (error) {
      console.log(error);
      toast.error("Ouve um erro na conexão com openIa");
    }
  };

  const onEnviarFaturaSubmit = async (values) => {
    try {
      const response = await enviarFaturaMutations({
        body: {
          ...values,
          baseOmie: values.baseOmie[0],
          gatilho: values.gatilho[0],
        },
      });

      toast.success("Tudo certo emails sendo enviados!");
      setValue("emailList", "");
    } catch (error) {
      console.log(error);
      toast.error("Ouve um erro ao enviar emails");
    }
  };

  const submitTypeMap = {
    CHAT: onChatSubmit,
    PREVIEW: onPreviewSubmit,
    SAVE: onSaveSubmit,
    DOWNLOAD_PDF: onDownloadPdfSubmit,
    IMPORT_VARS: onImportOmieVariables,
    ENVIAR_FATURA: onEnviarFaturaSubmit,
  };

  const onSubmit = async (values) => {
    await submitTypeMap[actionType](values);
  };

  useEffect(() => {
    setCodeVersion([templateEjs]);
  }, [templateEjs]);

  return (
    <DialogRoot placement="center" size="full" open={isOpen}>
      <DialogContent position="relative" h="full">
        <FormProvider {...methods}>
          <DialogBody p="2" h="full" asChild>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex h="full">
                {/* <Flex
                  alignItems="center"
                  position="absolute"
                  top="2"
                  left="2"
                  gap="2"
                >
                  <Box>
                    <Controller
                      control={control}
                      name="assistente"
                      render={({ field }) => (
                        <SelectAssistant
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => {
                            field.onChange(value);
                          }}
                          onInteractOutside={() => field.onBlur()}
                          w="2xs"
                          size="xs"
                        />
                      )}
                    />
                    {errors?.assistente && (
                      <Text ml="1" fontSize="xs" color="red.500">
                        Selecione assistente
                      </Text>
                    )}
                  </Box>
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

                    {iaChat.length > 0 && (
                      <AutoScroll messages={iaChat}>
                        {iaChat.map((chat, i) => (
                          <TextCard
                            key={`${chat.text}-${i}`}
                            text={chat.text}
                            type={chat.type}
                            details={chat?.details}
                          />
                        ))}
                      </AutoScroll>
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
                          onFileAccept={(e) => {
                            console.log("LOG", e.files);
                            field.onChange(e.files);
                          }}
                          maxW="full"
                          alignItems="stretch"
                          maxFiles={10}
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

                <Separator orientation="vertical" /> */}

                <Editor
                  setActionType={setActionType}
                  codeVersion={codeVersion}
                  data={data}
                  previewError={previewError}
                />
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
                  disabled={isSubmitting}
                  type="submit"
                  onClick={() => setActionType("SAVE")}
                  variant="surface"
                  size="sm"
                  colorPalette="black"
                >
                  <Save />
                </Button>
                <DialogCloseTrigger
                  position="static"
                  bg="orange.500"
                  color="white"
                  fontWeight="600"
                  onClick={async (e) => {
                    e.preventDefault();
                    const { action } = await requestConfirmation({
                      title: "Tem certeza que deseja sair?",
                      description: "Suas alterações podem ser perdidas.",
                    });

                    if (action === "confirmed") {
                      onClose();
                      formReset();
                      setIaChat([]);
                      setCodeVersion([]);
                      resetPreview();
                    }
                  }}
                />
              </Flex>
            </form>
          </DialogBody>
        </FormProvider>
      </DialogContent>
    </DialogRoot>
  );
}
