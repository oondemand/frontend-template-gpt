import { api } from "../config/axios";

const listGatilhos = async () => {
  const { data } = await api.get("/gatilhos");
  return data;
};

const listTodosGatilhos = async () => {
  const { data } = await api.get("/gatilhos/todos");
  return data;
};

const getGatilho = async ({ id }) => {
  const { data } = await api.get(`/gatilhos/${id}`);
  return data;
};

const createGatilho = async ({ body }) => {
  return await api.post("/gatilhos", body);
};

const updateGatilho = async ({ id, body }) => {
  return api.put(`/gatilhos/${id}`, body);
};

const deleteGatilho = async ({ id }) => {
  return api.delete(`/gatilhos/${id}`);
};

export const GatilhoService = {
  listGatilhos,
  getGatilho,
  createGatilho,
  updateGatilho,
  deleteGatilho,
  listTodosGatilhos,
};
