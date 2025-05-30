import axios from "axios";
import { env } from "../config/env";

const askQuestion = ({ body }) => {
  const token = localStorage.getItem("authToken");

  const formData = new FormData();

  if (body.file) {
    for (const file of body.file) {
      formData.append("file", file, file.name);
    }
  }

  formData.append("templateEjs", body?.templateEjs);
  formData.append("question", body?.question);
  formData.append("omieVar", body?.omieVar);
  formData.append("systemVar", body?.systemVar);
  formData.append("modelo", body?.modelo);

  if (body.prompts) {
    formData.append("prompts", JSON.stringify(body.prompts));
  }

  return axios.post(
    `${env.VITE_API_INTEGRACAO_URL}/integracao/question`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const IntegrationGptService = {
  askQuestion,
};
