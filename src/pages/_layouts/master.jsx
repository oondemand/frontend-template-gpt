import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";

export function MasterLayout() {
  const { user, isLoading } = useAuth();

  if (user.tipo !== "master" && isLoading === false) {
    return <Navigate to="/" />;
  }

  if (user.tipo === "master" && isLoading === false) {
    return <Outlet />;
  }
}
