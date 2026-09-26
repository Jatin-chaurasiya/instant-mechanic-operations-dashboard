import React, { useState } from "react";
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import useCustomerBooking from "../hooks/bookings/useCustomerBooking";
import CustomerBookingCard from "../components/customer/CustomerBookingCard";
import CustomerBookingDetailsModal from "../components/customer/CustomerBookingDetailsModal";

const CustomerBookingsPage = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const {
    bookings,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    selectedBooking,
    detailsLoading,
    handlePageChange,
    getBookingById,
    resetSelectedBooking,
  } = useCustomerBooking();

  const handleViewDetails = async (bookingId) => {
    setIsDetailsOpen(true);
    await getBookingById(bookingId);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    resetSelectedBooking();
  };

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <CalendarCheck size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                My Bookings
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                View and track all your service bookings
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loading your bookings...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center dark:border-red-500/20 dark:bg-red-500/10">
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
            <CalendarCheck
              size={45}
              className="mx-auto mb-4 text-slate-400"
            />

            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              No Bookings Found
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              You have not created any service bookings yet.
            </p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Bookings:{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {totalItems}
                </span>
              </p>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <CustomerBookingCard
                  key={booking.id}
                  booking={booking}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    handlePageChange(currentPage - 1)
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                >
                  <ChevronLeft size={17} />
                  Previous
                </button>

                <span className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    handlePageChange(currentPage + 1)
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                >
                  Next
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {isDetailsOpen && (
        <CustomerBookingDetailsModal
          booking={selectedBooking}
          loading={detailsLoading}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default CustomerBookingsPage;