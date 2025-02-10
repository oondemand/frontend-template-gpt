const getTenant = () => {
  return JSON.parse(localStorage.getItem("tenant"));
};

const setTenant = ({ tenant }) => {
  return localStorage.setItem("tenant", JSON.stringify(tenant));
};

const clear = () => {
  return localStorage.removeItem("tenant");
};

export const useTenant = () => {
  return { getTenant, setTenant, clear };
};
