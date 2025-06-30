import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { IncludeForm } from "./form";
import { IncludeService } from "../../services/include";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { toast } from "sonner";

import { useParams } from "react-router-dom";
import { BackButton } from "../../components/ui/back-button";

export function CloneInclude() {
  const { id } = useParams();
  const {
    data: include,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["include", { id }],
    queryFn: async () => await IncludeService.getInclude({ id }),
  });

  const { mutateAsync: cloneIncludeMutation } = useMutation({
    mutationFn: IncludeService.createInclude,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-includes"],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await cloneIncludeMutation({
        ...data,
        status: data.status[0],
      });
      if (response) {
        toast.success("Include criada com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar include!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Clonar include
        </Heading>
        <Flex alignItems="center" gap="2">
          <BackButton />
          <Button type="submit" form="clone-include-form" colorPalette="cyan">
            Salvar
          </Button>
        </Flex>
      </Flex>
      {!isLoading && include && (
        <IncludeForm
          data={include}
          onSubmit={onSubmit}
          formId="clone-include-form"
        />
      )}
    </Box>
  );
}
