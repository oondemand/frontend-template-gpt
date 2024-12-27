import { api } from "../config/axios";

const listTemplates = async () => {
  const { data } = await api.get("/templates");
  return data;
};

const getTemplate = async ({ id }) => {
  const { data } = await api.get(`/templates/${id}`);
  return data;
};

const createTemplate = async ({ dados }) => {
  return await api.post("/templates", dados);
};

const updateTemplate = async ({ id, dados }) => {
  return api.patch(`/templates/${id}`, dados);
};

const deleteTemplete = async ({ id }) => {
  return api.delete(`/templates/${id}`);
};

export const TemplateService = {
  listTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplete,
};
