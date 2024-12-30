import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { IaChat } from "../../components/iaChat";
import { TenantForm } from "./form";
import { TenantService } from "../../services/tenant";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { toast } from "sonner";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

export function UpdateTenant() {
  const { id } = useParams();

  const {
    data: tenant,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tenant", { id }],
    queryFn: async () => await TenantService.getTenant({ id }),
  });

  const { mutateAsync: updateTenantMutation } = useMutation({
    mutationFn: TenantService.updateTenant,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-tenants"],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateTenantMutation({
        id,
        dados: {
          ...data,
        },
      });
      if (response.status === 200) {
        toast.success("Tenant atualizar com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao atualizar tenant!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Detalhes do tenant
        </Heading>
        <Button type="submit" form="update-tenant-form" colorPalette="cyan">
          Atualizar
        </Button>
      </Flex>
      {!isLoading && tenant && (
        <TenantForm
          data={tenant}
          onSubmit={onSubmit}
          formId="update-tenant-form"
        />
      )}
      <IaChat />
    </Box>
  );
}
