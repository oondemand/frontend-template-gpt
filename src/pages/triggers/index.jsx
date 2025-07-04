import { Box, Heading, Button } from "@chakra-ui/react";
import { Datagrid } from "../../components/datagrid";
import { CreateConfigForm } from "./dialog";
import { PlusIcon } from "lucide-react";
import { api } from "../../config/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";
import { toast } from "sonner";
import { columns } from "./columns";
import { useDataGrid } from "../../hooks/useDataGrid";

export function Triggers() {
  const { table, filters } = useDataGrid({
    columns,
    key: "TRIGGERS",
  });

  const { data } = useQuery({
    queryKey: ["triggers", filters],
    queryFn: async () => await api.get("gatilhos", { params: filters }),
    keepPreviousData: true,
  });

  const { mutateAsync: updateTrigger } = useMutation({
    mutationFn: async ({ id, body }) => await api.put(`/gatilhos/${id}`, body),
    onSuccess: () => {
      toast.success("Gatilho atualizado com sucesso");
      queryClient.invalidateQueries(["triggers"]);
    },
    onError: () => {
      toast.error("Erro ao atualizar gatilho");
    },
  });

  return (
    <Box w="full" h="full" overflow="auto" className="custom-scrollbar">
      <Heading fontSize="md" color="gray.500" fontWeight="normal">
        Gatilhos
      </Heading>
      <Box mt="8" spaceY="4">
        <CreateConfigForm
          trigger={
            <Button colorPalette="orange" variant="subtle" size="xs">
              <PlusIcon />
              Adicionar novo
            </Button>
          }
        />
        {data?.data && (
          <Datagrid
            table={table}
            data={data?.data?.results}
            rowCount={data?.data?.pagination?.totalItems}
            onUpdateData={({ id, data }) => {
              updateTrigger({ id, body: data });
            }}
          />
        )}
      </Box>
    </Box>
  );
}
