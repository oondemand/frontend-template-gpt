import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Flex, VStack, Button, Heading, Text } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { TextInput } from "../../components/input/textInput";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { firstAccess } from "../../services/auth";

const schema = z
  .object({
    nome: z.string().min(1, "O nome é obrigatório"),
    novaSenha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmacao: z.string({ message: "Confirmação é um campo obrigatório" }),
  })
  .refine((data) => data.novaSenha === data.confirmacao, {
    message: "A senha e a confirmação precisam ser iguais!",
    path: ["confirmacao"],
  });

export function FirstAccess() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      localStorage.setItem("code", code);
      navigate(location.pathname, { replace: true });
    }
  }, [searchParams, navigate]);

  const { mutateAsync: firstAccessMutation } = useMutation({
    mutationFn: firstAccess,
  });

  const onSubmit = async (values) => {
    try {
      const code = localStorage.getItem("code");
      const response = await firstAccessMutation({
        body: values,
        code,
      });

      if (response.status === 200) {
        localStorage.removeItem("code");
        navigate("/login", { viewTransition: true });
      }
    } catch (error) {
      toast.error("Ouve um erro ao atualizar seus dados de login!");
    }
  };

  return (
    <div>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        <Flex
          borderLeft="2px solid"
          borderColor="orange.500"
          alignItems="center"
          justifyContent="center"
          rounded="lg"
          shadow="md"
          overflow="hidden"
        >
          <VStack px="8" py="8" gap="8">
            <VStack>
              <Heading color="orange.600">Só falta mais um passo :)</Heading>
              <Text color="gray.700">
                Preencha seu nome e sua senha para fazer login!
              </Text>
            </VStack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack>
                <TextInput
                  label="Nome *"
                  {...register("nome")}
                  error={errors.nome?.message}
                />

                <TextInput
                  label="Senha *"
                  type="password"
                  {...register("novaSenha")}
                  error={errors.novaSenha?.message}
                />

                <TextInput
                  label="Confirmar senha *"
                  type="password"
                  {...register("confirmacao")}
                  error={errors.confirmacao?.message}
                />

                <Button mt="8" bg="orange.400" w="xs" type="submit">
                  Confirmar
                </Button>
              </VStack>
            </form>
          </VStack>
        </Flex>
      </Flex>
    </div>
  );
}
