import { useState } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import Button from "../ui/Button";

const LoginForm = ({
  onSubmit,
  loading = false,
}) => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError(
        "Please enter your password."
      );
      return;
    }

    try {
      await onSubmit({
        email: email.trim(),
        password,
      });
    } catch (err) {
      setError(
        err?.message ||
          "Unable to login."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Error */}
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

      {/* Email */}
      <div>
        <label className="
          mb-2 block
          text-sm
          font-medium
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
              text-slate-800
              outline-none
              transition
              placeholder:text-slate-400
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
        <div className="mb-2 flex items-center justify-between">
          <label className="
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          ">
            Password
          </label>

          <button
            type="button"
            className="
              text-xs
              font-medium
              text-slate-500
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:text-white
            "
          >
            Forgot password?
          </button>
        </div>

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
            placeholder="Enter your password"
            autoComplete="current-password"
            className="
              h-12 w-full
              rounded-xl
              border border-slate-200
              bg-white
              pl-10 pr-11
              text-sm
              text-slate-800
              outline-none
              transition
              placeholder:text-slate-400
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
              hover:text-slate-700
              dark:hover:text-white
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

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;