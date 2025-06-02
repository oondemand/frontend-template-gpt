import { DefaultCell } from "../../../../components/datagrid/cells/default";

export const columns = [
  {
    accessorKey: "usuario.nome",
    header: "Usuario",
    cell: DefaultCell,
  },
  {
    accessorKey: "metodo",
    header: "Método",
    cell: DefaultCell,
  },
  {
    accessorKey: "endpoint",
    header: "Endpoint",
    cell: DefaultCell,
  },
  {
    accessorKey: "statusResposta",
    header: "Status",
    cell: DefaultCell,
  },
];
