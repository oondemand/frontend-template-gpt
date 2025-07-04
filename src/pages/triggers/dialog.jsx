import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { SelectTemplate } from "../../components/selectTemplate";
import { SelectBaseOmie } from "../../components/selectBaseOmie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select } from "../../components/select";
import { DashedBox } from "../../components/dashedBox";
import { TextInput } from "../../components/input/textInput";
import { Switch } from "../../components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../config/axios";
import { toast } from "sonner";
import { queryClient } from "../../config/react-query";
import { useEffect } from "react";
import { Save } from "lucide-react";
import { SelectEtapa } from "../../components/selectEtapa";

export const schema = z.object({
  kanbanOmie: z.enum(["OrdemServico", "PedidoVenda", "CRM"]),
  baseOmie: z.string().array().optional(),
  etapaGeracao: z.string().optional(),
  etapaProcessado: z.string().optional(),
  etapaErro: z.string().optional(),
  enviarEmail: z.boolean().optional(),
  templateAssuntoEmail: z.string().optional(),
  templateCorpoEmail: z.string().optional(),
  templateDocumento: z.string().optional(),
  adiantamento: z.boolean().optional(),
  categoria: z.string().optional(),
});

const etapaOptions = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
  { label: "40", value: "40" },
  { label: "50", value: "50" },
  { label: "60", value: "60" },
];

const kanbanOptions = [
  { label: "Ordem de Serviço", value: "OrdemServico" },
  { label: "Pedido de Venda", value: "PedidoVenda" },
  { label: "CRM", value: "CRM" },
];

