import {
  Formik,
  Field,
  ErrorMessage,
  Form as FormikForm,
  useFormik,
} from "formik";

import {
  Button,
  Input,
  VStack,
  Text,
  Box,
  HStack,
  Flex,
} from "@chakra-ui/react";

import * as Yup from "yup";

import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

import { TextInput } from "../../components/input/textInput";

import { toast } from "sonner";

const schema = Yup.object({
  email: Yup.string().email("Email inválido!").required("Email obrigatório!"),
  password: Yup.string()
    .min(6, "Email precisa ter no mínimo 6 caracteres!")
    .required("Senha obrigatória!"),
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmit,
    validateOnChange: false,
    validationSchema: schema,
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <VStack gap="2">
        <TextInput
          label="Email *"
          name="email"
          onChange={formik.handleChange}
          error={formik.errors.email}
          value={formik.values.email}
          w="xs"
          placeholder="exemplo@exemplo.com"
        />
        <TextInput
          label="Senha *"
          name="password"
          onChange={formik.handleChange}
          error={formik.errors.password}
          value={formik.values.password}
          w="xs"
        />
        <Button mt="8" bg="orange.400" w="xs" type="submit">
          Login
        </Button>
      </VStack>
    </form>
  );
}
