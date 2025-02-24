export const DEFAULT_SYSTEM_SETTINGS = [
  "email-from",
  "email-from-nome",
  "email-copia",
  "sendgrid-api-key",
  "template-email-assunto",
  "template-email-corpo",
  "template-fatura",
  "omie-etapa-gerar",
  "omie-etapa-processado",
  "omie-etapa-erro",
  "omie-adiantamento-gerar",
  "omie-adiantamento-conta-corrente",
  "omie-adiantamento-categoria",
];

export const DEFAULT_ETAPAS_SETTINGS = [
  {
    cCodigo: "10",
    cDescrPadrao: "Ordem de Serviço",
    cDescricao: "Segunda etapa",
    cInativo: "N",
  },
  {
    cCodigo: "20",
    cDescrPadrao: "Em Execução",
    cDescricao: "Terceira etapa",
    cInativo: "N",
  },
  {
    cCodigo: "30",
    cDescrPadrao: "Executada",
    cDescricao: "Quarta etapa",
    cInativo: "N",
  },
  {
    cCodigo: "40",
    cDescrPadrao: "Executada",
    cDescricao: "Quinta etapa",
    cInativo: "N",
  },
  {
    cCodigo: "50",
    cDescrPadrao: "Faturar",
    cDescricao: "Sexta etapa",
    cInativo: "N",
  },
];
