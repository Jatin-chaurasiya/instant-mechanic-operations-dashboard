import {
  Menu,
  Bell,
  ChevronDown,
  CircleHelp,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import ThemeToggle from "../theme/ThemeToggle";
import GlobalSearch from "./GlobalSearch";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();

    setProfileOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header
      className="
        sticky top-0 z-30 h-20
        border-b border-slate-200
        bg-white/95
        backdrop-blur
        dark:border-slate-800
        dark:bg-slate-950/95
      "
    >
      <div
        className="
          flex h-full items-center justify-between gap-4
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* Left Section */}

        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Menu */}

          <button
            onClick={onMenuClick}
            className="
              rounded-xl p-2
              text-slate-900
              transition
              hover:bg-slate-100
              dark:text-white
              dark:hover:bg-slate-800
              lg:hidden
            "
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Page Heading */}

          <div className="min-w-0">

            <h2
              className="
                truncate
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
                sm:text-xl
              "
            >
              Operations Dashboard
            </h2>

            <p
              className="
                hidden
                text-xs
                text-slate-500
                dark:text-slate-400
                sm:block
              "
            >
              Monitor your service operations in real time
            </p>

          </div>
        </div>

        {/* Right Section */}

        <div className="flex items-center gap-2 sm:gap-4">

          {/* Global Search */}

          <div className="hidden md:flex">
            <GlobalSearch />
          </div>

          {/* Mobile Search */}

          <div className="md:hidden">
            <GlobalSearch mobile />
          </div>

          {/* Live Status */}

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border border-slate-200
              bg-slate-50
              px-3 py-2
              dark:border-slate-700
              dark:bg-slate-900
              lg:flex
            "
          >

            <span className="relative flex h-2 w-2">

              <span
                className="
                  absolute
                  inline-flex
                  h-full w-full
                  animate-ping
                  rounded-full
                  bg-emerald-400
                  opacity-75
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2 w-2
                  rounded-full
                  bg-emerald-500
                "
              />

            </span>

            <span
              className="
                text-xs
                font-medium
                text-slate-600
                dark:text-slate-300
              "
            >
              Live
            </span>

          </div>

          {/* Theme Toggle */}

          <ThemeToggle />

          {/* Help */}

          <button
            className="
              hidden
              rounded-xl
              p-2.5
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
              sm:block
            "
            aria-label="Help"
          >
            <CircleHelp size={20} />
          </button>

          {/* Notification */}

          <button
            className="
              relative
              rounded-xl
              p-2.5
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span
              className="
                absolute
                right-2 top-2
                h-2 w-2
                rounded-full
                bg-red-500
                ring-2
                ring-white
                dark:ring-slate-950
              "
            />
          </button>

          {/* Divider */}

          <div
            className="
              hidden
              h-8 w-px
              bg-slate-200
              dark:bg-slate-700
              sm:block
            "
          />

          {/* User Profile */}

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

              {/* Avatar */}

              <div
                className="
                  flex
                  h-9 w-9
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
                JD
              </div>

              {/* User Details */}

              <div className="hidden text-left md:block">

                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-800
                    dark:text-white
                  "
                >
                  Operations Admin
                </p>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Administrator
                </p>

              </div>

              <ChevronDown
                size={16}
                className="
                  hidden
                  text-slate-400
                  dark:text-slate-500
                  md:block
                "
              />

            </button>

            {/* Profile Dropdown */}

            {profileOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  z-50
                  mt-2
                  w-48
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-1
                  shadow-lg
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
                    text-red-600
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

export default Navbar;