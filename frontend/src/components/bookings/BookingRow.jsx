import {
  CarFront,
  UserRound,
  Wrench,
  Eye,
  UserRoundPlus,
  Trash2,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

const BookingRow = ({
  booking,
  onView,

  // Actions
  showAssign = false,
  showDelete = false,
  onAssign,
  onDelete,
}) => {

  if (!booking) {
    return null;
  }

  const {
    id,
    bookingCode,
    customerName,
    customerEmail,
    vehicleName,
    vehicleNumber,
    serviceName,
    mechanicName,
    status,
    amount,
    bookingDate,
    bookingTime,
  } = booking;


  return (
    <tr
      className="
        group
        border-b border-slate-100
        transition
        hover:bg-slate-50/80
        dark:border-slate-800
        dark:hover:bg-slate-800/50
      "
    >

      {/* ==========================================
          Booking ID
      ========================================== */}

      <td className="whitespace-nowrap px-5 py-4 sm:px-6">

        <span
          className="
            text-sm
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          #{bookingCode || id}
        </span>

      </td>


      {/* ==========================================
          Customer
      ========================================== */}

      <td className="px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              bg-slate-100
              text-slate-600
              dark:bg-slate-800
              dark:text-slate-300
            "
          >
            <UserRound size={16} />
          </div>

          <div className="min-w-0">

            <p
              className="
                truncate
                text-sm
                font-medium
                text-slate-800
                dark:text-slate-200
              "
            >
              {customerName || "Unknown"}
            </p>

            {customerEmail && (
              <p
                className="
                  truncate
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                "
              >
                {customerEmail}
              </p>
            )}

          </div>

        </div>

      </td>


      {/* ==========================================
          Vehicle
      ========================================== */}

      <td className="px-5 py-4 sm:px-6">

        <div className="flex items-center gap-2.5">

          <CarFront
            size={17}
            className="
              shrink-0
              text-slate-400
              dark:text-slate-500
            "
          />

          <div className="min-w-0">

            <p
              className="
                truncate
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              {vehicleName || "N/A"}
            </p>

            {vehicleNumber && (
              <p
                className="
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                "
              >
                {vehicleNumber}
              </p>
            )}

          </div>

        </div>

      </td>


      {/* ==========================================
          Service
      ========================================== */}

      <td className="px-5 py-4 sm:px-6">

        <span
          className="
            text-sm
            text-slate-600
            dark:text-slate-300
          "
        >
          {serviceName || "N/A"}
        </span>

      </td>


      {/* ==========================================
          Mechanic
      ========================================== */}

      <td className="px-5 py-4 sm:px-6">

        <div className="flex items-center gap-2.5">

          <div
            className="
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-lg
              bg-slate-100
              dark:bg-slate-800
            "
          >
            <Wrench
              size={15}
              className="
                text-slate-500
                dark:text-slate-400
              "
            />
          </div>

          <span
            className="
              whitespace-nowrap
              text-sm
              text-slate-600
              dark:text-slate-300
            "
          >
            {mechanicName || "Unassigned"}
          </span>

        </div>

      </td>


      {/* ==========================================
          Status
      ========================================== */}

      <td className="px-5 py-4 sm:px-6">

        <StatusBadge status={status} />

      </td>


      {/* ==========================================
          Amount
      ========================================== */}

      <td className="whitespace-nowrap px-5 py-4 sm:px-6">

        <span
          className="
            text-sm
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          ₹
          {Number(amount || 0).toLocaleString("en-IN")}
        </span>

      </td>


      {/* ==========================================
          Date / Time
      ========================================== */}

      <td className="whitespace-nowrap px-5 py-4 sm:px-6">

        <p
          className="
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          {bookingDate || "N/A"}
        </p>

        {bookingTime && (
          <p
            className="
              mt-0.5
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            {bookingTime}
          </p>
        )}

      </td>


      {/* ==========================================
          Actions
      ========================================== */}

      <td className="px-5 py-4 sm:px-6">

        <div className="flex items-center gap-1.5">

          {/* View */}

          <button
            type="button"
            onClick={() => onView?.(booking)}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-200
              hover:text-slate-900
              dark:hover:bg-slate-700
              dark:hover:text-white
            "
            aria-label={`View booking ${
              bookingCode || id
            }`}
            title="View Booking"
          >
            <Eye size={17} />
          </button>


          {/* ======================================
              Assign Mechanic
              Only Pending Section
          ====================================== */}

          {showAssign && (
            <button
              type="button"
              onClick={() => onAssign?.(booking)}
              className="
                rounded-lg
                p-2
                text-blue-500
                transition
                hover:bg-blue-50
                hover:text-blue-700
                dark:hover:bg-blue-950/40
                dark:hover:text-blue-400
              "
              aria-label={`Assign mechanic to booking ${
                bookingCode || id
              }`}
              title="Assign Mechanic"
            >
              <UserRoundPlus size={17} />
            </button>
          )}


          {/* ======================================
              Delete Booking
              Only All Bookings Section
          ====================================== */}

          {showDelete && (
            <button
              type="button"
              onClick={() => onDelete?.(booking)}
              className="
                rounded-lg
                p-2
                text-red-400
                transition
                hover:bg-red-50
                hover:text-red-600
                dark:hover:bg-red-950/40
                dark:hover:text-red-400
              "
              aria-label={`Delete booking ${
                bookingCode || id
              }`}
              title="Delete Booking"
            >
              <Trash2 size={17} />
            </button>
          )}

        </div>

      </td>

    </tr>
  );
};

export default BookingRow;