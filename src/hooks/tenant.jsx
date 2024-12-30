const getTenant = () => {
  return JSON.parse(localStorage.getItem("tenant"));
};

const setTenant = ({ tenant }) => {
  return localStorage.setItem("tenant", JSON.stringify(tenant));
};

export const useTenant = () => {
  return { getTenant, setTenant };
};
