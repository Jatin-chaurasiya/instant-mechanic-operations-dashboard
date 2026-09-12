import {
  X,
  CarFront,
  UserRound,
  Hash,
} from "lucide-react";

const VehicleDetailsModal = ({
  vehicle,
  onClose,
}) => {

  if (!vehicle) {
    return null;
  }

  const {
    id,
    vehicleNumber,
    vehicleModel,
    customerName,
    customerId,
  } = vehicle;


  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >

      <div
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-xl
          dark:border-slate-700
          dark:bg-slate-900
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* =================================
            Header
        ================================== */}

        <div
          className="
            flex items-center justify-between
            border-b border-slate-100
            px-5 py-4
            dark:border-slate-700
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-slate-900
                dark:bg-white
              "
            >
              <CarFront
                size={18}
                className="
                  text-white
                  dark:text-slate-900
                "
              />
            </div>

            <div>

              <h2
                className="
                  text-base
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                Vehicle Details
              </h2>

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

          </div>


          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            aria-label="Close"
          >
            <X size={18} />
          </button>

        </div>


        {/* =================================
            Content
        ================================== */}

        <div className="p-5">

          {/* Profile */}

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-14 w-14
                shrink-0
                items-center justify-center
                rounded-full
                bg-slate-900
                text-base
                font-semibold
                text-white
                ring-4 ring-slate-100
                dark:bg-white
                dark:text-slate-900
                dark:ring-slate-800
              "
            >
              {vehicleModel
                ?.trim()
                ?.split(/\s+/)
                ?.map((word) => word[0])
                ?.slice(0, 2)
                ?.join("")
                ?.toUpperCase() || "VH"}
            </div>

            <div className="min-w-0">

              <h3
                className="
                  truncate
                  text-base
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


          {/* Information */}

          <div className="space-y-3">

            {/* Vehicle Number */}

            <div
              className="
                flex items-center gap-3
                rounded-xl
                border border-slate-100
                bg-slate-50
                p-3.5
                dark:border-slate-700
                dark:bg-slate-800/60
              "
            >

              <Hash
                size={17}
                className="
                  shrink-0
                  text-slate-500
                  dark:text-slate-400
                "
              />

              <div className="min-w-0">

                <p
                  className="
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Vehicle Number
                </p>

                <p
                  className="
                    mt-0.5
                    text-sm
                    font-medium
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  {vehicleNumber ||
                    "Not available"}
                </p>

              </div>

            </div>


            {/* Model */}

            <div
              className="
                flex items-center gap-3
                rounded-xl
                border border-slate-100
                bg-slate-50
                p-3.5
                dark:border-slate-700
                dark:bg-slate-800/60
              "
            >

              <CarFront
                size={17}
                className="
                  shrink-0
                  text-slate-500
                  dark:text-slate-400
                "
              />

              <div className="min-w-0">

                <p
                  className="
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Vehicle Model
                </p>

                <p
                  className="
                    mt-0.5
                    text-sm
                    font-medium
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  {vehicleModel ||
                    "Not available"}
                </p>

              </div>

            </div>


            {/* Customer */}

            <div
              className="
                flex items-center gap-3
                rounded-xl
                border border-slate-100
                bg-slate-50
                p-3.5
                dark:border-slate-700
                dark:bg-slate-800/60
              "
            >

              <UserRound
                size={17}
                className="
                  shrink-0
                  text-slate-500
                  dark:text-slate-400
                "
              />

              <div className="min-w-0">

                <p
                  className="
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Customer
                </p>

                <p
                  className="
                    mt-0.5
                    text-sm
                    font-medium
                    text-slate-700
                    dark:text-slate-200
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

        </div>


        {/* Footer */}

        <div
          className="
            flex justify-end
            border-t border-slate-100
            px-5 py-4
            dark:border-slate-700
          "
        >

          <button
            type="button"
            onClick={onClose}
            className="
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
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default VehicleDetailsModal;