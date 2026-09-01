import {
  Wrench,
  MapPin,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";

import MechanicStatusBadge from "./MechanicStatusBadge";

const MechanicCard = ({ mechanic, onView }) => {
  const {
    id,
    name,
    status,
    jobsCompleted = 0,
    currentBooking,
    lastBooking,
    location,
    avatar,
  } = mechanic;

  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "M";

  return (
    <div
      className="
        group
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-slate-950/20
        dark:hover:border-slate-600
        dark:hover:shadow-lg
      "
    >
      {/* Top Section */}
      <div className="flex items-start justify-between gap-3">
        {/* Profile */}
        <div className="flex min-w-0 items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={name || "Mechanic"}
              className="
                h-12 w-12
                shrink-0
                rounded-full
                object-cover
                ring-2 ring-slate-100
                dark:ring-slate-700
              "
            />
          ) : (
            <div
              className="
                flex h-12 w-12
                shrink-0
                items-center justify-center
                rounded-full
                bg-slate-900
                text-sm
                font-semibold
                text-white
                ring-4 ring-slate-100
                dark:bg-white
                dark:text-slate-900
                dark:ring-slate-800
              "
            >
              {initials}
            </div>
          )}

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {name || "Unknown Mechanic"}
            </h3>

            <p
              className="
                mt-0.5
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              Mechanic #{id}
            </p>
          </div>
        </div>

        <MechanicStatusBadge status={status} />
      </div>

      {/* Divider */}
      <div
        className="
          my-5
          h-px
          bg-slate-100
          dark:bg-slate-700
        "
      />

      {/* Jobs Completed + Location */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              bg-slate-100
              dark:bg-slate-800
            "
          >
            <Wrench
              size={17}
              className="
                text-slate-600
                dark:text-slate-300
              "
            />
          </div>

          <div>
            <p
              className="
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              Jobs Completed
            </p>

            <p
              className="
                mt-0.5
                text-sm
                font-semibold
                text-slate-800
                dark:text-white
              "
            >
              {Number(jobsCompleted).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {location && (
          <div className="flex max-w-[120px] items-center gap-1.5">
            <MapPin
              size={14}
              className="
                shrink-0
                text-slate-400
                dark:text-slate-500
              "
            />

            <span
              className="
                truncate
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              {location}
            </span>
          </div>
        )}
      </div>

      {/* Current Booking */}
      <div
        className="
          mt-5
          rounded-xl
          border border-slate-100
          bg-slate-50
          p-3.5
          dark:border-slate-700
          dark:bg-slate-800/60
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck
              size={15}
              className="
                text-slate-500
                dark:text-slate-400
              "
            />

            <span
              className="
                text-xs
                font-medium
                text-slate-500
                dark:text-slate-400
              "
            >
              Current Booking
            </span>
          </div>

          {currentBooking ? (
            <span
              className="
                text-xs
                font-semibold
                text-slate-700
                dark:text-slate-200
              "
            >
              #{currentBooking.id}
            </span>
          ) : (
            <span
              className="
                text-xs
                font-medium
                text-slate-400
                dark:text-slate-500
              "
            >
              None
            </span>
          )}
        </div>

        {currentBooking ? (
          <div className="mt-2.5">
            <p
              className="
                truncate
                text-sm
                font-medium
                text-slate-800
                dark:text-slate-100
              "
            >
              {currentBooking.service || "Vehicle Service"}
            </p>

            <p
              className="
                mt-1
                truncate
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              {currentBooking.customer || "Customer"}
            </p>
          </div>
        ) : (
          <p
            className="
              mt-2
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            No active booking assigned
          </p>
        )}
      </div>

      {/* Last Booking */}
      {lastBooking && (
        <div className="mt-3 flex items-center justify-between">
          <span
            className="
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            Last booking
          </span>

          <span
            className="
              text-xs
              font-medium
              text-slate-600
              dark:text-slate-300
            "
          >
            #{lastBooking.id}
          </span>
        </div>
      )}

      {/* View Button */}
      <button
        type="button"
        onClick={() => onView?.(mechanic)}
        className="
          mt-4
          flex w-full
          items-center
          justify-center
          gap-1.5
          rounded-xl
          border border-slate-200
          bg-white
          px-4 py-2.5
          text-xs
          font-semibold
          text-slate-600
          transition
          hover:border-slate-300
          hover:bg-slate-50
          hover:text-slate-900
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-300
          dark:hover:border-slate-600
          dark:hover:bg-slate-800
          dark:hover:text-white
        "
      >
        View Details

        <ChevronRight
          size={15}
          className="
            transition-transform
            duration-200
            group-hover:translate-x-0.5
          "
        />
      </button>
    </div>
  );
};

export default MechanicCard;