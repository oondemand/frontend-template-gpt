import {
  Box,
  Flex,
  Heading,
  Link,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";

import { LogOut, ArrowLeftRight } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useConfirmation } from "../../hooks/confirmationModal";
import { useAuth } from "../../hooks/auth";
import { useTenant } from "../../hooks/tenant";
import { queryClient } from "../../config/react-query";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { requestConfirmation } = useConfirmation();
  const { signOut, user } = useAuth();
  const { getTenant, setTenant } = useTenant();

  const handleChangeTenant = () => {
    navigate("/multi-tenant");
    queryClient.clear();
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Includes", path: "/includes" },
    { name: "Templates", path: "/templates" },
    { name: "Moedas", path: "/moedas" },
    { name: "Base omies", path: "/base-omies" },
    { name: "Usuários", path: "/usuarios" },
    { name: "Tenants", path: "/tenants", role: "master" },
  ];

  const handleLogOut = async () => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja sair?",
      description: "Você terá que fazer o login novamente!",
    });

    if (response.action === "confirmed") {
      signOut();
    }
  };

  return (
    <Box position="relative" w="11/12" m="auto" py="2" minHeight="vh">
      <VStack justifyContent="space-between" alignItems="center">
        <Heading color="orange.500">Fatura Personalizada</Heading>
        <Flex mt="8" w="full" flexDir="column" gap="4">
          {navItems.map((item, i) => {
            if (item?.role === "master" && user.tipo !== "master") {
              return null;
            }

            return (
              <Link
                asChild
                w="full"
                key={`item-${i}`}
                px="4"
                rounded="md"
                to={item.path}
                py="1"
                outline="none"
                transition="all 0.3s ease"
                textDecoration="none"
                color={location.pathname === item.path ? "white" : "gray.900"}
                scale={location.pathname === item.path ? "1.05" : "1"}
                _hover={{ bg: "orange.400", color: "white", scale: "1.05" }}
                bg={
                  location.pathname === item.path ? "orange.500" : "transparent"
                }
              >
                <NavLink to={item.path}>{item.name}</NavLink>
              </Link>
            );
          })}
        </Flex>
      </VStack>
      <Flex w="full" flexDir="column" position="absolute" gap="2" bottom="2">
        {user.tenants.length > 1 && (
          <>
            <Button
              onClick={handleChangeTenant}
              display="flex"
              color="gray.700"
              alignItems="center"
              bg="gray.50"
              w="full"
              border="1px solid"
              borderColor="gray.200"
              p="2"
              px="4"
              rounded="md"
              justifyContent="space-between"
              _hover={{ bg: "gray.200" }}
            >
              <Text fontSize="sm">{getTenant().nome}</Text>
              <ArrowLeftRight />
            </Button>
          </>
        )}
        <Button
          onClick={handleLogOut}
          display="flex"
          color="gray.900"
          alignItems="center"
          w="full"
          bg="gray.200"
          p="2"
          px="4"
          rounded="md"
          justifyContent="space-between"
          _hover={{ bg: "gray.300" }}
        >
          <Text fontSize="md">Sair</Text>
          <LogOut />
        </Button>
      </Flex>
    </Box>
  );
}
