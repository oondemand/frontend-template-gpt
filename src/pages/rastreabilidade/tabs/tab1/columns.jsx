import { DefaultCell } from "../../../../components/datagrid/cells/default";
import { formatDateWithHours } from "../../../../utils/date";
import { Text } from "@chakra-ui/react";

export const columns = [
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: (props) => {
      return (
        <Text px="2" fontSize="sm">
          {formatDateWithHours(props.getValue())}
        </Text>
      );
    },
  },
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
