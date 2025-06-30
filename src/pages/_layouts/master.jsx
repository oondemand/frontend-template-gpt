import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import { Grid, GridItem, Button, Text, Box } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar";
import { useTenant } from "../../hooks/tenant";
import { useEffect } from "react";
import { Server } from "lucide-react";

const routes = [
  { name: "Usuários", path: "/adm/usuarios", rules: ["admin"] },
  { name: "Tenants", path: "/adm/tenants", rules: ["admin"] },
  { name: "Assistentes", path: "/adm/assistentes", rules: ["admin"] },
];

export function MasterLayout() {
  const { user, isLoading } = useAuth();
  const { clear } = useTenant();
  const navigate = useNavigate();

  //importante para não mandar um tenantId via header das requisições
  useEffect(() => {
    clear();
  }, []);

  if (!user && isLoading === false) {
    return <Navigate to="/login" />;
  }

  if (user?.tipo !== "admin" && isLoading === false) {
    return <Navigate to="/" />;
  }

  if (user?.tipo === "admin" && isLoading === false) {
    return (
      <Grid templateColumns="repeat(8, 1fr)" bg="gray.50" minH="vh" minW="vw">
        <GridItem colSpan={1}>
          <Navbar.root navItems={routes} title="Painel do administrador">
            <Navbar.footer>
              {user?.tipo === "admin" && (
                <Button
                  onClick={() =>
                    navigate("/multi-tenant", { viewTransition: true })
                  }
                  display="flex"
                  colorPalette="orange"
                  variant="surface"
                  alignItems="center"
                  rounded="md"
                  justifyContent="space-between"
                  w="full"
                  p="2"
                  px="4"
                >
                  <Text fontSize="sm">Selecionar ambiente</Text>
                  <Server />
                </Button>
              )}
              <Navbar.logOutButton />
            </Navbar.footer>
          </Navbar.root>
        </GridItem>
        <GridItem
          py="1"
          colSpan={7}
          rounded="md"
          maxH="vh"
          overflowY="auto"
          scrollbarWidth="thin"
        >
          <Box m="1" p="2" px="4" rounded="md" minH="99%" bg="white">
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    );
  }
}
