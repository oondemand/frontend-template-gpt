import * as Yup from "yup";

const envSchema = Yup.object({
  MODE: Yup.string().default("development"),
  VITE_API_URL: Yup.string().required(),
  VITE_API_INTEGRACAO_URL: Yup.string().required(),
  SERVICE_VERSION: Yup.string().default("1.0.0"),
});

export const env = envSchema.validateSync(import.meta.env);
