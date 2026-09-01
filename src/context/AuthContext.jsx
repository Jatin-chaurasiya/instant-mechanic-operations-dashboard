import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import authApi from "../api/authApi";

const AuthContext = createContext(null);

const AUTH_KEY = "instant_mechanic_auth";
const TOKEN_KEY = "token";

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Restore authentication
  // ==========================================

  useEffect(() => {

    try {

      const savedAuth =
        localStorage.getItem(AUTH_KEY);

      const token =
        localStorage.getItem(TOKEN_KEY);

      if (savedAuth && token) {

        const parsedAuth =
          JSON.parse(savedAuth);

        setUser(parsedAuth);

      } else {

        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(TOKEN_KEY);

        setUser(null);
      }

    } catch (error) {

      console.error(
        "Unable to restore authentication:",
        error
      );

      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(TOKEN_KEY);

      setUser(null);

    } finally {

      setLoading(false);
    }

  }, []);

  // ==========================================
  // Login
  // ==========================================

  const login = async ({
    email,
    password,
  }) => {

    if (!email || !password) {
      throw new Error(
        "Email and password are required."
      );
    }

    const response =
      await authApi.login({
        email,
        password,
      });

    const authData = response;

    if (!authData?.token) {
      throw new Error(
        "Login failed: authentication token not received."
      );
    }

    // Save JWT
    localStorage.setItem(
      TOKEN_KEY,
      authData.token
    );

    // Save user information
    const loggedInUser = {
      name: authData.name,
      email: authData.email,
    };

    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return loggedInUser;
  };

  // ==========================================
  // Register
  // ==========================================

  const register = async ({
    name,
    email,
    password,
  }) => {

    if (!name || !email || !password) {
      throw new Error(
        "All fields are required."
      );
    }

    const response =
      await authApi.register({
        name,
        email,
        password,
      });

    return response;
  };

  // ==========================================
  // Logout
  // ==========================================

  const logout = () => {

    localStorage.removeItem(TOKEN_KEY);

    localStorage.removeItem(AUTH_KEY);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default AuthProvider;