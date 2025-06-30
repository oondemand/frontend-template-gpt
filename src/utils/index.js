export const getStatusColor = (status) => {
  if (status >= 200 && status < 300) return "green";
  if (status >= 300 && status < 400) return "yellow";
  if (status >= 400) return "red";
  return "gray";
};

export const toUpperFirstCase = (str) => {
  return `${str?.substring(0, 1)?.toUpperCase() + str?.substring(1)}`;
};

// export const formatarEtapasOmie = ({ etapas }) => {
//   if (!etapas || !Array.isArray(etapas)) return [];

//   const map = new Map();

//   etapas?.forEach((element) => {
//     element?.etapas?.forEach((item) => {
//       if (item?.cInativo === "S") return;

//       // Concatena a descrição caso o código seja igual, mas descricao seja diferente
//       if (map.has(item.cCodigo)) {
//         const descricao = item?.cDescricao || item?.cDescrPadrao;
//         const existente = map.get(item.cCodigo);

//         if (descricao === existente?.descricao) return;
//         if (existente?.descricao.includes(descricao)) return;

//         map.set(item.cCodigo, {
//           ...item,
//           descricao: `${existente?.descricao} - ${descricao}`,
//         });

//         return;
//       }

//       map.set(item.cCodigo, {
//         ...item,
//         descricao: item?.cDescricao || item?.cDescrPadrao,
//       });
//     });
//   });

//   return Array.from(map.values());
// };

// export const filtrarEtapasPorKanban = (kanban, etapas) => {
//   const ETAPA_KEY_KANBAN_MAP = {
//     OrdemServico: "Venda de Serviço",
//     PedidoVenda: "Venda de Produto",
//     // CRM: "",
//   };

//   if (!kanban || !etapas || !ETAPA_KEY_KANBAN_MAP[kanban])
//     return DEFAULT_ETAPAS_SETTINGS;

//   const etapasFiltradas = etapas?.filter(
//     (e) => e?.cDescOperacao === ETAPA_KEY_KANBAN_MAP[kanban]
//   );

//   return formatarEtapasOmie({ etapas: etapasFiltradas });
// };
