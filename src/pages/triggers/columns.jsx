import { IconButton } from "@chakra-ui/react";
import { DefaultEditableCell } from "../../components/datagrid/cells/defaultEditable";
import { SelectCell } from "../../components/datagrid/cells/select";
import { SelectEtapaCell } from "../../components/datagrid/cells/selectEtapaCell";
import { SelectBaseOmieCell } from "../../components/datagrid/cells/selectBaseOmie";
import { SelectTemplateCell } from "../../components/datagrid/cells/selectTemplateCell";
import { DefaultCell } from "../../components/datagrid/cells/default";
import { CreateConfigForm } from "./dialog";
import { SwitchCell } from "../../components/datagrid/cells/switchCelll";
import { PencilIcon } from "lucide-react";
import { DocAction } from "../../components/datagrid/actions/doc";
import { DeleteTriggerAction } from "../../components/datagrid/actions/deleteTriggerAction";

export const columns = [
  {
    accessorKey: "acoes",
    header: "Açoes",
    cell: (props) => (
      <>
        <CreateConfigForm
          defaultValues={props.row.original}
          trigger={
            <IconButton colorPalette="gray" variant="surface" size="2xs" mx="2">
              <PencilIcon />
            </IconButton>
          }
        />
        <DeleteTriggerAction id={props.row.original?._id} />
        <DocAction {...props} />
      </>
    ),
  },
  {
    accessorKey: "_id",
    header: "Id",
    cell: DefaultCell,
  },
  {
    accessorKey: "kanbanOmie",
    header: "Kanban Omie",
    cell: (props) => (
      <SelectCell
        {...props}
        options={[
          { label: "Ordem de Serviço", value: "OrdemServiço" },
          { label: "Pedido de Venda", value: "PedidoVenda" },
        ]}
      />
    ),
  },
  {
    accessorKey: "baseOmie",
    header: "Base Omie",
    cell: SelectBaseOmieCell,
  },
  {
    accessorKey: "etapaGeracao",
    header: "Etapa Geração",
    cell: SelectEtapaCell,
  },
  {
    accessorKey: "etapaProcessado",
    header: "Etapa Processado",
    cell: SelectEtapaCell,
  },
  {
    accessorKey: "etapaErro",
    header: "Etapa Erro",
    cell: SelectEtapaCell,
  },
  {
    accessorKey: "enviarEmail",
    header: "Enviar Email",
    cell: SwitchCell,
  },
  {
    accessorKey: "templateAssuntoEmail",
    header: "Template Assunto Email",
    cell: SelectTemplateCell,
  },
  {
    accessorKey: "templateCorpoEmail",
    header: "Template Corpo Email",
    cell: SelectTemplateCell,
  },
  {
    accessorKey: "templateDocumento",
    header: "Template Documento",
    cell: SelectTemplateCell,
  },
  {
    accessorKey: "adiantamento",
    header: "Adiantamento",
    cell: (props) => {
      if (props.row.original?.["kanbanOmie"] === "OrdemServiço") {
        return <SwitchCell {...props} />;
      }

      return null;
    },
  },
];
