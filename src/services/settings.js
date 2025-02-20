import { api } from "../config/axios";

const listSettings = async () => {
  const { data } = await api.get("/configuracoes");
  return data;
};

const createSetting = async ({ body }) => {
  return await api.post("/configuracoes", body);
};

const deleteSettingById = async ({ id }) => {
  return await api.delete(`/configuracoes/${id}`);
};

const getSetting = async ({ id }) => {
  const { data } = await api.get(`/configuracoes/${id}`);
  return data;
};

const updateSetting = async ({ id, body }) => {
  return await api.put(`/configuracoes/${id}`, body);
};

const listUniqueSettings = async () => {
  const { data } = await api.get("configuracoes/listar-configuracoes-unicas");
  return data;
};

const listOmieCategories = async (baseOmieId) => {
  const { data } = await api.get(
    `configuracoes/listar-categorias-omie/${baseOmieId}`
  );

  return data;
};

export const SettingService = {
  listSettings,
  createSetting,
  deleteSettingById,
  getSetting,
  updateSetting,
  listUniqueSettings,
  listOmieCategories,
};
