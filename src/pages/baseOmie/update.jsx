import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { BaseOmiesForm } from "./form";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../config/react-query";
import { BaseOmieService } from "../../services/baseOmie";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function UpdateBaseOmies() {
  const { id } = useParams();

  const {
    data: baseOmie,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["base-omie", { id }],
    queryFn: async () => await BaseOmieService.getBaseOmie({ id }),
  });

  const { mutateAsync: updateBaseOmieMutation } = useMutation({
    mutationFn: BaseOmieService.updateBaseOmie,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-base-omies"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateBaseOmieMutation({
        id,
        body: {
          ...data,
          status: data.status[0],
        },
      });

      if (response.status === 200) {
        toast.success("Base omie atualizada com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao atualizar base omie!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Detalhes base omie
        </Heading>
        <Button type="submit" form="update-base-omie-form" colorPalette="cyan">
          Atualizar
        </Button>
      </Flex>
      {baseOmie && !isLoading && (
        <BaseOmiesForm
          data={baseOmie}
          onSubmit={onSubmit}
          formId="update-base-omie-form"
        />
      )}
    </Box>
  );
}
