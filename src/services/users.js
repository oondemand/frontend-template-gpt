import { api } from "../config/axios";

const listUsers = async () => {
  const { data } = await api.get("/usuarios");
  return data;
};

const deleteUserById = async ({ id }) => {
  return await api.delete(`/usuarios/${id}`);
};

const createUser = async ({ body }) => {
  return await api.post("/usuarios", body);
};

const getUser = async ({ id }) => {
  const { data } = await api.get(`/usuarios/${id}`);
  return data;
};

const updateUser = async ({ id, body }) => {
  return api.put(`/usuarios/${id}`, { body });
};

export const UserService = {
  listUsers,
  deleteUserById,
  createUser,
  getUser,
  updateUser,
};
