import { useState } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import Button from "../ui/Button";

const RegisterForm = ({
  onSubmit,
  loading = false,
}) => {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        password,
      });
    } catch (err) {
      setError(
        err?.message ||
          "Unable to create account."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {error && (
        <div className="
          rounded-xl
          border border-red-200
          bg-red-50
          px-4 py-3
          text-sm
          text-red-600
          dark:border-red-900
          dark:bg-red-950/40
          dark:text-red-400
        ">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="
          mb-2 block
          text-sm font-medium
          text-slate-700
          dark:text-slate-300
        ">
          Full Name
        </label>

        <div className="relative">
          <UserRound
            size={17}
            className="
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Operations Admin"
            autoComplete="name"
            className="
              h-12 w-full
              rounded-xl
              border border-slate-200
              bg-white
              pl-10 pr-4
              text-sm
              outline-none
              focus:border-slate-400
              focus:ring-4
              focus:ring-slate-100
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:focus:border-slate-500
              dark:focus:ring-slate-800
            "
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="
          mb-2 block
          text-sm font-medium
          text-slate-700
          dark:text-slate-300
        ">
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={17}
            className="
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="admin@example.com"
            autoComplete="email"
            className="
              h-12 w-full
              rounded-xl
              border border-slate-200
              bg-white
              pl-10 pr-4
              text-sm
              outline-none
              focus:border-slate-400
              focus:ring-4
              focus:ring-slate-100
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:focus:border-slate-500
              dark:focus:ring-slate-800
            "
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="
          mb-2 block
          text-sm font-medium
          text-slate-700
          dark:text-slate-300
        ">
          Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={17}
            className="
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Minimum 6 characters"
            autoComplete="new-password"
            className="
              h-12 w-full
              rounded-xl
              border border-slate-200
              bg-white
              pl-10 pr-11
              text-sm
              outline-none
              focus:border-slate-400
              focus:ring-4
              focus:ring-slate-100
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:focus:border-slate-500
              dark:focus:ring-slate-800
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (current) => !current
              )
            }
            className="
              absolute right-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="
          mb-2 block
          text-sm font-medium
          text-slate-700
          dark:text-slate-300
        ">
          Confirm Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={17}
            className="
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
            placeholder="Confirm your password"
            autoComplete="new-password"
            className="
              h-12 w-full
              rounded-xl
              border border-slate-200
              bg-white
              pl-10 pr-11
              text-sm
              outline-none
              focus:border-slate-400
              focus:ring-4
              focus:ring-slate-100
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:focus:border-slate-500
              dark:focus:ring-slate-800
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                (current) => !current
              )
            }
            className="
              absolute right-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          >
            {showConfirmPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;