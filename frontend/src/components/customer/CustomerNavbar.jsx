import {
  Menu,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../theme/ThemeToggle";

const CustomerNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);

    navigate("/", {
      replace: true,
    });
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-20
        border-b
        border-slate-200
        bg-white/95
        backdrop-blur
        dark:border-slate-800
        dark:bg-slate-900/95
      "
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-between
          gap-4
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Left Section */}
        <div className="flex min-w-0 items-center gap-3">

          <button
            type="button"
            onClick={onMenuClick}
            className="
              rounded-xl
              p-2
              text-slate-600
              transition
              hover:bg-slate-100
              hover:text-slate-900
              lg:hidden
              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-lg
                font-semibold
                text-slate-900
                sm:text-xl
                dark:text-white
              "
            >
              Customer Portal
            </h2>

            <p
              className="
                hidden
                text-xs
                text-slate-500
                sm:block
                dark:text-slate-400
              "
            >
              Manage your vehicle services
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          <ThemeToggle />

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setProfileOpen((prev) => !prev)
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                p-1.5
                transition
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-900
                  text-sm
                  font-semibold
                  text-white
                  dark:bg-white
                  dark:text-slate-900
                "
              >
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "C"}
              </div>

              <div className="hidden text-left sm:block">
                <p
                  className="
                    max-w-[140px]
                    truncate
                    text-sm
                    font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {user?.name || "Customer"}
                </p>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Customer
                </p>
              </div>

              <ChevronDown
                size={16}
                className="
                  hidden
                  text-slate-500
                  sm:block
                  dark:text-slate-400
                "
              />
            </button>

            {profileOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  z-50
                  mt-2
                  w-44
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-1
                  shadow-xl
                  dark:border-slate-700
                  dark:bg-slate-900
                "
                role="menu"
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-medium
                    text-red-500
                    transition
                    hover:bg-red-50
                    dark:text-red-400
                    dark:hover:bg-red-950/40
                  "
                  role="menuitem"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerNavbar;