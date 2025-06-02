import {
  Outlet,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import { Grid, GridItem, Button, Text, Box } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar";
import { useTenant } from "../../hooks/tenant";

import { Airplay } from "lucide-react";

const routes = [
  { name: "Home", path: "/", rules: ["admin-tenant", "admin", "usuario"] },
  { name: "Includes", path: "/includes", rules: ["admin-tenant", "admin"] },
  { name: "Templates", path: "/templates", rules: ["admin-tenant", "admin"] },
  {
    name: "Moedas",
    path: "/moedas",
    rules: ["admin-tenant", "admin", "usuario"],
  },
  {
    name: "Base omies",
    path: "/base-omies",
    rules: ["admin-tenant", "admin"],
  },
  {
    name: "Configurações",
    path: "/settings",
    rules: ["admin-tenant", "admin"],
  },
  {
    name: "Gatilhos",
    path: "/gatilhos",
    rules: ["admin-tenant", "admin"],
  },
  { name: "Usuários", path: "/usuarios", rules: ["admin-tenant", "admin"] },
];

export function AuthLayout() {
  const { user, isLoading } = useAuth();
  const { getTenant } = useTenant();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user && isLoading === false) {
    return <Navigate to="/login" />;
  }

  if (user && isLoading === false && user.tenants.length > 1 && !getTenant()) {
    return <Navigate to="/multi-tenant" />;
  }

  const route = routes.find((e, i) => location.pathname == e.path);

  // if (user && isLoading === false && !route?.rules.includes(user.tipo)) {
  //   return <Navigate to="/login" />;
  // }

  if (user && isLoading === false) {
    return (
      <Grid templateColumns="repeat(8, 1fr)" bg="gray.50" minH="vh" minW="vw">
        <GridItem colSpan={1}>
          <Navbar.root navItems={routes} title="Doc Custom">
            <Navbar.footer>
              {user?.tipo === "admin" && (
                <Button
                  onClick={() =>
                    navigate("/adm/usuarios", { viewTransition: true })
                  }
                  display="flex"
                  colorPalette="orange"
                  alignItems="center"
                  rounded="md"
                  justifyContent="space-between"
                  variant="surface"
                  w="full"
                  p="2"
                  px="4"
                >
                  <Text truncate fontSize="sm">
                    Painel do administrador
                  </Text>
                  <Airplay />
                </Button>
              )}
              {user.tenants.length > 1 && <Navbar.changeTenantButton />}
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
          <Box m="1" p="2" px="4" rounded="md" h="99%" bg="white">
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    );
  }
}
