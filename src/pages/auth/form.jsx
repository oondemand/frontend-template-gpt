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

const schema = Yup.object({
  email: Yup.string().email("Email inválido!").required("Email obrigatório!"),
  password: Yup.string()
    .min(6, "Email precisa ter no mínimo 6 caracteres!")
    .required("Senha obrigatória!"),
});

export function Form() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Values", values);
    },
    validateOnChange: false,
    validationSchema: schema,
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <VStack gap="2">
        <Box>
          <Text color="orange.600">Email</Text>
          <Input
            w="xs"
            type="text"
            name="email"
            placeholder="exemplo@exemplo.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <Text color="red.500" fontSize="sm">
              {formik.errors.email}
            </Text>
          )}
        </Box>
        <Box>
          <Text color="orange.600">Senha</Text>
          <Input
            w="xs"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <Text color="red.500" fontSize="sm">
              {formik.errors.password}
            </Text>
          )}
        </Box>
        <Button mt="8" bg="orange.400" w="xs" type="submit">
          Login
        </Button>
      </VStack>
    </form>
  );
}
