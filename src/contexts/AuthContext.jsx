import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/auth";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("auth-token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    async function loadUser() {
      setLoading(true);

      try {
        if (!token) {
          setUser(null);
          return;
        }

        localStorage.setItem("auth-token", token);
        const response = await getMe();
        setUser(response.data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}