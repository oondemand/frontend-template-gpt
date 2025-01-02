import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import { Grid, GridItem, Button, Text } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar";
import { useTenant } from "../../hooks/tenant";
import { useEffect } from "react";
import { Server } from "lucide-react";

const routes = [
  { name: "Usuários", path: "/adm/usuarios" },
  { name: "Tenants", path: "/adm/tenants" },
];

export function MasterLayout() {
  const { user, isLoading } = useAuth();
  const { clear } = useTenant();
  const navigate = useNavigate();

  if (user?.tipo !== "master" && isLoading === false) {
    return <Navigate to="/" />;
  }

  //importante para não mandar um tenantId via header das requisições
  useEffect(() => {
    clear();
  }, []);

  if (user?.tipo === "master" && isLoading === false) {
    return (
      <Grid templateColumns="repeat(8, 1fr)" bg="gray.50" minH="vh" minW="vw">
        <GridItem colSpan={1}>
          <Navbar.root navItems={routes} title="Painel do administrador">
            <Navbar.footer>
              {user?.tipo === "master" && (
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
        <GridItem p="4" colSpan={7} m="2" rounded="md" bg="white">
          <Outlet />
        </GridItem>
      </Grid>
    );
  }
}
