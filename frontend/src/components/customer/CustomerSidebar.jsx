import {
  UserRound,
  Wrench,
  CalendarCheck,
  Car,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navigationItems = [
  {
    name: "Profile",
    path: "/customer/profile",
    icon: UserRound,
  },
  {
    name: "Services",
    path: "/customer/services",
    icon: Wrench,
  },
  {
    name: "Create Booking",
    path: "/customer/createBooking",
    icon: CalendarCheck,
  },
  {
    name: "My Bookings",
    path: "/customer/bookings",
    icon: CalendarCheck,
  },
  {
    name: "My Vehicles",
    path: "/customer/vehicles",
    icon: Car,
  },
];

const CustomerSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <aside
      className="
        flex
        h-screen
        w-64
        flex-col
        border-r
        border-slate-200
        bg-white
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* ==========================================
          Logo
      ========================================== */}

      <div
        className="
          flex
          h-20
          items-center
          border-b
          border-slate-200
          px-6
          dark:border-slate-800
        "
      >
        <div>
          <h1
            className="
              text-xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Instant Mechanic
          </h1>

          <p
            className="
              mt-0.5
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            Customer Portal
          </p>
        </div>
      </div>

      {/* ==========================================
          Navigation
      ========================================== */}

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? `
                        bg-slate-900
                        !text-white
                        shadow-sm

                        dark:bg-white
                        dark:!text-slate-900
                      `
                      : `
                        !text-slate-600
                        hover:bg-slate-100
                        hover:!text-slate-900

                        dark:!text-slate-300
                        dark:hover:bg-slate-800
                        dark:hover:!text-white
                      `
                  }
                `
              }
            >
              <Icon
                size={19}
                className="
                  shrink-0
                  currentColor
                "
              />

              <span
                className="
                  whitespace-nowrap
                  currentColor
                "
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* ==========================================
          Logout
      ========================================== */}

      <div
        className="
          border-t
          border-slate-200
          p-3
          dark:border-slate-800
        "
      >
        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-red-500
            transition

            hover:bg-red-50
            hover:text-red-600

            dark:text-red-400
            dark:hover:bg-red-950/40
            dark:hover:text-red-300
          "
        >
          <LogOut
            size={19}
            className="shrink-0"
          />

          <span className="whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default CustomerSidebar;