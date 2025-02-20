import { Flex, Heading, VStack, Text, Button, Box } from "@chakra-ui/react";
import { FileSliders } from "lucide-react";
import { useAuth } from "../../../hooks/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useTenant } from "../../../hooks/tenant";
import { Server } from "lucide-react";
import { queryClient } from "../../../config/react-query";

export function MultiTenant() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const { getTenant, setTenant } = useTenant();

  const selectTenant = (tenant) => {
    setTenant({ tenant });
    navigate("/", { viewTransition: true });
    queryClient.invalidateQueries([]);
  };

  if (!user && isLoading === false) {
    return <Navigate to="/login" />;
  }

  return (
    <Flex
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      padding="4"
      bg="gray.50"
    >
      <Box
        borderLeft="4px solid"
        borderColor="orange.500"
        rounded="lg"
        shadow="md"
        overflow="hidden"
        h="full"
        w="full"
        p="8"
        pl="10"
        overflowY="auto"
      >
        <Heading fontSize="2xl" color="orange.600">
          Agora só falta mais um passo! :)
        </Heading>
        <Text mt="3" fontSize="lg" fontWeight="600" color="gray.500">
          Em que ambiente você deseja trabalhar?
        </Text>
        <Box p="4" />
        <Flex gap="2" wrap="wrap">
          {user?.tipo === "master" && (
            <Button
              onClick={() =>
                navigate("/adm/usuarios", { viewTransition: true })
              }
              variant="surface"
              colorPalette="orange"
              size="2xl"
              rounded="lg"
              w="xs"
            >
              Painel do administrador
              <Server />
            </Button>
          )}
          {user?.tenants?.map((e, i) => (
            <Button
              onClick={() => selectTenant(e.tenant)}
              variant="outline"
              key={e._id}
              colorPalette="gray"
              size="2xl"
              rounded="lg"
              w="xs"
            >
              {e.tenant?.nome}
            </Button>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
