import { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "../services/authService.js";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  const logout = async () => {
    try {
      // Let the server know this session
      // ended (useful for audit logs, and
      // future server-side session/token
      // invalidation). If this fails (e.g.
      // no internet), we still log the user
      // out locally below - they shouldn't
      // get stuck unable to log out.
      await logoutUser();
    } catch (error) {
      console.error(
        "Logout API call failed:",
        error
      );
    }

    setUser(null);
    setToken("");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider };