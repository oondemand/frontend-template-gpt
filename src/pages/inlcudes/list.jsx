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
import { IncludeService } from "../../services/include";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";
import { useConfirmation } from "../../hooks/confirmationModal";

export function ListIncludes() {
  const navigate = useNavigate();
  const { requestConfirmation } = useConfirmation();

  const {
    data: includes,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-includes"],
    queryFn: IncludeService.listIncludes,
  });

  const { mutateAsync: deleteIncludeMutation } = useMutation({
    mutationFn: IncludeService.deletarInclude,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-includes"],
      });
    },
  });

  const onDelete = async (id) => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja deletar include?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (response.action === "confirmed") {
      try {
        const response = await deleteIncludeMutation({ id });
        if (response.status === 200) {
          toast.success("Include deletada com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao deletar include!");
      }
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="2xl" color="orange.500">
          Includes
        </Heading>
        <Button
          onClick={() => navigate("/includes/create")}
          colorPalette="cyan"
        >
          Criar include
        </Button>
      </Flex>

      <Box mt="8" maxH="800px" overflow="auto">
        {isLoading && <Text>Listando includes...</Text>}
        {!isLoading && error && <Text>Ouve um erro ao listar includes!</Text>}
        {!isLoading && !error && includes.length == 0 && (
          <Text>Não foram encontradas includes</Text>
        )}
        {!isLoading && includes && includes.length > 0 && (
          <Table.Root variant="line" striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Código</Table.ColumnHeader>
                <Table.ColumnHeader>Descricao</Table.ColumnHeader>
                <Table.ColumnHeader>Content type</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {includes.map((include) => (
                <Table.Row key={include._id}>
                  <Table.Cell maxW="300px">
                    <Text truncate>{include?.codigo}</Text>
                  </Table.Cell>
                  <Table.Cell>{include.descricao}</Table.Cell>
                  <Table.Cell>{include.contenType}</Table.Cell>
                  <Table.Cell>{include.status}</Table.Cell>
                  <Table.Cell placeItems="end">
                    <Flex gap="4">
                      <IconButton
                        onClick={() => navigate(`/include/${include._id}`)}
                        colorPalette="cyan"
                        size="xs"
                      >
                        <FilePenLine />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          navigate(`/include/${include._id}/clone`)
                        }
                        colorPalette="green"
                        size="xs"
                      >
                        <CopyPlus />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          onDelete(include._id);
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
  );
}
