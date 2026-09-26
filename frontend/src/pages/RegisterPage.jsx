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
      title="Create your account"
      subtitle="Create a customer account to book and manage your vehicle services."
      footer={
        <p className="text-sm text-slate-500">
          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-slate-900 hover:underline"
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