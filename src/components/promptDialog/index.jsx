import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogActionTrigger,
} from "../ui/dialog";

import { Button, Box } from "@chakra-ui/react";
import { PromptForm } from "../../pages/_master/assistent/prompt/form";
import { PromptService } from "../../services/prompt";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

export function PromptDialog({ isVisible, onClose, data: dialogData, type }) {
  const { mutateAsync: createPromptMutation } = useMutation({
    mutationFn: PromptService.createPrompt,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-prompts"],
      });
    },
  });

  const onCreatePrompt = async (data) => {
    try {
      const response = await createPromptMutation({
        ...data,
        tipo: data.tipo[0],
        assistente: dialogData.assistente,
      });
      if (response) {
        toast.success("Prompt criado com sucesso!");
      }
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar prompt!");
    }
  };

  const { mutateAsync: updatePromptMutation } = useMutation({
    mutationFn: PromptService.updatePrompt,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-prompts"],
      });
    },
  });

  const onUpdatePrompt = async (data) => {
    try {
      const response = await updatePromptMutation({
        id: dialogData._id,
        body: {
          ...data,
          tipo: data.tipo[0],
          tipoConteudo: data.tipoConteudo[0],
        },
      });
      onClose();
      if (response) {
        toast.success("Prompt atualizado com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar prompt!");
    }
  };

  return (
    <DialogRoot
      lazyMount
      open={isVisible}
      onOpenChange={(e) => onClose(e.open)}
      size="xl"
      placement="center"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle color="orange.500">Criar prompt</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            <PromptForm
              data={dialogData}
              formId={"create-prompt-form"}
              onSubmit={
                type === "create" || type === "clone"
                  ? onCreatePrompt
                  : onUpdatePrompt
              }
            />
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogActionTrigger>

          <Button
            type="submit"
            form="create-prompt-form"
            variant="surface"
            colorPalette="blue"
          >
            Salvar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
