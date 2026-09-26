import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  Loader2,
} from "lucide-react";

import useProfile from "../hooks/useProfile";

const CustomerProfilePage = () => {
  const {
    profile,
    loading,
    error,
  } = useProfile();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2
          size={28}
          className="
            animate-spin
            text-slate-500
            dark:text-slate-400
          "
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-xl
          border
          border-red-200
          bg-red-50
          px-4
          py-3
          text-sm
          text-red-600
          dark:border-red-500/30
          dark:bg-red-500/10
          dark:text-red-400
        "
      >
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-6
          py-10
          text-center
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <p
          className="
            text-slate-500
            dark:text-slate-400
          "
        >
          Profile information not available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1
          className="
            text-2xl
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          Customer Profile
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          View your account information.
        </p>
      </div>

      {/* Profile Card */}
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* Profile Header */}
        <div
          className="
            flex
            items-center
            gap-4
            border-b
            border-slate-200
            pb-6
            dark:border-slate-800
          "
        >

          {/* Avatar */}
          <div
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-slate-900
              text-xl
              font-semibold
              text-white
              dark:bg-white
              dark:text-slate-900
            "
          >
            {profile?.name
              ?.charAt(0)
              ?.toUpperCase() || "C"}
          </div>

          {/* Name + Email */}
          <div className="min-w-0">

            <h2
              className="
                truncate
                text-xl
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {profile.name}
            </h2>

            <p
              className="
                truncate
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              {profile.email}
            </p>

          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">

          {/* Full Name */}
          <div
            className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-5
              dark:border-slate-800
              dark:bg-slate-950
            "
          >
            <div className="flex items-center gap-2">

              <UserRound
                size={20}
                className="
                  text-slate-500
                  dark:text-slate-400
                "
              />

              <p
                className="
                  text-sm
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Full Name
              </p>

            </div>

            <p
              className="
                mt-3
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {profile.name}
            </p>
          </div>

          {/* Email */}
          <div
            className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-5
              dark:border-slate-800
              dark:bg-slate-950
            "
          >
            <div className="flex items-center gap-2">

              <Mail
                size={20}
                className="
                  text-slate-500
                  dark:text-slate-400
                "
              />

              <p
                className="
                  text-sm
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Email
              </p>

            </div>

            <p
              className="
                mt-3
                break-all
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {profile.email}
            </p>
          </div>

          {/* Role */}
          <div
            className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-5
              dark:border-slate-800
              dark:bg-slate-950
            "
          >
            <div className="flex items-center gap-2">

              <ShieldCheck
                size={20}
                className="
                  text-slate-500
                  dark:text-slate-400
                "
              />

              <p
                className="
                  text-sm
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Role
              </p>

            </div>

            <p
              className="
                mt-3
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {profile.role}
            </p>
          </div>

          {/* Account Created */}
          <div
            className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-5
              dark:border-slate-800
              dark:bg-slate-950
            "
          >
            <div className="flex items-center gap-2">

              <CalendarDays
                size={20}
                className="
                  text-slate-500
                  dark:text-slate-400
                "
              />

              <p
                className="
                  text-sm
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Account Created
              </p>

            </div>

            <p
              className="
                mt-3
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {profile.createdAt
                ? new Date(
                    profile.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;