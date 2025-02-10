import { api } from "../config/axios";

const listBaseOmies = async () => {
  const { data } = await api.get("/base-omies");
  return data;
};

const deleteBaseOmieById = async ({ id }) => {
  return await api.delete(`/base-omies/${id}`);
};

const createBaseOmie = async ({ body }) => {
  return await api.post("/base-omies", body);
};

const getBaseOmie = async ({ id }) => {
  const { data } = await api.get(`/base-omies/${id}`);
  return data;
};

const updateBaseOmie = async ({ id, body }) => {
  return await api.patch(`/base-omies/${id}`, body);
};

export const BaseOmieService = {
  listBaseOmies,
  deleteBaseOmieById,
  createBaseOmie,
  getBaseOmie,
  updateBaseOmie,
};
