import {
  UserRound,
  Phone,
  MapPin,
  Wrench,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

const AssignBookingModal = ({
  isOpen,
  onClose,
  booking,

  // ==========================================
  // Data
  // ==========================================

  mechanics = [],

  // ==========================================
  // State from reducer
  // ==========================================

  selectedMechanicId = "",
  loading = false,
  assigning = false,
  error = "",

  // ==========================================
  // Handlers from useBookings
  // ==========================================

  onMechanicSelect,
  onAssign,
}) => {
  // ==========================================
  // Prevent rendering without booking
  // ==========================================

  if (!booking) {
    return null;
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <Modal
      isOpen={isOpen}
      onClose={
        assigning
          ? undefined
          : onClose
      }
      size="lg"
      title="Assign Mechanic"
      description={`Assign a mechanic to booking #${
        booking.bookingCode || booking.id
      }`}
    >
      {/* ==========================================
          Booking Summary
      ========================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          p-4
          dark:border-slate-700
          dark:bg-slate-800
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-xs
                font-medium
                text-slate-500
                dark:text-slate-400
              "
            >
              Booking
            </p>

            <p
              className="
                mt-1
                text-sm
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              #{booking.bookingCode || booking.id}
            </p>
          </div>

          <div className="text-right">
            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Service
            </p>

            <p
              className="
                mt-1
                text-sm
                font-semibold
                text-slate-800
                dark:text-slate-200
              "
            >
              {booking.serviceName || "N/A"}
            </p>
          </div>
        </div>

        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
          "
        >
          <div className="flex items-center gap-2">
            <UserRound
              size={15}
              className="text-slate-400"
            />

            <span
              className="
                text-sm
                text-slate-600
                dark:text-slate-300
              "
            >
              {booking.customerName || "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Wrench
              size={15}
              className="text-slate-400"
            />

            <span
              className="
                text-sm
                text-slate-600
                dark:text-slate-300
              "
            >
              {booking.vehicleName || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================
          Available Mechanics
      ========================================== */}

      <div className="mt-6">
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h3
              className="
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Available Mechanics
            </h3>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Select a mechanic to assign this booking.
            </p>
          </div>

          {!loading && !error && (
            <span
              className="
                rounded-full
                bg-emerald-50
                px-2.5
                py-1
                text-xs
                font-semibold
                text-emerald-700
                dark:bg-emerald-900/30
                dark:text-emerald-400
              "
            >
              {mechanics.length} Available
            </span>
          )}
        </div>

        {/* ========================================
            Error
        ======================================== */}

        {error && (
          <div
            className="
              mt-4
              flex
              items-start
              gap-2
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-3
              text-sm
              text-red-700
              dark:border-red-900/50
              dark:bg-red-900/20
              dark:text-red-400
            "
          >
            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}

        {/* ========================================
            Loading
        ======================================== */}

        {loading && (
          <div
            className="
              flex
              min-h-[180px]
              items-center
              justify-center
            "
          >
            <div className="flex items-center gap-2">
              <Loader2
                size={20}
                className="
                  animate-spin
                  text-slate-500
                "
              />

              <span
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Loading available mechanics...
              </span>
            </div>
          </div>
        )}

        {/* ========================================
            No Mechanics
        ======================================== */}

        {!loading &&
          !error &&
          mechanics.length === 0 && (
            <div
              className="
                mt-4
                rounded-2xl
                border
                border-dashed
                border-slate-300
                p-8
                text-center
                dark:border-slate-700
              "
            >
              <Wrench
                size={28}
                className="
                  mx-auto
                  text-slate-400
                "
              />

              <p
                className="
                  mt-3
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                No mechanics available
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Please try again when a mechanic becomes available.
              </p>
            </div>
          )}

        {/* ========================================
            Mechanics List
        ======================================== */}

        {!loading &&
          !error &&
          mechanics.length > 0 && (
            <div className="mt-4 space-y-3">
              {mechanics.map((mechanic) => {
                const isSelected =
                  Number(selectedMechanicId) ===
                  Number(mechanic.id);

                return (
                  <button
                    key={mechanic.id}
                    type="button"
                    disabled={assigning}
                    onClick={() =>
                      onMechanicSelect?.(
                        String(mechanic.id)
                      )
                    }
                    className={`
                      w-full
                      rounded-2xl
                      border
                      p-4
                      text-left
                      transition

                      ${
                        isSelected
                          ? `
                            border-slate-900
                            bg-slate-50
                            ring-2
                            ring-slate-900/10
                            dark:border-white
                            dark:bg-slate-800
                            dark:ring-white/10
                          `
                          : `
                            border-slate-200
                            bg-white
                            hover:border-slate-300
                            hover:bg-slate-50
                            dark:border-slate-700
                            dark:bg-slate-900
                            dark:hover:border-slate-600
                            dark:hover:bg-slate-800
                          `
                      }

                      ${
                        assigning
                          ? "cursor-not-allowed opacity-60"
                          : ""
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >
                      {/* Avatar */}

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-slate-100
                          text-slate-600
                          dark:bg-slate-800
                          dark:text-slate-300
                        "
                      >
                        <UserRound size={19} />
                      </div>

                      {/* Information */}

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <div>
                            <p
                              className="
                                text-sm
                                font-semibold
                                text-slate-900
                                dark:text-white
                              "
                            >
                              {mechanic.name}
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-xs
                                text-slate-500
                                dark:text-slate-400
                              "
                            >
                              {mechanic.mechanicCode}
                            </p>
                          </div>

                          {isSelected && (
                            <CheckCircle2
                              size={20}
                              className="
                                shrink-0
                                text-slate-900
                                dark:text-white
                              "
                            />
                          )}
                        </div>

                        <div
                          className="
                            mt-3
                            flex
                            flex-wrap
                            gap-x-4
                            gap-y-2
                          "
                        >
                          <span
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              text-slate-500
                              dark:text-slate-400
                            "
                          >
                            <Phone size={13} />
                            {mechanic.phone || "N/A"}
                          </span>

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              text-slate-500
                              dark:text-slate-400
                            "
                          >
                            <MapPin size={13} />
                            {mechanic.location || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
      </div>

      {/* ==========================================
          Footer Actions
      ========================================== */}

      <div
        className="
          mt-6
          flex
          justify-end
          gap-3
          border-t
          border-slate-100
          pt-5
          dark:border-slate-700
        "
      >
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={assigning}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          icon={CheckCircle2}
          loading={assigning}
          disabled={
            loading ||
            assigning ||
            !selectedMechanicId ||
            mechanics.length === 0
          }
          onClick={() =>
            onAssign?.(
              booking,
              Number(selectedMechanicId)
            )
          }
        >
          Assign Mechanic
        </Button>
      </div>
    </Modal>
  );
};

export default AssignBookingModal;