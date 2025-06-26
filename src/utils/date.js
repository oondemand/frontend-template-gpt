export function formatDateWithHours(isoString) {
  if (!isoString) return "";

  const data = new Date(isoString);

  if (isNaN(data.getTime())) return "";

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");

  return `${horas}:${minutos} ${dia}/${mes}/${ano}`;
}

export function mesAnoExtenso(data = new Date()) {
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();

  return `${mes} ${ano}`;
}
