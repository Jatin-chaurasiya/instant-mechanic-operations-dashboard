import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

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

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;