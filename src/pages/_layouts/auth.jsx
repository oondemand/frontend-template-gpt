import {
  Outlet,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import { Grid, GridItem, Button, Text } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar";
import { useTenant } from "../../hooks/tenant";

import { Airplay } from "lucide-react";

const routes = [
  { name: "Home", path: "/", rules: ["admin", "master", "padrao"] },
  { name: "Includes", path: "/includes", rules: ["admin", "master"] },
  { name: "Templates", path: "/templates", rules: ["admin", "master"] },
  { name: "Moedas", path: "/moedas", rules: ["admin", "master", "padrao"] },
  { name: "Base omies", path: "/base-omies", rules: ["admin", "master"] },
  {
    name: "Configurações",
    path: "/settings",
    rules: ["admin", "master", "padrao"],
  },
  { name: "Usuários", path: "/usuarios", rules: ["admin", "master"] },
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

  const route = routes.find((e) => location.pathname.includes(e.path));

  if (user && isLoading === false && !route.rules.includes(user.tipo)) {
    return <Navigate to="/login" />;
  }

  if (user && isLoading === false) {
    return (
      <Grid templateColumns="repeat(8, 1fr)" bg="gray.50" minH="vh" minW="vw">
        <GridItem colSpan={1}>
          <Navbar.root navItems={routes} title="Fatura Personalizada">
            <Navbar.footer>
              {user?.tipo === "master" && (
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
        <GridItem px="4" py="2" colSpan={7} m="2" rounded="md" bg="white">
          <Outlet />
        </GridItem>
      </Grid>
    );
  }
}