export const CreateConfigForm = ({ defaultValues, trigger }) => {
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      kanbanOmie: defaultValues?.kanbanOmie || "OrdemServico",
    },
    resolver: zodResolver(schema),
  });

  const { mutate: createConfig } = useMutation({
    mutationFn: ({ body }) => {
      return api.post("gatilhos", body);
    },
    onSuccess: () => {
      toast.success("Gatilho criado com sucesso");
      form.reset();
    },
    onError: () => {
      toast.error("Erro!", {
        description: "Ouve um erro inesperado ao criar o gatilho",
      });
    },
  });

  const { mutate: updateTrigger } = useMutation({
    mutationFn: async ({ id, body }) => await api.put(`/gatilhos/${id}`, body),
    onSuccess: () => {
      toast.success("Gatilho atualizado com sucesso");
      queryClient.invalidateQueries(["triggers"]);
    },
    onError: () => {
      toast.error("Erro ao atualizar gatilho");
    },
  });

  const onSubmit = (data) => {
    if (!defaultValues) {
      return createConfig({ body: data });
    }

    return updateTrigger({ id: defaultValues._id, body: data });
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);
  return (
    <DialogRoot lazyMount placement="center" size="cover">
      <DialogTrigger cursor="pointer">{trigger}</DialogTrigger>
      <DialogContent maxW="60%">
        <DialogHeader>
          <DialogTitle>Gatilho</DialogTitle>
        </DialogHeader>
        <DialogBody w="full" h="full" overflow="auto" scrollbarWidth="thin">
          <form id="form-trigger" onSubmit={form.handleSubmit(onSubmit)}>
            <DashedBox>
              <Text color="orange.500" mb="2" fontWeight="medium">
                Geral
              </Text>
              <Flex gap="4">
                <Select
                  errors={form.formState.errors}
                  name="kanbanOmie"
                  label="Kanban omie"
                  value={[form.watch("kanbanOmie")]}
                  onValueChange={(e) => form.setValue("kanbanOmie", e.value[0])}
                  options={kanbanOptions}
                />

                <SelectBaseOmie
                  w="md"
                  label="Base omie"
                  placeholder="Base omie"
                  multiple
                  value={form.watch("baseOmie")}
                  onValueChange={(e) => form.setValue("baseOmie", e.value)}
                />
              </Flex>
              <Flex w="full" gap="8" mt="4">
                {form.watch("kanbanOmie") === "OrdemServico" && (
                  <Box>
                    <Text color="gray.700" mb="1.5" fontSize="xs">
                      Adiantamento
                    </Text>
                    <Switch
                      checked={form.watch("adiantamento")}
                      onCheckedChange={({ checked }) =>
                        form.setValue("adiantamento", checked)
                      }
                      colorPalette="orange"
                      fontSize="xs"
                      w="full"
                    />
                  </Box>
                )}
                <Box>
                  <Text color="gray.700" mb="1.5" fontSize="xs">
                    Enviar email
                  </Text>
                  <Switch
                    checked={form.watch("enviarEmail")}
                    onCheckedChange={({ checked }) =>
                      form.setValue("enviarEmail", checked)
                    }
                    colorPalette="orange"
                    fontSize="xs"
                    w="full"
                  />
                </Box>
              </Flex>
            </DashedBox>

            <DashedBox mt="8">
              <Text color="orange.500" mb="2" fontWeight="medium">
                Etapas
              </Text>

              <Flex gap="2.5" flexDir="column">
                <SelectEtapa
                  errors={form.formState.errors}
                  name="etapaGeracao"
                  label="Etapa Geração"
                  options={etapaOptions}
                  value={[form.watch("etapaGeracao")]}
                  kanban={form.watch("kanbanOmie")}
                  onValueChange={(e) =>
                    form.setValue("etapaGeracao", e.value[0])
                  }
                />

                <SelectEtapa
                  errors={form.formState.errors}
                  name="etapaProcessado"
                  label="Etapa Processado"
                  options={etapaOptions}
                  value={[form.watch("etapaProcessado")]}
                  kanban={form.watch("kanbanOmie")}
                  onValueChange={(e) =>
                    form.setValue("etapaProcessado", e.value[0])
                  }
                />

                <SelectEtapa
                  errors={form.formState.errors}
                  name="etapaErro"
                  label="Etapa Erro"
                  options={etapaOptions}
                  value={[form.watch("etapaErro")]}
                  kanban={form.watch("kanbanOmie")}
                  onValueChange={(e) => form.setValue("etapaErro", e.value[0])}
                />
              </Flex>
            </DashedBox>

            <DashedBox mt="8">
              <Text color="orange.500" mb="2" fontWeight="medium">
                Templates
              </Text>

              <Flex gap="4" w="full">
                <SelectTemplate
                  w="full"
                  label="Template Assunto e-mail"
                  placeholder="Template Assunto e-mail"
                  value={[form.watch("templateAssuntoEmail")]}
                  onValueChange={(e) =>
                    form.setValue("templateAssuntoEmail", e.value[0])
                  }
                />

                <SelectTemplate
                  w="full"
                  label="Template e-mail corpo"
                  placeholder="Template e-mail corpo"
                  value={[form.watch("templateCorpoEmail")]}
                  onValueChange={(e) =>
                    form.setValue("templateCorpoEmail", e.value[0])
                  }
                />

                <SelectTemplate
                  w="full"
                  label="Template documento"
                  placeholder="Template documento"
                  value={[form.watch("templateDocumento")]}
                  onValueChange={(e) =>
                    form.setValue("templateDocumento", e.value[0])
                  }
                />
              </Flex>
            </DashedBox>
          </form>
        </DialogBody>
        <DialogCloseTrigger
          onClick={() => {
            form.reset();
            queryClient.invalidateQueries(["triggers"]);
          }}
        />
        <DialogFooter justifyContent="flex-start" gap="4">
          <Button
            form="form-trigger"
            variant="subtle"
            colorPalette="green"
            type="submit"
          >
            Salvar
          </Button>
          <Button
            variant="subtle"
            colorPalette="gray"
            onClick={() => {
              form.reset();
              queryClient.invalidateQueries(["triggers"]);
            }}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
