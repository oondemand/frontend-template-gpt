import { api } from "../config/axios";

const listTenants = async () => {
  const { data } = await api.get("/tenants");
  return data;
};

const createTenant = async (props) => {
  return await api.post("/auth/registrar-tenant", props);
};

const deleteTenantById = async ({ id }) => {
  return api.delete(`/tenants/${id}`);
};

const updateTenant = async ({ id, dados }) => {
  return api.patch(`/tenants/${id}`, dados);
};

const getTenant = async ({ id }) => {
  const { data } = await api.get(`/tenants/${id}`);
  return data;
};

export const TenantService = {
  listTenants,
  createTenant,
  deleteTenantById,
  updateTenant,
  getTenant,
};
