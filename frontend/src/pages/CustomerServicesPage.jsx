import { useEffect, useState } from "react";

import useServices from "../hooks/services/useServices";

import ServiceCard from "../components/services/ServiceCard";
import CustomerBookingModal from "../components/customer/CustomerBookingModal";

const CustomerServicesPage = () => {
  const {
    services,
    loading,
    error,
    getPublicServices,
    clearError,
  } = useServices();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    getPublicServices();
  }, [getPublicServices]);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setSelectedService(null);
  };

  const activeServices = services.filter(
    (service) => service.active === true
  );

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Available Services
          </h1>

          <p className="mt-2 text-slate-400">
            Choose a service for your vehicle.
          </p>
        </div>

        <button
          onClick={getPublicServices}
          disabled={loading}
          className="rounded-xl border border-slate-700 px-5 py-3 text-slate-200 transition hover:bg-slate-800 disabled:opacity-50"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-white">
            Services
          </h2>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
            {activeServices.length}
          </span>
        </div>

        <p className="mt-2 text-slate-400">
          Select a service to continue with your booking.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
          <span>{error}</span>

          <button
            onClick={clearError}
            className="text-sm hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {loading && activeServices.length === 0 && (
        <div className="flex justify-center py-20">
          <p className="text-slate-400">
            Loading services...
          </p>
        </div>
      )}

      {!loading &&
        activeServices.length === 0 &&
        !error && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-20 text-center">
            <h3 className="text-xl font-semibold text-white">
              No services available
            </h3>

            <p className="mt-2 text-slate-400">
              There are currently no active services available for booking.
            </p>
          </div>
        )}

      {activeServices.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {activeServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookNow={handleBookNow}
              mode="customer"
            />
          ))}
        </div>
      )}

      {showBookingModal && selectedService && (
        <CustomerBookingModal
          service={selectedService}
          onClose={handleCloseBookingModal}
        />
      )}
    </div>
  );
};

export default CustomerServicesPage;