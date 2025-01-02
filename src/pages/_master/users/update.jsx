import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { UsersForm } from "./form";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { queryClient } from "../../../config/react-query";
import { UserService } from "../../../services/users";

export function UpdateUsers() {
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

  const { mutateAsync: updateUsersMutation } = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-users"]],
      });
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await updateUsersMutation({
        id,
        body: { ...data, status: data.status[0] },
      });

      if (response.status === 200) {
        toast.success("Usuário atualizado com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao atualizar usuário!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Detalhes do usuário
        </Heading>
        <Button type="submit" form="update-user-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      {user && !isLoading && (
        <UsersForm data={user} onSubmit={onSubmit} formId="update-user-form" />
      )}
    </Box>
  );
}
