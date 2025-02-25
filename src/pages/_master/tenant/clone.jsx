import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { TenantForm } from "./form";
import { queryClient } from "../../../config/react-query";
import { TenantService } from "../../../services/tenant";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { BackButton } from "../../../components/ui/back-button";


export function CloneTenant() {
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

  const { mutateAsync: cloneTenantMutation } = useMutation({
    mutationFn: TenantService.createTenant,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-tenants"],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await cloneTenantMutation({
        ...data,
      });
      if (response.status === 200) {
        toast.success("Tenant criado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao criar tenant!", {
        description: error?.response?.data?.error,
      });
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Clonar tenant
        </Heading>
        <Flex alignItems="center" gap="2">
          <BackButton />
          <Button type="submit" form="clonar-tenant-form" colorPalette="cyan">
            Salvar
          </Button>
        </Flex>
      </Flex>
      {!isLoading && tenant && (
        <TenantForm
          data={tenant}
          onSubmit={onSubmit}
          formId="clonar-tenant-form"
        />
      )}
    </Box>
  );
}
