import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const CustomerCard = ({ customer, onView }) => {
  const {
    id,
    name,
    email,
    phone,
    address,
    createdAt,
  } = customer;

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "C";

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

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
      {/* ================================
          Profile
      ================================= */}

      <div className="flex items-start gap-3">
        {/* Avatar */}
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

        {/* Name */}
        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate
              text-sm
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {name || "Unknown Customer"}
          </h3>

          <p
            className="
              mt-0.5
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            Customer #{id}
          </p>
        </div>

        <UserRound
          size={17}
          className="
            shrink-0
            text-slate-400
            dark:text-slate-500
          "
        />
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

      {/* ================================
          Contact Information
      ================================= */}

      <div className="space-y-3">
        {/* Email */}
        <div className="flex items-center gap-2.5">
          <Mail
            size={15}
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
              text-slate-600
              dark:text-slate-300
            "
          >
            {email || "No email available"}
          </span>
        </div>

        {/* Phone */}
        {phone && (
          <div className="flex items-center gap-2.5">
            <Phone
              size={15}
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
                text-slate-600
                dark:text-slate-300
              "
            >
              {phone}
            </span>
          </div>
        )}

        {/* Address */}
        {address && (
          <div className="flex items-start gap-2.5">
            <MapPin
              size={15}
              className="
                mt-0.5
                shrink-0
                text-slate-400
                dark:text-slate-500
              "
            />

            <span
              className="
                line-clamp-2
                text-xs
                text-slate-600
                dark:text-slate-300
              "
            >
              {address}
            </span>
          </div>
        )}
      </div>

      {/* ================================
          Registered Date
      ================================= */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          rounded-xl
          border border-slate-100
          bg-slate-50
          px-3.5
          py-3
          dark:border-slate-700
          dark:bg-slate-800/60
        "
      >
        <div className="flex items-center gap-2">
          <CalendarDays
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
            Registered
          </span>
        </div>

        <span
          className="
            text-xs
            font-semibold
            text-slate-700
            dark:text-slate-200
          "
        >
          {formattedDate}
        </span>
      </div>

      {/* ================================
          View Details
      ================================= */}

      <button
        type="button"
        onClick={() => onView?.(customer)}
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

export default CustomerCard;