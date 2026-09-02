import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  Loader2,
} from "lucide-react";

import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
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
          className="animate-spin text-slate-500"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="
        rounded-xl
        border border-red-200
        bg-red-50
        px-4 py-3
        text-sm
        text-red-600
      ">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="
          text-2xl
          font-semibold
          text-slate-900
        ">
          Admin Profile
        </h1>

        <p className="
          mt-1
          text-sm
          text-slate-500
        ">
          View your account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-6
        shadow-sm
      ">
        {/* Profile Header */}
        <div className="
          flex
          items-center
          gap-4
          border-b
          border-slate-100
          pb-6
        ">
          <div className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-slate-900
            text-xl
            font-semibold
            text-white
          ">
            {profile?.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>
            <h2 className="
              text-xl
              font-semibold
              text-slate-900
            ">
              {profile?.name}
            </h2>

            <p className="
              text-sm
              text-slate-500
            ">
              {profile?.email}
            </p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="
          mt-6
          grid
          gap-5
          md:grid-cols-2
        ">

          {/* Name */}
          <div className="
            rounded-xl
            bg-slate-50
            p-4
          ">
            <div className="
              mb-2
              flex
              items-center
              gap-2
              text-slate-500
            ">
              <UserRound size={17} />

              <span className="
                text-xs
                font-medium
                uppercase
                tracking-wide
              ">
                Full Name
              </span>
            </div>

            <p className="
              font-medium
              text-slate-900
            ">
              {profile?.name || "-"}
            </p>
          </div>

          {/* Email */}
          <div className="
            rounded-xl
            bg-slate-50
            p-4
          ">
            <div className="
              mb-2
              flex
              items-center
              gap-2
              text-slate-500
            ">
              <Mail size={17} />

              <span className="
                text-xs
                font-medium
                uppercase
                tracking-wide
              ">
                Email
              </span>
            </div>

            <p className="
              font-medium
              text-slate-900
            ">
              {profile?.email || "-"}
            </p>
          </div>

          {/* Role */}
          <div className="
            rounded-xl
            bg-slate-50
            p-4
          ">
            <div className="
              mb-2
              flex
              items-center
              gap-2
              text-slate-500
            ">
              <ShieldCheck size={17} />

              <span className="
                text-xs
                font-medium
                uppercase
                tracking-wide
              ">
                Role
              </span>
            </div>

            <p className="
              font-medium
              text-slate-900
            ">
              {profile?.role || "-"}
            </p>
          </div>

          {/* Created At */}
          <div className="
            rounded-xl
            bg-slate-50
            p-4
          ">
            <div className="
              mb-2
              flex
              items-center
              gap-2
              text-slate-500
            ">
              <CalendarDays size={17} />

              <span className="
                text-xs
                font-medium
                uppercase
                tracking-wide
              ">
                Account Created
              </span>
            </div>

            <p className="
              font-medium
              text-slate-900
            ">
              {profile?.createdAt
                ? new Date(
                    profile.createdAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "-"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;