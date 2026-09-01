import {
  X,
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
} from "lucide-react";

const CustomerDetailsModal = ({
  customer,
  loading = false,
  error = null,
  onClose,
}) => {
  if (!customer && !loading && !error) {
    return null;
  }

  const formattedDate = customer?.createdAt
    ? new Date(customer.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";

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
        onClick={(event) => event.stopPropagation()}
      >
        {/* ================================
            Header
        ================================= */}

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
              <UserRound
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
                Customer Details
              </h2>

              {customer?.id && (
                <p
                  className="
                    mt-0.5
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Customer #{customer.id}
                </p>
              )}
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

        {/* ================================
            Content
        ================================= */}

        <div className="p-5">
          {/* Loading */}
          {loading && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className="
                    h-14 w-14
                    animate-pulse
                    rounded-full
                    bg-slate-200
                    dark:bg-slate-700
                  "
                />

                <div className="space-y-2">
                  <div
                    className="
                      h-4 w-32
                      animate-pulse
                      rounded
                      bg-slate-200
                      dark:bg-slate-700
                    "
                  />

                  <div
                    className="
                      h-3 w-24
                      animate-pulse
                      rounded
                      bg-slate-200
                      dark:bg-slate-700
                    "
                  />
                </div>
              </div>

              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="
                      h-12
                      animate-pulse
                      rounded-xl
                      bg-slate-100
                      dark:bg-slate-800
                    "
                  />
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className="
                rounded-xl
                border border-red-200
                bg-red-50
                p-4
                dark:border-red-900/50
                dark:bg-red-950/30
              "
            >
              <p
                className="
                  text-sm
                  font-medium
                  text-red-700
                  dark:text-red-400
                "
              >
                Unable to load customer details.
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-red-600
                  dark:text-red-500
                "
              >
                {error}
              </p>
            </div>
          )}

          {/* Customer Details */}
          {!loading && !error && customer && (
            <div>
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
                  {customer.name
                    ? customer.name
                        .trim()
                        .split(/\s+/)
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "C"}
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
                    {customer.name || "Unknown Customer"}
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Customer #{customer.id}
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
                {/* Email */}
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
                  <Mail
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
                      Email
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-sm
                        font-medium
                        text-slate-700
                        dark:text-slate-200
                      "
                    >
                      {customer.email || "Not available"}
                    </p>
                  </div>
                </div>

                {/* Phone */}
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
                  <Phone
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
                      Phone
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
                      {customer.phone || "Not available"}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div
                  className="
                    flex items-start gap-3
                    rounded-xl
                    border border-slate-100
                    bg-slate-50
                    p-3.5
                    dark:border-slate-700
                    dark:bg-slate-800/60
                  "
                >
                  <MapPin
                    size={17}
                    className="
                      mt-0.5
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
                      Address
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
                      {customer.address || "Not available"}
                    </p>
                  </div>
                </div>

                {/* Registered */}
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
                  <CalendarDays
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
                      Registered
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
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================================
            Footer
        ================================= */}

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

export default CustomerDetailsModal;