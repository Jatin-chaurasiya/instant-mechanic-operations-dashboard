import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import OverviewPage from "../pages/OverviewPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import BookingsPage from "../pages/BookingsPage";
import MechanicsPage from "../pages/MechanicsPage";
import CustomersPage from "../pages/CustomersPage";
import ProfilePage from "../pages/ProfilePage";
import HelpSupportPage from "../pages/HelpSupportPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/overview" replace />} />

            <Route path="overview" element={<OverviewPage />} />

            <Route path="analytics" element={<AnalyticsPage />} />

            <Route path="bookings" element={<BookingsPage />} />

            <Route path="mechanics" element={<MechanicsPage />} />

            <Route path="customers" element={<CustomersPage />} />

            <Route path="profile" element={<ProfilePage />} />
            <Route path="support" element={<HelpSupportPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
