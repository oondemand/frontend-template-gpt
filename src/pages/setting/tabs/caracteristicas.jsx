import {
  Box,
  Flex,
  Heading,
  Input,
  Tabs,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../config/react-query";
import { SettingService } from "../../../services/settings";
import { toast } from "sonner";
import { FlushedInput } from "../input";
import { SelectTemplate } from "../../../components/selectTemplate";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { DEFAULT_SYSTEM_SETTINGS } from "../../../_constants/defaultConfigs";
import { useConfirmation } from "../../../hooks/confirmationModal";
import { SelectCode } from "../../../components/selectCode";

export function CaracteristicasForm({
  title,
  baseOmie = null,
  initialSettings = [],
}) {
  const filteredData = initialSettings
    .filter((item) => {
      return (
        !DEFAULT_SYSTEM_SETTINGS.includes(item.codigo) &&
        item?.baseOmie?._id == baseOmie
      );
    })
    .map(({ nome, codigo, valor, _id }) => ({ nome, codigo, valor, _id }));

  const [settings, setSettings] = useState(filteredData);
  const [config, setConfig] = useState("");

  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: createSettingsMutation } = useMutation({
    mutationFn: SettingService.createSetting,
  });

  const handleCreateCaracteristicas = async () => {
    try {
      const response = await createSettingsMutation({
        body: {
          baseOmie,
        },
      });

      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["list-settings"],
        });
        setSettings((prev) => [...prev, response.data]);
        toast.success("Configuração criada com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Ouve um erro ao criar configuração!");
    }
  };

  const { mutateAsync: updateSettingsMutation } = useMutation({
    mutationFn: SettingService.updateSetting,
  });

  const handleValueChange = async (e, id) => {
    if (e.target.defaultValue === e.target.value) return;

    try {
      const { data } = await updateSettingsMutation({
        id: id,
        body: { [e.target.name]: e.target.value.trim() },
      });

      setSettings((prevSettings) =>
        prevSettings.map((setting) =>
          setting._id === data._id ? { ...setting, ...data } : setting
        )
      );

      queryClient.invalidateQueries({
        queryKey: ["list-settings"],
      });

      toast.success("Configuração atualizada com sucesso!");
    } catch (error) {
      toast.error("Ouve um erro ao atualizar campo!");
      console.error(error);
    }
  };

  const { mutateAsync: deleteSettingMutation } = useMutation({
    mutationFn: SettingService.deleteSettingById,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-settings"],
      });
    },
  });

  const onDelete = async (id) => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja deletar configuração?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (response.action === "confirmed") {
      try {
        const response = await deleteSettingMutation({ id });
        if (response.status === 200) {
          setSettings((prevSettings) =>
            prevSettings.filter((setting) => setting._id !== id && setting)
          );

          toast.success("Configuração deletada com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao deletar Configuração!");
      }
    }
  };

  useEffect(() => {
    setSettings(filteredData);
  }, [baseOmie]);

  return (
    <Box mt="6" rounded="md" p="4" pb="8" shadow="xs">
      <Flex alignItems="center" gap="8">
        <Text fontWeight="semibold" fontSize="md" color="orange.500">
          {title}
        </Text>
        <Button
          size="2xs"
          colorPalette="cyan"
          fontWeight="semibold"
          onClick={handleCreateCaracteristicas}
        >
          Adicionar Característica
        </Button>
      </Flex>
      <Box gap="4" mt="4">
        {settings.map((e, i) => (
          <Flex key={e._id} gap="6" mb="4" alignItems="center">
            <FlushedInput
              w="sm"
              label="Observação"
              name="nome"
              defaultValue={e.nome}
              onBlur={async (event) => {
                await handleValueChange(event, e._id);
              }}
            />
            <FlushedInput
              w="2xs"
              label="Código"
              name="codigo"
              defaultValue={e.codigo}
              onBlur={async (event) => {
                await handleValueChange(event, e._id);
              }}
            />
            <FlushedInput
              w="2xs"
              label="Valor"
              name="valor"
              defaultValue={e.valor}
              onBlur={async (event) => {
                await handleValueChange(event, e._id);
              }}
            />


              

            <IconButton
              variant="subtle"
              size="xs"
              onClick={() => onDelete(e._id)}
            >
              <Trash />
            </IconButton>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}
