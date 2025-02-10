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

export function CloneBaseOmies() {
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

  const { mutateAsync: cloneBaseOmieMutation } = useMutation({
    mutationFn: BaseOmieService.createBaseOmie,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-base-omies"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await cloneBaseOmieMutation({
        body: {
          ...data,
          status: data.status[0],
        },
      });

      if (response.status === 201) {
        toast.success("Base omie criada com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao criar base omie!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Clonar base omie
        </Heading>
        <Button type="submit" form="clone-base-omie-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      {baseOmie && !isLoading && (
        <BaseOmiesForm
          data={baseOmie}
          onSubmit={onSubmit}
          formId="clone-base-omie-form"
        />
      )}
    </Box>
  );
}
