import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { IncludeForm } from "./form";
import { IncludeService } from "../../services/include";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { toast } from "sonner";
import { BackButton } from "../../components/ui/back-button";

export function CreateInclude() {
  const { mutateAsync: createIncludeMutation } = useMutation({
    mutationFn: IncludeService.createInclude,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-includes"],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createIncludeMutation({
        ...data,
        status: data.status[0],
      });
      if (response.status === 201) {
        toast.success("Include criada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao criar include!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Criar include
        </Heading>
        <Flex alignItems="center" gap="2">
          <BackButton />
          <Button type="submit" form="create-include-form" colorPalette="cyan">
            Salvar
          </Button>
        </Flex>
      </Flex>
      <IncludeForm onSubmit={onSubmit} formId="create-include-form" />
    </Box>
  );
}
