import { api } from "../config/axios";

const generatePreview = async ({ body }) => {
  const response = await api.post("/fatura", body);
  return response.data;
};

export const FaturaService = { generatePreview };
