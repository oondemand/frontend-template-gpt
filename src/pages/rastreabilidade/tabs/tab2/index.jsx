import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../config/axios";
import { Datagrid } from "../../../../components/datagrid";
import { useDataGrid } from "../../../../hooks/useDataGrid";
import { columns } from "./columns";

export function Tab2() {
  const { table, filters } = useDataGrid({
    columns,
    key: "RASTREABILIDADE/DOCUMENTOS",
  });

  const { data } = useQuery({
    queryKey: ["rastreabilidade/documentos", filters],
    queryFn: async () =>
      await api.get("/rastreabilidade/documentos", { params: filters }),
    keepPreviousData: true,
  });

  console.log(data?.data?.results);

  return (
    <Box>
      <Box mt="2" w="full">
        {data && (
          <Datagrid
            table={table}
            rowCount={data?.data?.pagination?.totalItems}
            data={data?.data?.results}
          />
        )}
      </Box>
    </Box>
  );
}
