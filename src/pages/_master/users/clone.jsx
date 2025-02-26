import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { UsersForm } from "./form";

import { UserService } from "../../../services/users";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../../config/react-query";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { BackButton } from "../../../components/ui/back-button";

export function CloneUsers() {
  const { id } = useParams();
  const {
    data: user,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user", { id }],
    queryFn: async () => await UserService.getUser({ id }),
  });

  const { mutateAsync: cloneUsersMutation } = useMutation({
    mutationFn: UserService.createUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-users"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await cloneUsersMutation({
        body: { ...data, status: data.status[0], tipo: data.tipo[0] },
      });

      if (response.status === 201) {
        toast.success("Usuário criado com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao criar usuário!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Clonar usuário
        </Heading>
        <Flex alignItems="center" gap="2">
          <BackButton />
          <Button type="submit" form="clone-user-form" colorPalette="cyan">
            Salvar
          </Button>
        </Flex>
      </Flex>
      {user && !isLoading && (
        <UsersForm data={user} onSubmit={onSubmit} formId="clone-user-form" />
      )}
    </Box>
  );
}
