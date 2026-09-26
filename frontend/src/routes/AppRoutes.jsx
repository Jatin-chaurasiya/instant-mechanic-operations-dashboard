import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ServicePage from "../pages/ServicePage";

import CustomerProfilePage from "../pages/CustomerProfilePage";
import CustomerServicesPage from "../pages/CustomerServicesPage";
import CustomerBookingsPage from "../pages/CustomerBookingsPage";
import CustomerVehiclesPage from "../pages/CustomerVehiclesPage";
import CustomerCreateBookingPage from "../pages/CustomerCreateBookingPage";

import PublicLayout from "../components/home/PublicLayout";
import CustomerLayout from "../components/customer/CustomerLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import OverviewPage from "../pages/OverviewPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import BookingsPage from "../pages/BookingsPage";
import MechanicsPage from "../pages/MechanicsPage";
import CustomersPage from "../pages/CustomersPage";
import ProfilePage from "../pages/ProfilePage";
import HelpSupportPage from "../pages/HelpSupportPage";
import VehiclesPage from "../pages/VehiclesPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/services" element={<ServicePage mode="public" />} />
        </Route>

        {/* Customer Routes */}
        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route path="/customer" element={<CustomerLayout />}>
            <Route
              index
              element={<Navigate to="/customer/profile" replace />}
            />

            <Route path="profile" element={<CustomerProfilePage />} />

            <Route path="services" element={<CustomerServicesPage />} />

            <Route
              path="/customer/createBooking"
              element={<CustomerCreateBookingPage />}
            />

            <Route path="bookings" element={<CustomerBookingsPage />} />

            <Route path="vehicles" element={<CustomerVehiclesPage />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/admin/overview" replace />} />

            <Route path="overview" element={<OverviewPage />} />

            <Route path="analytics" element={<AnalyticsPage />} />

            <Route path="bookings" element={<BookingsPage />} />

            <Route path="mechanics" element={<MechanicsPage />} />

            <Route path="customers" element={<CustomersPage />} />

            <Route path="vehicles" element={<VehiclesPage />} />

            <Route path="services" element={<ServicePage mode="admin" />} />

            <Route path="profile" element={<ProfilePage />} />

            <Route path="support" element={<HelpSupportPage />} />
          </Route>
        </Route>

        {/* Unknown Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
