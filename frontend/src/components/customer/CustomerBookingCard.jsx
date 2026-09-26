import React from "react";
import {
  CalendarDays,
  Car,
  Clock,
  Eye,
  UserRound,
  Wrench,
  IndianRupee,
  AlertCircle,
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

const CustomerBookingCard = ({ booking, onViewDetails }) => {
  const status = statusConfig[booking.status] || {
    label: booking.status,
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {booking.serviceName || "Service Booking"}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Booking Code:{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {booking.bookingCode}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(booking.id)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <Eye size={16} />
          View Details
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem
          icon={<Wrench size={17} />}
          label="Service"
          value={booking.serviceName || "N/A"}
        />

        <InfoItem
          icon={<Car size={17} />}
          label="Vehicle"
          value={
            booking.vehicleNumber
              ? `${booking.vehicleName || "Vehicle"} (${booking.vehicleNumber})`
              : booking.vehicleName || "N/A"
          }
        />

        <InfoItem
          icon={<CalendarDays size={17} />}
          label="Date"
          value={booking.bookingDate || "N/A"}
        />

        <InfoItem
          icon={<Clock size={17} />}
          label="Time"
          value={booking.bookingTime || "N/A"}
        />
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2">
            <IndianRupee
              size={17}
              className="text-slate-500 dark:text-slate-400"
            />

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Amount
              </p>
              <p className="font-semibold text-slate-900 dark:text-white">
                ₹{Number(booking.amount || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <UserRound
              size={17}
              className="text-slate-500 dark:text-slate-400"
            />

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mechanic
              </p>
              <p className="font-medium text-slate-900 dark:text-white">
                {booking.mechanicName || "Not Assigned"}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Created By:{" "}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {booking.createdBy || "CUSTOMER"}
          </span>
        </p>
      </div>

      {booking.status === "REJECTED" && booking.rejectionReason && (
        <div className="mt-4 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
          />

          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Rejection Reason
            </p>

            <p className="mt-1 text-sm text-red-600 dark:text-red-300">
              {booking.rejectionReason}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
};

export default CustomerBookingCard;