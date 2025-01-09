import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
} from "../../components/ui/dialog";

import {
  FileUploadRoot,
  FileInput,
  FileUploadDropzone,
  FileUploadList,
} from "../../components/ui/file-upload";

import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

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
import { useDialog } from "../../hooks/dialogContext";
import { z } from "zod";
import { FaturaService } from "../../services/fatura";
import { ExternalIframe } from "./iframe";
import { IntegrationGptService } from "../../services/integration-gpt";

const previewSchema = z.object({
  baseOmie: z.string().min(1, "Base omie é obrigatória").array(),
  content: z.string().min(1, "Content é obrigatório."),
});

const iaSchema = z.object({
  question: z.string().min(1, "Escreva sua pergunta."),
});

export function PreviewDialog({ content, jsonSchema, children }) {
  const { isDialogOpen, setIsDialogOpen } = useDialog();

  const previewForm = useForm({
    resolver: zodResolver(previewSchema),
    defaultValues: {
      content,
    },
  });

  const previewFormValues = previewForm.watch();

  const iaForm = useForm({
    resolver: zodResolver(iaSchema),
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
    data: questionIaData,
    isLoading: isQuestionIaMutationLoading,
  } = useMutation({
    mutationFn: IntegrationGptService.askQuestion,
  });

  const onPreviewSubmit = async (values) => {
    try {
      const response = await generatePreviewMutation({
        body: {
          content: values.content,
          variables: jsonSchema,
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

  const iaSubmit = async (values) => {
    try {
      const response = await questionIaMutation({
        body: {
          ...values,
          templateEjs: previewFormValues.content,
        },
      });

      const regex = /```ejs([\s\S]*?)```/;

      previewForm.setValue(
        "content",
        response.data.data.match(regex)[1].trim()
      );

      const text = response.data.data.replace(regex, "");

      console.log("Log da hora:", response, text);

      if (response.status === 200) {
        toast.success("Preview gerada com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao gerar preview!");
    }
  };

  return (
    <DialogRoot
      placement="center"
      size="full"
      open={isDialogOpen}
      onOpenChange={(e) => {
        previewForm.reset();
        setIsDialogOpen(e.open);
        reset();
      }}
    >
      <DialogContent position="relative" h="full">
        <DialogBody p="2" h="full">
          <Flex h="full">
            <Flex
              flexDir="column"
              justifyContent="space-between"
              h="full"
              w="1/3"
              px="2"
            >
              <Heading color="gray.400" mt="12">
                Chat ia
              </Heading>

              <form onSubmit={iaForm.handleSubmit(iaSubmit)}>
                <Flex alignItems="center" gap="2" mb="2">
                  <Input
                    {...iaForm.register("question")}
                    size="xl"
                    placeholder="Faça uma pergunta"
                    resize="none"
                  />
                  <Button type="submit" variant="surface" size="xl">
                    {!isQuestionIaMutationLoading && "Enviar"}
                    {isQuestionIaMutationLoading && <Spinner />}
                  </Button>
                </Flex>
                <FileUploadRoot maxW="full" alignItems="stretch" maxFiles={5}>
                  <FileUploadDropzone
                    label="Drag and drop here to upload"
                    description=".png, .jpg up to 5MB"
                  />
                </FileUploadRoot>
              </form>
            </Flex>
            <Separator orientation="vertical" />
            <form
              style={{ height: "100%", display: "flex", flexGrow: "1" }}
              onSubmit={previewForm.handleSubmit(onPreviewSubmit)}
            >
              <Box position="absolute" top="2" left="2">
                <Controller
                  control={previewForm.control}
                  name="baseOmie"
                  render={({ field }) => (
                    <SelectBaseOmie
                      name={field.name}
                      value={field.value}
                      onValueChange={({ value }) => field.onChange(value)}
                      onInteractOutside={() => field.onBlur()}
                      w="xs"
                      size="xs"
                    />
                  )}
                />
                {previewForm.formState.errors?.baseOmie && (
                  <Text ml="1" fontSize="xs" color="red.500">
                    Selecione base omie
                  </Text>
                )}
              </Box>
              <Flex ml="2" flex="1" h="full">
                <Flex flexDir="column" w="full">
                  <Collapsible.Root mt="2">
                    <Flex gap="4" mb="3">
                      <Collapsible.Trigger>
                        <Text fontSize="lg">Conteúdo</Text>
                      </Collapsible.Trigger>
                      <Button variant="surface" size="xs">
                        Salvar alterações
                      </Button>
                    </Flex>
                    <Collapsible.Content>
                      <Textarea {...previewForm.register("content")} h="80" />
                    </Collapsible.Content>
                  </Collapsible.Root>

                  <Separator mt="2" variant="dashed" />

                  <Flex alignItems="start" gap="2" my="2">
                    <Text py="1" px="2" fontSize="lg">
                      Preview
                    </Text>

                    <Button w="24" type="submit" size="xs" variant="surface">
                      {!isLoading && "Gerar preview"}
                      {isLoading && <Spinner />}
                    </Button>
                  </Flex>
                  {data && <ExternalIframe html={data.data} />}
                </Flex>
              </Flex>
            </form>
          </Flex>
        </DialogBody>

        <DialogCloseTrigger
          zIndex="10"
          bg="orange.500"
          color="white"
          fontWeight="600"
        />
      </DialogContent>
    </DialogRoot>
  );
}
