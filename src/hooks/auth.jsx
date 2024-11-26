import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { logIn, validateToken } from "../services/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async (email, password) => {
    const data = await logIn({ email, password });

    if (data.token) {
      localStorage.setItem("authToken", data.token);
      await loadContext();

      return true;
    }

    return false;
  };

  const signOut = async () => {
    setUser(null);
    localStorage.clear();
  };

  const loadContext = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const data = await validateToken();
        setUser(data);
      } catch (error) {
        console.log(error);
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
