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
import { queryClient } from "../../../config/react-query";
import { TenantService } from "../../../services/tenant";
import { useConfirmation } from "../../../hooks/confirmationModal";
import { BackButton } from "../../../components/ui/back-button";


export function ListTenants() {
  const navigate = useNavigate();
  const { requestConfirmation } = useConfirmation();

  const {
    data: tenants,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-tenants"],
    queryFn: TenantService.listTenants,
  });

  const { mutateAsync: deleteTenantMutation } = useMutation({
    mutationFn: TenantService.deleteTenantById,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-tenants"],
      });
    },
  });

  const onDelete = async (id) => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja deletar tenant?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (response.action === "confirmed") {
      try {
        const response = await deleteTenantMutation({ id });
        if (response.status === 200) {
          toast.success("Tenant deletada com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao deletar tenant!");
      }
    }
  };

  return (
    <>
      <Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize="2xl" color="orange.500">
            Tenants
          </Heading>
          <Flex alignItems="center" gap="2">
            <BackButton />
            <Button
              onClick={() => navigate("/adm/tenants/create")}
              colorPalette="cyan"
            >
              Criar tenant
            </Button>
          </Flex>
        </Flex>

        <Box mt="8" maxH="800px" overflow="auto">
          {isLoading && <Text>Listando tenants...</Text>}
          {!isLoading && error && <Text>Ouve um erro ao listar tenants!</Text>}
          {!isLoading && !error && tenants.length == 0 && (
            <Text>Não foram encontradas tenants</Text>
          )}
          {!isLoading && tenants && tenants.length > 0 && (
            <Table.Root variant="line" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                  <Table.ColumnHeader>Id</Table.ColumnHeader>
                  <Table.ColumnHeader />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {tenants.map((tenant) => (
                  <Table.Row key={tenant._id}>
                    <Table.Cell>{tenant.nome}</Table.Cell>
                    <Table.Cell>{tenant._id}</Table.Cell>
                    <Table.Cell placeItems="end">
                      <Flex gap="4">
                        <IconButton
                          onClick={() => navigate(`/adm/tenant/${tenant._id}`)}
                          colorPalette="cyan"
                          size="xs"
                        >
                          <FilePenLine />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            navigate(`/adm/tenant/${tenant._id}/clone`)
                          }
                          colorPalette="green"
                          size="xs"
                        >
                          <CopyPlus />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            onDelete(tenant._id);
                          }}
                          disabled={true}
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
