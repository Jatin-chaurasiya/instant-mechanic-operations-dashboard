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

  // Check whether JWT is expired
  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      if (!payload.exp) {
        return true;
      }

      return payload.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };

  // Restore authentication for current browser session
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem(AUTH_KEY);
      const token = sessionStorage.getItem(TOKEN_KEY);

      // Remove old localStorage authentication
      // so previous persistent login cannot be restored.
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(TOKEN_KEY);

      if (
        savedAuth &&
        token &&
        isTokenValid(token)
      ) {
        const parsedAuth = JSON.parse(savedAuth);
        setUser(parsedAuth);
      } else {
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        setUser(null);
      }
    } catch (error) {
      console.error(
        "Unable to restore authentication:",
        error
      );

      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = async ({ email, password }) => {
    if (!email?.trim() || !password) {
      throw new Error(
        "Email and password are required."
      );
    }

    const response = await authApi.login({
      email: email.trim(),
      password,
    });

    if (!response?.token) {
      throw new Error(
        "Login failed: authentication token not received."
      );
    }

    const loggedInUser = {
      name: response.name,
      email: response.email,
      role: response.role,
    };

    // Save JWT for current browser session
    sessionStorage.setItem(
      TOKEN_KEY,
      response.token
    );

    // Save user information for current browser session
    sessionStorage.setItem(
      AUTH_KEY,
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return loggedInUser;
  };

  // Register customer
  const register = async ({
    name,
    email,
    password,
    phone,
    address,
  }) => {
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password ||
      !phone?.trim() ||
      !address?.trim()
    ) {
      throw new Error(
        "All fields are required."
      );
    }

    const response = await authApi.register({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      address: address.trim(),
    });

    return response;
  };

  // Logout
  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(AUTH_KEY);

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