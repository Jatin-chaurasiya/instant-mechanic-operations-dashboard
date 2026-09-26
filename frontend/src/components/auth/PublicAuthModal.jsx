import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { useAuth } from "../../context/AuthContext";

const PublicAuthModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const { login, register } = useAuth();

  // Handle login for both Admin and Customer
  const handleLogin = async (credentials) => {
    const loggedInUser = await login(credentials);

    onClose();

    // Redirect Admin to Admin profile
    if (loggedInUser.role === "ADMIN") {
      navigate("/admin/profile", {
        replace: true,
      });

      return;
    }

    // Redirect Customer to Customer profile
    if (loggedInUser.role === "CUSTOMER") {
      navigate("/customer/profile", {
        replace: true,
      });
    }
  };

  // Register always creates a Customer account
  const handleRegister = async (data) => {
    await register(data);

    // After successful registration show login form
    setMode("login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-7 shadow-2xl">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl text-slate-400 transition hover:text-white"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <h2 className="text-2xl font-bold text-white">
            {mode === "login"
              ? "Welcome back"
              : "Create your account"}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {mode === "login"
              ? "Sign in to book and manage your vehicle services."
              : "Create a customer account to book vehicle services."}
          </p>
        </div>

        {/* Login */}
        {mode === "login" && (
          <>
            <LoginForm onSubmit={handleLogin} />

            <div className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-semibold text-white hover:underline"
              >
                Create account
              </button>
            </div>
          </>
        )}

        {/* Register */}
        {mode === "register" && (
          <>
            <RegisterForm onSubmit={handleRegister} />

            <div className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-semibold text-white hover:underline"
              >
                Sign in
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default PublicAuthModal;