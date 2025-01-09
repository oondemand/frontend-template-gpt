import axios from "axios";

const askQuestion = ({ body }) => {
  const token = localStorage.getItem("authToken");
  return axios.post("http://localhost:3000/integracao/question", body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const IntegrationGptService = {
  askQuestion,
};
