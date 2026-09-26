import { useState } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import { toast } from "react-toastify";

import Button from "../ui/Button";

const RegisterForm = ({
  onSubmit,
  loading = false,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        password,
      });

      toast.success("Registered successfully!");

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to create account."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Your full name"
              autoComplete="name"
              className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 pl-10 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-500 focus:ring-4 focus:ring-slate-800"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              autoComplete="email"
              className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 pl-10 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-500 focus:ring-4 focus:ring-slate-800"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="9876543210"
              autoComplete="tel"
              className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 pl-10 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-500 focus:ring-4 focus:ring-slate-800"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Address
          </label>

          <div className="relative">
            <MapPin
              size={17}
              className="absolute left-3.5 top-3.5 text-slate-400"
            />

            <input
              type="text"
              value={address}
              onChange={(event) =>
                setAddress(event.target.value)
              }
              placeholder="Enter your address"
              autoComplete="street-address"
              className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 pl-10 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-500 focus:ring-4 focus:ring-slate-800"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
              className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 pl-10 pr-11 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-500 focus:ring-4 focus:ring-slate-800"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (current) => !current
                )
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
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
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Confirm Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
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
              className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 pl-10 pr-11 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-500 focus:ring-4 focus:ring-slate-800"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (current) => !current
                )
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>
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