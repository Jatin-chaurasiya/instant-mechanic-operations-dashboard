import {
  X,
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

const MobileCustomerSidebar = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();

    navigate("/", {
      replace: true,
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="
          fixed
          inset-0
          z-40
          bg-black/60
          backdrop-blur-sm
          lg:hidden
        "
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className="
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-72
          flex-col
          border-r
          border-slate-800
          bg-slate-900
          shadow-2xl
          lg:hidden
        "
      >
        {/* Header */}
        <div
          className="
            flex
            h-20
            items-center
            justify-between
            border-b
            border-slate-800
            px-5
          "
        >
          <div>
            <h1 className="text-lg font-bold text-white">
              Instant Mechanic
            </h1>

            <p className="text-xs text-slate-400">
              Customer Portal
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
            "
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-white text-slate-900"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                  `
                }
              >
                <Icon size={19} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-3">
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
              text-red-400
              transition
              hover:bg-red-950/40
              hover:text-red-300
            "
          >
            <LogOut size={19} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileCustomerSidebar;