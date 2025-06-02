import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../config/axios";
import { Datagrid } from "../../../../components/datagrid";
import { useDataGrid } from "../../../../hooks/useDataGrid";
import { columns } from "./columns";

export function Tab1() {
  const { table, filters } = useDataGrid({
    columns,
    key: "RASTREABILIDADE/LOGS",
  });

  const { data } = useQuery({
    queryKey: ["rastreabilidade", filters],
    queryFn: () => api.get("/logs"),
  });

  return (
    <Box>
      <Box mt="2" w="full">
        {data && (
          <Datagrid table={table} rowCount={120} data={data?.data?.logs} />
        )}
      </Box>
    </Box>
  );
}
