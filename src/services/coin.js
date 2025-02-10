import { api } from "../config/axios";

const listCoins = async () => {
  const { data } = await api.get("/moedas");
  return data;
};

const createCoin = async ({ body }) => {
  return await api.post("/moedas", body);
};

const deleteCoinById = async ({ id }) => {
  return await api.delete(`/moedas/${id}`);
};

const getCoin = async ({ id }) => {
  const { data } = await api.get(`/moedas/${id}`);
  return data;
};

const updateCoin = async ({ id, body }) => {
  return await api.patch(`/moedas/${id}`, body);
};

export const CoinService = {
  listCoins,
  deleteCoinById,
  createCoin,
  getCoin,
  updateCoin,
};
