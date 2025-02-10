import { api } from "../config/axios";

const generatePreview = async ({ body }) => {
  const response = await api.post("/fatura", body);
  return response.data;
};

const downloadPdf = async ({ body }) => {
  const response = await api.post("/fatura/download-pdf", body, {
    responseType: "arraybuffer",
  });

  return response;
};

const getOmieVars = async ({ body }) => {
  const response = await api.post("/fatura/listar-variaveis-omie", body);
  return response.data;
};

const getSystemVars = async ({ body }) => {
  const response = await api.post("/fatura/listar-variaveis-sistema", body);
  return response.data;
};

const enviarFatura = async ({ body }) => {
  const response = await api.post("/fatura/enviar-fatura", body);
  return response.data;
};

export const FaturaService = {
  generatePreview,
  getOmieVars,
  getSystemVars,
  downloadPdf,
  enviarFatura,
};
