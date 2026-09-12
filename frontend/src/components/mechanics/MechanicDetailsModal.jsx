import {
  UserRound,
  Phone,
  MapPin,
  Wrench,
  Hash,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import mechanicApi from "../../api/mechanicApi";
import MechanicStatusBadge from "./MechanicStatusBadge";

const MechanicDetailsModal = ({
  isOpen,
  onClose,
  mechanicId,
}) => {
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     Load Mechanic Details
  ========================================================= */

  useEffect(() => {
    if (!isOpen || !mechanicId) {
      setMechanic(null);
      setError("");
      return;
    }

    const loadMechanic = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await mechanicApi.getMechanicById(
            mechanicId
          );

        setMechanic(response);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load mechanic details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMechanic();
  }, [isOpen, mechanicId]);

  /* =========================================================
     Close
  ========================================================= */

  const handleClose = () => {
    if (loading) return;

    setMechanic(null);
    setError("");
    onClose?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      title="Mechanic Details"
      description="View complete mechanic information."
    >
      {/* =====================================================
          Loading
      ====================================================== */}

      {loading && (
        <div
          className="
            flex
            min-h-[260px]
            items-center
            justify-center
          "
        >
          <div className="flex flex-col items-center gap-3">
            <Loader2
              size={28}
              className="
                animate-spin
                text-slate-500
                dark:text-slate-400
              "
            />

            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Loading mechanic details...
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          Error
      ====================================================== */}

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
          <div className="flex items-start gap-3">
            <AlertCircle
              size={19}
              className="
                mt-0.5
                shrink-0
                text-red-500
              "
            />

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-red-700
                  dark:text-red-400
                "
              >
                Unable to load mechanic
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-red-600
                  dark:text-red-400
                "
              >
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          Details
      ====================================================== */}

      {!loading && !error && mechanic && (
        <div>
          {/* Profile Header */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4
              dark:border-slate-700
              dark:bg-slate-800/60
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* Avatar */}
              <div
                className="
                  flex
                  h-14 w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-900
                  text-lg
                  font-semibold
                  text-white
                  ring-4
                  ring-white
                  dark:bg-white
                  dark:text-slate-900
                  dark:ring-slate-800
                "
              >
                {mechanic.name
                  ? mechanic.name
                      .split(" ")
                      .map(
                        (word) => word[0]
                      )
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  : "M"}
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
                  {mechanic.name ||
                    "Unknown Mechanic"}
                </h3>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Mechanic #
                  {mechanic.id}
                </p>
              </div>
            </div>

            <MechanicStatusBadge
              status={mechanic.status}
            />
          </div>

          {/* Details */}
          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
            "
          >
            {/* Mechanic Code */}
            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              <div className="flex items-center gap-2">
                <Hash
                  size={16}
                  className="
                    text-slate-400
                    dark:text-slate-500
                  "
                />

                <span
                  className="
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Mechanic Code
                </span>
              </div>

              <p
                className="
                  mt-2
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-white
                "
              >
                {mechanic.mechanicCode ||
                  `#${mechanic.id}`}
              </p>
            </div>

            {/* Jobs Completed */}
            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              <div className="flex items-center gap-2">
                <Wrench
                  size={16}
                  className="
                    text-slate-400
                    dark:text-slate-500
                  "
                />

                <span
                  className="
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Jobs Completed
                </span>
              </div>

              <p
                className="
                  mt-2
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-white
                "
              >
                {Number(
                  mechanic.jobsCompleted || 0
                ).toLocaleString("en-IN")}
              </p>
            </div>

            {/* Phone */}
            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              <div className="flex items-center gap-2">
                <Phone
                  size={16}
                  className="
                    text-slate-400
                    dark:text-slate-500
                  "
                />

                <span
                  className="
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Phone
                </span>
              </div>

              <p
                className="
                  mt-2
                  break-all
                  text-sm
                  font-medium
                  text-slate-800
                  dark:text-white
                "
              >
                {mechanic.phone || "Not available"}
              </p>
            </div>

            {/* Location */}
            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              <div className="flex items-center gap-2">
                <MapPin
                  size={16}
                  className="
                    text-slate-400
                    dark:text-slate-500
                  "
                />

                <span
                  className="
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Location
                </span>
              </div>

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-slate-800
                  dark:text-white
                "
              >
                {mechanic.location ||
                  "Not available"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="
              mt-5
              flex
              justify-end
              border-t
              border-slate-200
              pt-5
              dark:border-slate-700
            "
          >
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              icon={X}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MechanicDetailsModal;