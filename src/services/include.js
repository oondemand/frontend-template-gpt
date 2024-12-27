import { api } from "../config/axios";

const listIncludes = async () => {
  const { data } = await api.get("/includes");
  return data;
};

const getInclude = async ({ id }) => {
  const { data } = await api.get(`/includes/${id}`);
  return data;
};

const createInclude = async (data) => {
  return await api.post("/includes", data);
};

const updateInclude = async ({ id, dados }) => {
  return await api.patch(`/includes/${id}`, dados);
};

const deletarInclude = async ({ id }) => {
  return await api.delete(`/includes/${id}`);
};

export const IncludeService = {
  listIncludes,
  getInclude,
  createInclude,
  updateInclude,
  deletarInclude,
};
