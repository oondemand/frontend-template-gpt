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

export function Form() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Values", values);
    },
    // validationSchema:
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <VStack gap="2">
        <Box>
          <Text color="orange.600">Email</Text>
          <Input
            w="xs"
            type="email"
            name="email"
            placeholder="exemplo@exemplo.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
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
        </Box>
        <Button mt="8" bg="orange.400" w="xs" type="submit">
          Login
        </Button>
        {/* <Flex w="full" justifyContent="space-between">
          <Box>
            <Text fontWeight="medium" color="orange.600">
              Esqueci minha senha
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="orange.600">
              Cadastrar
            </Text>
          </Box>
        </Flex> */}
      </VStack>
    </form>
  );
}
