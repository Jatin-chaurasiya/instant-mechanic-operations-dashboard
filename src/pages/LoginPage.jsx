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
  } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        to="/overview"
        replace
      />
    );
  }

  const handleLogin = async (credentials) => {

    await login(credentials);

    navigate("/overview", {
      replace: true,
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your Operations Dashboard."
      footer={
        <p
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              font-semibold
              text-slate-900
              hover:underline
              dark:text-white
            "
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