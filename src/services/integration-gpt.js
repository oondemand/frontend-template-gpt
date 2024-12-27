import axios from "axios";

const askQuestion = ({ question }) => {
  const token = localStorage.getItem("authToken");
  return axios.post(
    "http://localhost:3000/stream",
    { question },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const IntegrationGptService = {
  askQuestion,
};
