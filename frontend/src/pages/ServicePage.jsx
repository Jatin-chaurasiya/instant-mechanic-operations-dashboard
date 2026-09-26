import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useServices from "../hooks/services/useServices";
import { useAuth } from "../context/AuthContext";

import ServiceCard from "../components/services/ServiceCard";
import ServiceModal from "../components/services/ServiceModal";
import CustomerBookingModal from "../components/customer/CustomerBookingModal";
import PublicAuthModal from "../components/auth/PublicAuthModal";

const ServicePage = ({ mode = "admin" }) => {
  const isPublic = mode === "public";

  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();

  const {
    services,
    loading,
    error,
    getServices,
    getPublicServices,
    createService,
    updateService,
    activateService,
    deactivateService,
    clearError,
  } = useServices();

  // Admin service modal
  const [showModal, setShowModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // Public login/register modal
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (isPublic) {
      getPublicServices();
    } else {
      getServices();
    }
  }, [isPublic, getServices, getPublicServices]);

  // Admin only
  const handleAddService = () => {
    setSelectedService(null);
    setShowModal(true);
  };

  // Admin only
  const handleEditService = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  // Admin only
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
    clearError();
  };

  // Admin only
  const handleSubmitService = async (serviceData) => {
    if (selectedService) {
      await updateService(selectedService.id, serviceData);
    } else {
      await createService(serviceData);
    }

    handleCloseModal();
  };

  // Admin only
  const handleActivate = async (serviceId) => {
    await activateService(serviceId);
  };

  // Admin only
  const handleDeactivate = async (serviceId) => {
    await deactivateService(serviceId);
  };

  // Public only
  const handleBookNow = (service) => {
    if (!isAuthenticated) {
      toast.info("Please login first.");

      setTimeout(() => {
        setShowAuthModal(true);
      }, 800);

      return;
    }

    if (user?.role !== "CUSTOMER") {
      toast.info("Only customers can create bookings.");
      return;
    }

    setBookingService(service);
    setShowBookingModal(true);
  };
  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setBookingService(null);
  };

  const getPageTitle = () => {
    if (isPublic) {
      return "Our Services";
    }

    return "Services";
  };

  const getPageDescription = () => {
    if (isPublic) {
      return "Explore our available vehicle services.";
    }

    return "Manage and monitor all mechanic services.";
  };

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{getPageTitle()}</h1>

          <p className="mt-2 text-slate-400">{getPageDescription()}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={isPublic ? getPublicServices : getServices}
            disabled={loading}
            className="rounded-xl border border-slate-700 px-5 py-3 text-slate-200 transition hover:bg-slate-800 disabled:opacity-50"
          >
            ↻ Refresh
          </button>

          {!isPublic && (
            <button
              onClick={handleAddService}
              className="rounded-xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-100"
            >
              + Add Service
            </button>
          )}
        </div>
      </div>

      {/* Service Count */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-white">
            {isPublic ? "Available Services" : "Services"}
          </h2>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
            {services.length}
          </span>
        </div>

        <p className="mt-2 text-slate-400">
          {isPublic
            ? "Choose a service for your vehicle."
            : "View and manage available mechanic services."}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
          <span>{error}</span>

          <button onClick={clearError} className="text-sm hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && services.length === 0 && (
        <div className="flex justify-center py-20">
          <p className="text-slate-400">Loading services...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && services.length === 0 && !error && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-20 text-center">
          <h3 className="text-xl font-semibold text-white">
            No services found
          </h3>

          <p className="mt-2 text-slate-400">
            {isPublic
              ? "No services are currently available."
              : "Add your first mechanic service."}
          </p>

          {!isPublic && (
            <button
              onClick={handleAddService}
              className="mt-5 rounded-xl bg-white px-5 py-3 font-medium text-slate-900"
            >
              + Add Service
            </button>
          )}
        </div>
      )}

      {/* Services Grid */}
      {services.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={!isPublic ? handleEditService : undefined}
              onActivate={!isPublic ? handleActivate : undefined}
              onDeactivate={!isPublic ? handleDeactivate : undefined}
              onBookNow={
                isPublic || mode === "customer" ? handleBookNow : undefined
              }
              mode={mode}
            />
          ))}
        </div>
      )}

      {/* Admin Add/Edit Modal */}
      {!isPublic && showModal && (
        <ServiceModal
          service={selectedService}
          onClose={handleCloseModal}
          onSubmit={handleSubmitService}
          loading={loading}
          error={error}
        />
      )}

      {/* Public Login/Register Modal */}
      {isPublic && showAuthModal && (
        <PublicAuthModal onClose={() => setShowAuthModal(false)} />
      )}

      {(isPublic || mode === "customer") &&
        showBookingModal &&
        bookingService && (
          <CustomerBookingModal
            service={bookingService}
            onClose={handleCloseBookingModal}
          />
        )}
    </div>
  );
};

export default ServicePage;
