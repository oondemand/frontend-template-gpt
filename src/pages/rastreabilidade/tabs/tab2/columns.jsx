import { DefaultCell } from "../../../../components/datagrid/cells/default";
import { Text } from "@chakra-ui/react";
import { formatDateWithHours } from "../../../../utils/date";

export const columns = [
  {
    accessorKey: "dataInicioProcessamento",
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
    accessorKey: "kanban",
    header: "Kanban",
    cell: DefaultCell,
  },
  {
    accessorKey: "emailUsuarioOmie",
    header: "Email usuário omie",
    cell: DefaultCell,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: DefaultCell,
  },
];
