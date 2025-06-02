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
import { useQuery } from "@tanstack/react-query";

const columns = [
  {
    accessorKey: "acoes",
    header: "Açoes",
    cell: (props) => (
      <CreateConfigForm
        defaultValues={props.row.original}
        trigger={
          <IconButton colorPalette="gray" variant="surface" size="2xs" mx="2">
            <PencilIcon />
          </IconButton>
        }
      />
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
    accessorKey: "adiantamento",
    header: "Adiantamento",
    cell: (props) => {
      if (props.row.original?.["kanban-omie"] === "OrdemServiço") {
        return <SwitchCell {...props} />;
      }

      return null;
    },
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
    cell: DefaultEditableCell,
  },
];

const fakeData = [
  {
    _id: "1",
    "kanban-omie": "OrdemServiço",
    "base-omie": "66f169ec27834c6d3debd007",
    "etapa-geracao": "Em Análise",
    "etapa-processado": "Concluído",
    "etapa-erro": "Erro de Processamento",
    "enviar-email": true,
    "template-assunto-email": "OS #{numero} - {cliente}",
    "template-corpo-email":
      "Prezado cliente, sua OS #{numero} foi processada com sucesso.",
    "template-documento": "template_os_padrao.docx",
    adiantamento: true,
    "conta-corrente": "123456",
    categoria: "Manutenção",
  },
  {
    _id: "2",
    "kanban-omie": "PedidoVenda",
    "base-omie": "66f169ec27834c6d3debd007",
    "etapa-geracao": "Em Andamento",
    "etapa-processado": "Aprovado",
    "etapa-erro": "Rejeitado",
    "enviar-email": true,
    "template-assunto-email": "Proposta Comercial - {cliente}",
    "template-corpo-email": "Segue em anexo nossa proposta comercial.",
    "template-documento": "template_proposta.docx",
    adiantamento: false,
    "conta-corrente": "",
    categoria: "",
  },
  {
    _id: "3",
    "kanban-omie": "PedidoVenda",
    "base-omie": "66f169ec27834c6d3debd007",
    "etapa-geracao": "Pendente",
    "etapa-processado": "Em Processamento",
    "etapa-erro": "Falha na Geração",
    "enviar-email": false,
    "template-assunto-email": "OS #{numero} - {cliente}",
    "template-corpo-email":
      "Prezado cliente, sua OS #{numero} foi processada com sucesso.",
    "template-documento": "template_os_padrao.docx",
    adiantamento: true,
    "conta-corrente": "789012",
    categoria: "Instalação",
  },
];

export function Triggers() {
  const { data } = useQuery({
    queryKey: ["triggers"],
    queryFn: async () => await api.get("gatilhos"),
  });

  console.log("[data]:", data?.data);

  return (
    <Box>
      <Heading fontSize="md" color="gray.500" fontWeight="normal">
        Gatilhos
      </Heading>
      <Box mt="8" overflowX="auto" scrollbarWidth="thin" spaceY="4">
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
            onUpdateData={(data) => console.log(data)}
          />
        )}
      </Box>
    </Box>
  );
}
