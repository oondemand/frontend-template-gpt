import { Flex, Heading, VStack, Text, Button } from "@chakra-ui/react";
import { FileSliders } from "lucide-react";
import { useAuth } from "../../../hooks/auth";
import { useNavigate, Navigate } from "react-router-dom";

export function MultiTenant() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const selectTenant = (tenantId) => {
    localStorage.setItem("tenant", tenantId);
    navigate("/");
  };

  if (!user && isLoading === false) {
    return <Navigate to="/login" />;
  }

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        rounded="lg"
        shadow="md"
        overflow="hidden"
        // py="8"
        // px="12"
      >
        <Flex
          color="white"
          gap="2"
          alignItems="center"
          px="8"
          h="96"
          bg="orange.400"
        >
          <FileSliders size={22} />
          <Heading>Fatura personalizada</Heading>
        </Flex>
        <VStack px="8" gap="8">
          <VStack>
            <Heading color="orange.600">Agora só falta mais um passo!:</Heading>
            <Text color="gray.700">Em que ambiente você deseja trabalhar?</Text>
          </VStack>
          <Flex w="full" flexDir="column" gap="2">
            {user?.tenants?.map((e, i) => (
              <Button
                onClick={() => selectTenant(e.tenant._id)}
                variant="outline"
                key={e._id}
                colorPalette="gray"
                w="full"
              >
                {e.tenant.nome}
              </Button>
            ))}
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
}
