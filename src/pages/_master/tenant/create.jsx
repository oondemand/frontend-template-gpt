import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { TenantForm } from "./form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";
import { TenantService } from "../../../services/tenant";

import { toast } from "sonner";

export function CreateTenant() {
  const { mutateAsync: createTenantMutation } = useMutation({
    mutationFn: TenantService.createTenant,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-tenants"],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createTenantMutation({
        ...data,
      });

      if (response.status === 201) {
        toast.success("Tenant criada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao criar tenant!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Criar tenant
        </Heading>
        <Button type="submit" form="create-tenant-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      <TenantForm onSubmit={onSubmit} formId="create-tenant-form" />
    </Box>
  );
}
