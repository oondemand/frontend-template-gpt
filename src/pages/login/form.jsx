import { Button, VStack } from "@chakra-ui/react";

import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

import { TextInput } from "../../components/input/textInput";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z
    .string({ message: "Email obrigatório!" })
    .email({ message: "Email inválido!" }),
  password: z
    .string({ message: "Senha obrigatória!" })
    .min(6, { message: "A senha precisa ter no mínimo 6 caracteres!" }),
});

export function Form() {
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 400) {
        return toast.error("Credenciais inválidas!");
      }

      if (error.response?.status === 404) {
        return toast.error("Usuário não encontrado!");
      }

      toast.error("Não foi possível realizar o login!");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="2">
        <TextInput
          w="xs"
          label="Email *"
          {...register("email")}
          placeholder="exemplo@exemplo.com"
          error={errors.email?.message}
        />
        <TextInput
          w="xs"
          label="Senha *"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button mt="8" bg="orange.400" w="xs" type="submit">
          Login
        </Button>
      </VStack>
    </form>
  );
}
