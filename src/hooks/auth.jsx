import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { logIn, validateToken } from "../services/auth";
import { queryClient } from "../config/react-query";

import { useTenant } from "./tenant";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getTenant, setTenant } = useTenant();

  const signIn = async (email, password) => {
    const data = await logIn({ email, password });

    if (data.token) {
      localStorage.setItem("authToken", data.token);
      await loadContext();

      if (data.usuario.tipo === "master") {
        return { success: true, multiTenant: true };
      }

      if (data?.usuario?.tenants.length > 1) {
        return { success: true, multiTenant: true };
      }

      setTenant({ tenant: data.usuario.tenants[0].tenant });
      return { success: true, multiTenant: false };
    }

    return { success: false };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.clear();
    queryClient.clear();
  };

  const loadContext = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const data = await validateToken();
        setUser(data);
      } catch (error) {
        console.log("ERROR", error);
        error.status === 401 && signOut();
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadContext();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, user, signOut, isLoading, loadContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
