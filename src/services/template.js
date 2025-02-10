import { api } from "../config/axios";

const listTemplates = async () => {
  const { data } = await api.get("/templates");
  return data;
};

const getTemplate = async ({ id }) => {
  const { data } = await api.get(`/templates/${id}`);
  return data;
};

const createTemplate = async ({ body }) => {
  return await api.post("/templates", body);
};

const updateTemplate = async ({ id, body }) => {
  return api.patch(`/templates/${id}`, body);
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
