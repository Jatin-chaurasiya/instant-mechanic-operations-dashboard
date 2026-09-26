import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    login,
    isAuthenticated,
    user,
  } = useAuth();

  if (isAuthenticated) {
    if (user?.role === "ADMIN") {
      return (
        <Navigate
          to="/admin/overview"
          replace
        />
      );
    }

    if (user?.role === "CUSTOMER") {
      return (
        <Navigate
          to="/customer/profile"
          replace
        />
      );
    }

    return null;
  }

  const handleLogin = async (credentials) => {
    const loggedInUser = await login(credentials);

    if (loggedInUser.role === "ADMIN") {
      navigate("/admin/overview", {
        replace: true,
      });
      return;
    }

    if (loggedInUser.role === "CUSTOMER") {
      navigate("/customer/profile", {
        replace: true,
      });
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account."
      footer={
        <p className="text-sm text-slate-500">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-slate-900 hover:underline"
          >
            Create account
          </Link>
        </p>
      }
    >
      <LoginForm
        onSubmit={handleLogin}
      />
    </AuthLayout>
  );
};

export default LoginPage;