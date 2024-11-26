import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";

export function MainLayout() {
  const { user, isLoading } = useAuth();

  return !user && isLoading === false ? <Navigate to="/auth" /> : <Outlet />;
}
