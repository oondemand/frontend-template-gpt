export const getStatusColor = (status) => {
  if (status >= 200 && status < 300) return "green";
  if (status >= 300 && status < 400) return "yellow";
  if (status >= 400) return "red";
  return "gray";
};
