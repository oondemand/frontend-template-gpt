import axios from "axios";

const askQuestion = ({ body }) => {
  const token = localStorage.getItem("authToken");

  const formData = new FormData();

  if (body.file) {
    formData.append("file", body.file[0], body.file.name);
  }

  formData.append("templateEjs", body?.templateEjs);
  formData.append("question", body?.question);

  return axios.post("http://localhost:3000/integracao/question", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const IntegrationGptService = {
  askQuestion,
};
