import { Box, Heading, IconButton, Text, Icon, Button } from "@chakra-ui/react";
import { Datagrid } from "../../components/datagrid";
import { DefaultEditableCell } from "../../components/datagrid/cells/defaultEditable";
import { SelectCell } from "../../components/datagrid/cells/select";
import { SelectEtapaCell } from "../../components/datagrid/cells/selectEtapaCell";
import { SelectBaseOmieCell } from "../../components/datagrid/cells/selectBaseOmie";
import { SelectTemplateCell } from "../../components/datagrid/cells/selectTemplateCell";
import { CreateConfigForm } from "./dialog";
import { SwitchCell } from "../../components/datagrid/cells/switchCelll";
import { PlusIcon, PencilIcon } from "lucide-react";
import { api } from "../../config/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";
import { toast } from "sonner";
import { DocAction } from "../../components/datagrid/actions/doc";
import { DeleteTriggerAction } from "../../components/datagrid/actions/deleteTriggerAction";

const columns = [
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
    header: "Etapa de Geração",
    cell: SelectEtapaCell,
  },
  {
    accessorKey: "etapaProcessado",
    header: "Etapa de Processado",
    cell: SelectEtapaCell,
  },
  {
    accessorKey: "etapaErro",
    header: "Etapa de Erro",
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
    accessorKey: "categoria",
    header: "Categoria",
    cell: (props) => {
      if (props.row.original?.["kanbanOmie"] === "OrdemServiço") {
        return <DefaultEditableCell {...props} />;
      }

      return null;
    },
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

export function Triggers() {
  const { data } = useQuery({
    queryKey: ["triggers"],
    queryFn: async () => await api.get("gatilhos"),
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

  console.log("[data]:", data?.data);

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
            data={data?.data}
            columns={columns}
            onUpdateData={({ id, data }) => {
              updateTrigger({ id, body: data });
            }}
          />
        )}
      </Box>
    </Box>
  );
}
