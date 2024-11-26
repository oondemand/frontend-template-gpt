import * as Yup from "yup";

const envSchema = Yup.object({
  MODE: Yup.string().default("development"),
  VITE_API_URL: Yup.string().required(),
});

export const env = envSchema.validateSync(import.meta.env);
