import { Controller, useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import {
  Button,
  Flex,
  Box,
  Textarea,
  Text,
  Spinner,
  Separator,
  Collapsible,
  Input,
} from "@chakra-ui/react";

import { toast } from "sonner";

import { SelectBaseOmie } from "../../components/selectBaseOmie";
import { FaturaService } from "../../services/fatura";
import { ExternalIframe } from "../iframe";

export const Editor = ({ setActionType, codeVersion, previewError, data }) => {
  const {
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const {
    mutateAsync: getSystemVarsMutation,
    isLoading: getSystemVarsIsLoading,
  } = useMutation({
    mutationFn: FaturaService.getSystemVars,
  });

  const handleBaseOmieChange = async (value) => {
    if (value.length === 0) return;
    try {
      const { data } = await getSystemVarsMutation({
        body: {
          baseOmie: value[0],
        },
      });

      if (data) {
        toast.success("Variáveis de ambiente atualizadas!");
        setValue("systemVar", JSON.stringify(data, null, 2));
      }
    } catch (error) {
      toast.error("Ouve um erro em buscar variáveis de sistema.");
    }
  };

  return (
    <Flex ml="2" flex="1" h="full" flexDir="column" w="full">
      <Collapsible.Root mt="2">
        <Flex gap="4" mb="3" alignItems="center">
          <Collapsible.Trigger cursor="pointer">
            <Text fontSize="lg">Variáveis (Json)</Text>
          </Collapsible.Trigger>
          <Box>
            <Controller
              control={control}
              name="baseOmie"
              render={({ field }) => (
                <SelectBaseOmie
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    handleBaseOmieChange(value);
                    field.onChange(value);
                  }}
                  onInteractOutside={() => field.onBlur()}
                  w="2xs"
                  size="xs"
                />
              )}
            />
            {errors?.baseOmie && (
              <Text ml="1" fontSize="xs" color="red.500">
                Selecione base omie
              </Text>
            )}
          </Box>
          <Box>
            <Input
              w="32"
              size="xs"
              placeholder="Numero da os..."
              {...register("os")}
            />
            <Text fontSize="xs" color="red.500">
              {errors?.os?.message}
            </Text>
          </Box>
          <Button
            disabled={isSubmitting}
            type="submit"
            onClick={() => {
              setActionType("IMPORT_VARS");
            }}
            variant="surface"
            size="xs"
          >
            Importar variáveis
            {/* {!omieVarsIsLoading && "Importar variáveis"}
            {omieVarsIsLoading && <Spinner />} */}
          </Button>
          {getSystemVarsIsLoading && <Spinner />}
        </Flex>
        <Collapsible.Content>
          <Flex mt="2" alignItems="baseline" gap="4">
            <Flex w="full" flexDir="column">
              <Text>Variáveis omie</Text>
              <Textarea
                fontSize="md"
                scrollbarWidth="thin"
                {...register("omieVar")}
                h="44"
              />
            </Flex>
            <Flex w="full" flexDir="column">
              <Text>Variáveis do sistema</Text>
              <Textarea
                fontSize="md"
                scrollbarWidth="thin"
                {...register("systemVar")}
                h="44"
              />
            </Flex>
          </Flex>
        </Collapsible.Content>
      </Collapsible.Root>

      <Separator mt="2" variant="dashed" />

      <Collapsible.Root mt="2">
        <Flex gap="4" mb="3">
          <Collapsible.Trigger cursor="pointer">
            <Text fontSize="lg">Conteúdo</Text>
          </Collapsible.Trigger>
          <Flex>
            {codeVersion.length > 0 &&
              codeVersion.map((e, i) => (
                <Button
                  disabled={isSubmitting}
                  key={`btn-0${i}`}
                  onClick={() => {
                    setValue("templateEjs", e);
                  }}
                  roundedLeft={i === 0 ? "md" : "none"}
                  roundedRight={i === codeVersion.length - 1 ? "md" : "none"}
                  variant="surface"
                  size="xs"
                >
                  v{i + 1}
                </Button>
              ))}
          </Flex>
        </Flex>
        <Collapsible.Content>
          <Textarea
            scrollbarWidth="thin"
            fontSize="md"
            {...register("templateEjs")}
            h="80"
          />
        </Collapsible.Content>
      </Collapsible.Root>

      <Separator mt="2" variant="dashed" />

      <Flex alignItems="start" gap="2" my="2">
        <Text py="1" px="2" fontSize="lg">
          Preview
        </Text>

        <Button
          disabled={isSubmitting}
          w="24"
          type="submit"
          size="xs"
          variant="surface"
          onClick={() => {
            setActionType("PREVIEW");
          }}
        >
          Gerar preview
          {/* {!isLoading && "Gerar preview"}
          {isLoading && <Spinner />} */}
        </Button>

        <Button
          disabled={isSubmitting}
          type="submit"
          onClick={() => {
            setActionType("DOWNLOAD_PDF");
          }}
          w="28"
          size="xs"
          variant="surface"
        >
          Baixar fatura (PDF)
          {/* {!isLoadingDownloadPdfMutation && "Baixar fatura (PDF)"}
          {isLoadingDownloadPdfMutation && <Spinner />} */}
        </Button>

        <Input {...register("emailList")} w="sm" size="xs" />

        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={() => {
            setActionType("ENVIAR_FATURA");
          }}
          w="28"
          size="xs"
          variant="surface"
        >
          Enviar por email
          {/* {!isLoadingEnviarFaturaMutations && "Enviar por email"}
          {isLoadingEnviarFaturaMutations && <Spinner />} */}
        </Button>
      </Flex>
      {previewError && (
        <Box
          p="2"
          rounded="sm"
          border="1px dashed"
          borderColor="red.300"
          maxH="96"
          overflow="auto"
          scrollbarWidth="thin"
        >
          <Text fontSize="md" color="gray.600">
            {previewError?.response?.data?.error?.toString()}
          </Text>
        </Box>
      )}
      {data && <ExternalIframe html={data.data.toString()} />}
    </Flex>
  );
};
