import React from "react";
import {
  X,
  CalendarDays,
  Clock,
  Car,
  Wrench,
  UserRound,
  Mail,
  IndianRupee,
  AlertCircle,
  Hash,
} from "lucide-react";

const statusConfig = {
  PENDING: {
    label: "Pending Approval",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  },
  ASSIGNED: {
    label: "Confirmed",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  },
  ON_THE_WAY: {
    label: "On The Way",
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  },
  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
  },
  REJECTED: {
    label: "Rejected",
    className:
      "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  },
};

const CustomerBookingDetailsModal = ({
  booking,
  loading,
  onClose,
}) => {
  if (!booking && !loading) {
    return null;
  }

  const status = statusConfig[booking?.status] || {
    label: booking?.status || "Unknown",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Booking Details
            </h2>

            {booking?.bookingCode && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {booking.bookingCode}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loading booking details...
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900/50">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Booking Status
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Created By
                </p>

                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {booking.createdBy || "CUSTOMER"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem
                icon={<Hash size={18} />}
                label="Booking Code"
                value={booking.bookingCode}
              />

              <DetailItem
                icon={<Wrench size={18} />}
                label="Service"
                value={booking.serviceName || "N/A"}
              />

              <DetailItem
                icon={<Car size={18} />}
                label="Vehicle"
                value={
                  booking.vehicleNumber
                    ? `${booking.vehicleName || "Vehicle"} (${booking.vehicleNumber})`
                    : booking.vehicleName || "N/A"
                }
              />

              <DetailItem
                icon={<CalendarDays size={18} />}
                label="Booking Date"
                value={booking.bookingDate || "N/A"}
              />

              <DetailItem
                icon={<Clock size={18} />}
                label="Booking Time"
                value={booking.bookingTime || "N/A"}
              />

              <DetailItem
                icon={<IndianRupee size={18} />}
                label="Amount"
                value={`₹${Number(
                  booking.amount || 0
                ).toLocaleString("en-IN")}`}
              />

              <DetailItem
                icon={<UserRound size={18} />}
                label="Customer"
                value={booking.customerName || "N/A"}
              />

              <DetailItem
                icon={<Mail size={18} />}
                label="Customer Email"
                value={booking.customerEmail || "N/A"}
              />

              <DetailItem
                icon={<UserRound size={18} />}
                label="Mechanic"
                value={booking.mechanicName || "Not Assigned"}
              />
            </div>

            {booking.status === "REJECTED" &&
              booking.rejectionReason && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
                  <div className="flex gap-3">
                    <AlertCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
                    />

                    <div>
                      <h3 className="font-semibold text-red-700 dark:text-red-400">
                        Rejection Reason
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-red-600 dark:text-red-300">
                        {booking.rejectionReason}
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}

        <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/40">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-semibold text-slate-900 dark:text-white">
            {value || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingDetailsModal;