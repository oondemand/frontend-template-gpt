import { IconButton } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "../../../config/react-query";
import { api } from "../../../config/axios";
import { useConfirmation } from "../../../hooks/confirmationModal";

export const DeleteTriggerAction = ({ id }) => {
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: deleteTriggerAction } = useMutation({
    mutationFn: async () => await api.delete(`gatilhos/${id}`),
    onSuccess() {
      queryClient.refetchQueries(["triggers"]);
      toast.success("Gatilho excluído com sucesso");
    },
    onError: (error) => {
      toast.error("Ouve um erro ao excluir gatilho");
    },
  });

  const handleDeleteTriggerAction = async () => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja excluir gatilho?",
      description: "Essa operação não pode ser desfeita.",
    });

    if (action === "confirmed") {
      await deleteTriggerAction();
    }
  };

  return (
    <IconButton
      variant="surface"
      colorPalette="red"
      size="2xs"
      onClick={handleDeleteTriggerAction}
    >
      <Trash />
    </IconButton>
  );
};
