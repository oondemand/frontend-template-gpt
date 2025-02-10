import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { FilePenLine, Trash2, CopyPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";
import { UserService } from "../../services/users";
import { useConfirmation } from "../../hooks/confirmationModal";
import { InviteUserModal } from "./dialog";

export function ListUsers() {
  const { requestConfirmation } = useConfirmation();

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-users"],
    queryFn: UserService.listUsers,
  });

  const { mutateAsync: deleteUserMutation } = useMutation({
    mutationFn: UserService.deleteUserById,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-users"],
      });
    },
  });

  const onDelete = async (id) => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja deletar usuário?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (response.action === "confirmed") {
      try {
        const response = await deleteUserMutation({ id });
        if (response.status === 200) {
          toast.success("Usuário deletada com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao deletar usuário!");
      }
    }
  };

  return (
    <>
      <Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize="2xl" color="orange.500">
            Usuários
          </Heading>
          <InviteUserModal />
        </Flex>

        <Box mt="8" maxH="800px" overflow="auto">
          {isLoading && <Text>Listando usuários...</Text>}
          {!isLoading && error && <Text>Ouve um erro ao listar usuários!</Text>}
          {!isLoading && !error && users.length == 0 && (
            <Text>Não foram encontradas usuários</Text>
          )}
          {!isLoading && users && users.length > 0 && (
            <Table.Root variant="line" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                  <Table.ColumnHeader>Id</Table.ColumnHeader>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell>{user.nome}</Table.Cell>
                    <Table.Cell>{user._id}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.status}</Table.Cell>
                    <Table.Cell placeItems="end">
                      <Flex gap="4">
                        <IconButton
                          onClick={() => {
                            onDelete(user._id);
                          }}
                          colorPalette="red"
                          size="xs"
                        >
                          <Trash2 />
                        </IconButton>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Box>
      </Box>
    </>
  );
}
