import {
  CarFront,
  UserRound,
  Hash,
  ChevronRight,
  Trash2,
  Loader2,
} from "lucide-react";


const VehicleCard = ({
  vehicle,
  onView,
  onDelete,
  deleting = false,
}) => {

  const {
    id,
    vehicleNumber,
    vehicleModel,
    customerName,
    customerId,
  } = vehicle;


  const initials = vehicleModel
    ? vehicleModel
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "VH";


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

      {/* Vehicle Profile */}

      <div className="flex items-start gap-3">

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
            {vehicleModel ||
              "Unknown Vehicle"}
          </h3>

          <p
            className="
              mt-0.5
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            Vehicle #{id}
          </p>

        </div>


        <CarFront
          size={18}
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


      {/* Vehicle Information */}

      <div className="space-y-3">

        {/* Vehicle Number */}

        <div className="flex items-center gap-2.5">

          <Hash
            size={15}
            className="
              shrink-0
              text-slate-400
              dark:text-slate-500
            "
          />

          <div className="min-w-0">

            <p
              className="
                text-[11px]
                text-slate-400
                dark:text-slate-500
              "
            >
              Vehicle Number
            </p>

            <p
              className="
                truncate
                text-xs
                font-medium
                text-slate-600
                dark:text-slate-300
              "
            >
              {vehicleNumber ||
                "Not available"}
            </p>

          </div>

        </div>


        {/* Customer */}

        <div className="flex items-center gap-2.5">

          <UserRound
            size={15}
            className="
              shrink-0
              text-slate-400
              dark:text-slate-500
            "
          />

          <div className="min-w-0">

            <p
              className="
                text-[11px]
                text-slate-400
                dark:text-slate-500
              "
            >
              Customer
            </p>

            <p
              className="
                truncate
                text-xs
                font-medium
                text-slate-600
                dark:text-slate-300
              "
            >
              {customerName ||
                (customerId
                  ? `Customer #${customerId}`
                  : "Not available")}
            </p>

          </div>

        </div>

      </div>


      {/* =================================
          Actions
      ================================== */}

      <div className="mt-5 flex gap-2">

        {/* View */}

        <button
          type="button"
          onClick={() =>
            onView?.(vehicle)
          }
          disabled={deleting}
          className="
            flex flex-1
            items-center
            justify-center
            gap-1.5
            rounded-xl
            border border-slate-200
            bg-white
            px-3 py-2.5
            text-xs
            font-semibold
            text-slate-600
            transition
            hover:border-slate-300
            hover:bg-slate-50
            hover:text-slate-900
            disabled:cursor-not-allowed
            disabled:opacity-50
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
          />

        </button>


        {/* Delete */}

        <button
          type="button"
          onClick={() =>
            onDelete?.(vehicle)
          }
          disabled={deleting}
          title="Delete Vehicle"
          className="
            flex
            items-center
            justify-center
            gap-1.5
            rounded-xl
            border border-red-200
            bg-white
            px-3
            text-xs
            font-semibold
            text-red-500
            transition
            hover:bg-red-50
            hover:text-red-600
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-red-900/50
            dark:bg-slate-900
            dark:text-red-400
            dark:hover:bg-red-950/30
          "
        >

          {deleting ? (

            <Loader2
              size={16}
              className="animate-spin"
            />

          ) : (

            <Trash2
              size={16}
            />

          )}

        </button>

      </div>

    </div>
  );
};


export default VehicleCard;