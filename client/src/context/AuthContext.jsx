import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, logoutUser } from "../services/authService.js";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========================================
  // On app load, ask the server "am I still
  // logged in?" The auth token lives in an
  // httpOnly cookie now, so JS can't read it
  // directly to check - but the browser
  // sends it automatically with this
  // request, so if it's valid the server
  // tells us who we are.
  // ========================================

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await getProfile();

        setUser(response.user);

        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );
      } catch (error) {
        // Not logged in / cookie expired
        setUser(null);

        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = (userData) => {
    // The token itself is already set as an
    // httpOnly cookie by the server's login
    // response - we never see or handle it
    // here. We just keep a copy of the
    // (non-sensitive) user info for the UI.
    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  };

  const logout = async () => {
    try {
      // Ask the server to clear the auth
      // cookie. httpOnly cookies can only be
      // cleared by the server, never by
      // client-side JS - so this call is
      // required, not optional, for a
      // complete logout.
      await logoutUser();
    } catch (error) {
      console.error(
        "Logout API call failed:",
        error
      );
    }

    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
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