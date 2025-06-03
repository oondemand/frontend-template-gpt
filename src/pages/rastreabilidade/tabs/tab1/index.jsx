import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../config/axios";
import { Datagrid } from "../../../../components/datagrid";
import { useDataGrid } from "../../../../hooks/useDataGrid";
import { columns } from "./columns";
import { TableBody } from "./tableBody";

export function Tab1() {
  const { table, filters } = useDataGrid({
    columns,
    key: "RASTREABILIDADE/LOGS",
  });

  const { data } = useQuery({
    queryKey: ["rastreabilidade/logs", filters],
    queryFn: async () =>
      await api.get("/rastreabilidade/logs", { params: filters }),
    keepPreviousData: true,
  });

  return (
    <Box>
      <Box mt="2" w="full">
        {data && (
          <Datagrid
            table={table}
            TableBody={TableBody}
            rowCount={data?.data?.pagination?.totalItems}
            data={data?.data?.results}
          />
        )}
      </Box>
    </Box>
  );
}
