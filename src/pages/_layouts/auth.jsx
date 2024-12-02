import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar";

export function AuthLayout() {
  const { user, isLoading } = useAuth();

  if (!user && isLoading === false) {
    return <Navigate to="/login" />;
  }

  return (
    <Grid templateColumns="repeat(8, 1fr)" bg="gray.50" minH="vh" minW="vw">
      <GridItem colSpan={1}>
        <Navbar />
      </GridItem>
      <GridItem colSpan={7} m="2" rounded="md" bg="white">
        <Outlet />
      </GridItem>
    </Grid>
  );
}
