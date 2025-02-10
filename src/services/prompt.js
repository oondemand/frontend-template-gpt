import { api } from "../config/axios";

const listPrompt = async ({ id }) => {
  const { data } = await api.get(`/prompt?assistente=${id}`);
  return data;
};

const createPrompt = async (data) => {
  return await api.post("/prompt", data);
};

const updatePrompt = async ({ id, body }) => {
  return await api.put(`/prompt/${id}`, body);
};

const getPrompt = async ({ id }) => {
  const { data } = await api.get(`/prompt/${id}`);
  return data;
};

const deletePrompt = async ({ id }) => {
  return await api.delete(`/prompt/${id}`);
};

export const PromptService = {
  listPrompt,
  updatePrompt,
  getPrompt,
  deletePrompt,
  createPrompt,
};
