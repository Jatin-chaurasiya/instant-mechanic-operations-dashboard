import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  BarChart3,
  CalendarCheck,
  Wrench,
  Users,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";

export const navigationItems = [
  {
    name: "Overview",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Bookings",
    path: "/bookings",
    icon: CalendarCheck,
  },
  {
    name: "Mechanics",
    path: "/mechanics",
    icon: Wrench,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
  },
];

const Sidebar = ({ onClose }) => {
  return (
    <aside
      className="
        flex h-full w-64 flex-col
        border-r border-slate-200
        bg-white
        transition-colors duration-200
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      {/* Logo */}
      <div
        className="
          flex h-20 items-center justify-between
          border-b border-slate-200
          px-6
          dark:border-slate-800
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-slate-900
              dark:bg-white
            "
          >
            <Wrench
              size={21}
              className="
                text-white
                dark:text-slate-900
              "
            />
          </div>

          <div>
            <h1
              className="
                text-lg font-bold tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              Instant
            </h1>

            <p
              className="
                text-xs font-medium
                text-slate-500
                dark:text-slate-400
              "
            >
              Mechanic
            </p>
          </div>
        </div>

        {/* Mobile Close */}
        {onClose && (
          <button
            onClick={onClose}
            type="button"
            className="
              rounded-lg p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
              lg:hidden
            "
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p
          className="
            mb-3 px-3
            text-[11px]
            font-semibold
            uppercase
            tracking-wider
            text-slate-400
            dark:text-slate-500
          "
        >
          Main Menu
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                end={item.path === "/"}
                className={({ isActive }) => `
                  group
                  flex items-center gap-3
                  rounded-xl
                  px-3 py-3
                  text-sm font-medium
                  transition-all duration-200

                  ${
                    isActive
                      ? `
                        bg-slate-900
                        shadow-sm
                        dark:bg-white
                      `
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900
                        dark:text-slate-400
                        dark:hover:bg-slate-800
                        dark:hover:text-white
                      `
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2.4 : 2}
                      className={`
                        shrink-0
                        ${
                          isActive
                            ? "text-white dark:text-slate-950"
                            : "text-slate-600 dark:text-slate-400"
                        }
                      `}
                    />

                    <span
                      className={`
                        ${
                          isActive
                            ? "text-white dark:text-slate-950"
                            : "text-slate-600 dark:text-slate-400"
                        }
                      `}
                    >
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div
        className="
          border-t border-slate-200
          p-4
          dark:border-slate-800
        "
      >
        {/* Settings */}
        <button
          type="button"
          className="
            flex w-full items-center gap-3
            rounded-xl
            px-3 py-3
            text-sm font-medium
            text-slate-600
            transition
            hover:bg-slate-100
            hover:text-slate-900
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <Settings size={19} strokeWidth={2} />
          <span>Settings</span>
        </button>

        {/* Help & Support */}
        <NavLink
  to="/support"
  onClick={onClose}
  className={({ isActive }) =>
    isActive
      ? `
        flex w-full items-center gap-3
        rounded-xl
        px-3 py-3
        text-sm font-medium
        bg-slate-900
        text-white
        shadow-sm
        dark:bg-white
        dark:text-slate-950
      `
      : `
        flex w-full items-center gap-3
        rounded-xl
        px-3 py-3
        text-sm font-medium
        text-slate-600
        transition
        hover:bg-slate-100
        hover:text-slate-900
        dark:text-slate-400
        dark:hover:bg-slate-800
        dark:hover:text-white
      `
  }
>
  {({ isActive }) => (
    <>
      <HelpCircle
        size={19}
        strokeWidth={isActive ? 2.4 : 2}
        className={
          isActive
            ? "text-white dark:text-slate-950"
            : "text-slate-600 dark:text-slate-400"
        }
      />

      <span
        className={
          isActive
            ? "text-white dark:text-slate-950"
            : "text-slate-600 dark:text-slate-400"
        }
      >
        Help & Support
      </span>
    </>
  )}
</NavLink>

        {/* Version */}
        <p
          className="
            mt-4 px-3
            text-[11px]
            text-slate-400
            dark:text-slate-600
          "
        >
          Dashboard v1.0.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
