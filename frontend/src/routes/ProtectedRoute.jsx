import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const {
    isAuthenticated,
    loading,
    user,
  } = useAuth();

  // Wait for authentication state
  if (loading) {
    return (
      <div
        className="
          flex min-h-screen
          items-center justify-center
          bg-slate-50
          dark:bg-slate-950
        "
      >
        <div
          className="
            h-8 w-8
            animate-spin
            rounded-full
            border-2
            border-slate-200
            border-t-slate-900
            dark:border-slate-700
            dark:border-t-white
          "
        />
      </div>
    );
  }

  // User is not logged in
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // Check whether logged-in user's role is allowed
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    // Admin cannot access Customer routes
    if (user.role === "ADMIN") {
      return (
        <Navigate
          to="/admin/profile"
          replace
        />
      );
    }

    // Customer cannot access Admin routes
    if (user.role === "CUSTOMER") {
      return (
        <Navigate
          to="/customer/profile"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;