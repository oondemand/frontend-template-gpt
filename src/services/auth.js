import { api } from "../config/axios";

export const validateToken = async () => {
  const response = await api.get("/auth/validar-token");

  return response.data;
};

export const logIn = async ({ email, password }) => {
  const response = await api.post("/auth/login", { email, senha: password });

  return response.data;
};
