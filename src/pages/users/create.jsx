import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";

import { IaChat } from "../../components/iaChat";
import { UsersForm } from "./form";

import { UserService } from "../../services/users";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../config/react-query";

export function CreateUsers() {
  const { mutateAsync: createUsersMutation } = useMutation({
    mutationFn: UserService.createUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-users"]],
      });
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await createUsersMutation({
        body: { ...data, status: data.status[0] },
      });

      if (response.status === 201) {
        toast.success("Usuário criada com sucesso!");
      }
    } catch (error) {
      toast.error("Ouve um erro ao criar usuário!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Criar usuário
        </Heading>
        <Button type="submit" form="create-user-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      <UsersForm onSubmit={onSubmit} formId="create-user-form" />
    </Box>
  );
}
