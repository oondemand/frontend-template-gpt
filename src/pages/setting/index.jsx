import { Box, Heading, Text } from "@chakra-ui/react";
import { Datagrid } from "../../components/datagrid";
import { DefaultEditableCell } from "../../components/datagrid/cells/defaultEditable";
import { SelectCell } from "../../components/datagrid/cells/select";
import { SelectEtapaCell } from "../../components/datagrid/cells/selectEtapaCell";
import { SelectBaseOmieCell } from "../../components/datagrid/cells/selectBaseOmie";
import { SelectTemplateCell } from "../../components/datagrid/cells/selectTemplateCell";

const columns = [
  {
    accessorKey: "kanban-omie",
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
    accessorKey: "base-omie",
    header: "Base Omie",
    cell: SelectBaseOmieCell,
  },
  {
    accessorKey: "etapa-geracao",
    header: "Etapa de Geração",
    cell: SelectEtapaCell,
  },
  {
    accessorKey: "etapa-processado",
    header: "Etapa de Processado",
    cell: SelectEtapaCell,
  },
  {
    accessorKey: "etapa-erro",
    header: "Etapa de Erro",
    cell: SelectEtapaCell,
  },
  {
    accessorKey: "enviar-email",
    header: "Enviar Email",
    cell: DefaultEditableCell,
  },
  {
    accessorKey: "template-assunto-email",
    header: "Template Assunto Email",
    cell: SelectTemplateCell,
  },
  {
    accessorKey: "template-corpo-email",
    header: "Template Corpo Email",
    cell: SelectTemplateCell,
  },
  {
    accessorKey: "template-documento",
    header: "Template Documento",
    cell: SelectTemplateCell,
  },
  {
    accessorKey: "adiantamento",
    header: "Adiantamento",
    cell: DefaultEditableCell,
  },
  {
    accessorKey: "conta-corrente",
    header: "Conta Corrente",
    cell: DefaultEditableCell,
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

export function Settings() {
  return (
    <Box>
      <Heading fontSize="md" color="gray.500" fontWeight="normal">
        Configurações
      </Heading>
      <Box mt="8" overflowX="auto" scrollbarWidth="thin">
        <Datagrid
          data={fakeData}
          columns={columns}
          onUpdateData={(data) => console.log(data)}
        />
      </Box>
    </Box>
  );
}
