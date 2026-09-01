import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {

  const navigate = useNavigate();

  const {
    register,
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

  const handleRegister = async (data) => {

    await register(data);

    navigate("/login", {
      replace: true,
      state: {
        registered: true,
      },
    });
  };

  return (
    <AuthLayout
      title="Create admin account"
      subtitle="Register an account for the Operations Dashboard."
      footer={
        <p
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Already have an account?{" "}

          <Link
            to="/login"
            className="
              font-semibold
              text-slate-900
              hover:underline
              dark:text-white
            "
          >
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm
        onSubmit={handleRegister}
      />
    </AuthLayout>
  );
};

export default RegisterPage;