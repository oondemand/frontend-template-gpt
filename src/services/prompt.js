import { api } from "../config/axios";

const listPrompt = async () => {
  const { data } = await api.get("/prompt");
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

export const PromptService = {
  listPrompt,
  updatePrompt,
  getPrompt,
};
