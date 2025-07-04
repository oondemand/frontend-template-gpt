import { z } from "zod";

const previewSchema = z.object({
  baseOmie: z.string().min(1, "Base omie é obrigatória").array(),
  templateEjs: z.string().min(1, "templateEjs é obrigatório."),
  omieVar: z.string(),
});

const chatSchema = z.object({
  baseOmie: z.string().min(1, "Base omie é obrigatória").array(),
  assistente: z.string().min(1, "Assistente é obrigatório").array(),
  question: z.string().optional(),
  file: z.any().optional(),
  templateEjs: z.string().optional(),
  omieVar: z.string(),
  systemVar: z.string(),
});

const saveSchema = z.object({
  templateEjs: z.string().min(1, "templateEjs é obrigatório."),
  omieVar: z.string(),
  systemVar: z.string(),
});

const importOsSchema = z.object({
  baseOmie: z.string().min(1, "Base omie é obrigatória").array(),
  numero: z.string().min(1, "Digite o número"),
  gatilho: z.string().min(1, "Gatilho é obrigatório").array(),
});

const enviarFaturaSchema = z.object({
  baseOmie: z.string().min(1, "Base omie é obrigatória").array(),
  omieVar: z.string(),
  emailList: z.string(),
  gatilho: z.string().min(1, "Gatilho é obrigatório").array(),
});

export const validation = {
  previewSchema,
  importOsSchema,
  saveSchema,
  enviarFaturaSchema,
  chatSchema,
};
