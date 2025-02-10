import { api } from "../config/axios";

const listAssistant = async () => {
  const { data } = await api.get("/assistentes");
  return data;
};

const createAssistant = async (data) => {
  return await api.post("/assistentes", data);
};

const updateAssistant = async ({ id, body }) => {
  return await api.put(`/assistentes/${id}`, body);
};

const getAssistant = async ({ id }) => {
  const { data } = await api.get(`/assistentes/${id}`);
  return data;
};

const cloneAssistant = async ({ id }) => {
  return await api.post(`/assistentes/${id}`);
};

const deleteAssistant = async ({ id }) => {
  return await api.delete(`/assistentes/${id}`);
};

export const AssistantService = {
  listAssistant,
  createAssistant,
  updateAssistant,
  getAssistant,
  deleteAssistant,
  cloneAssistant,
};
