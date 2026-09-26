import { AlertTriangle } from "lucide-react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

const RejectBookingModal = ({
  isOpen,
  onClose,
  booking,
  reason = "",
  rejecting = false,
  onReasonChange,
  onReject,
}) => {
  if (!booking) {
    return null;
  }

  const handleReject = () => {
    onReject?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={rejecting ? undefined : onClose}
      size="md"
      title="Reject Booking"
      description={`Reject booking #${
        booking.bookingCode || booking.id
      }`}
    >
      <div className="space-y-5">
        <div
          className="
            rounded-2xl
            border
            border-amber-200
            bg-amber-50
            p-4
            dark:border-amber-900/50
            dark:bg-amber-950/30
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-amber-100
                text-amber-600
                dark:bg-amber-900/40
                dark:text-amber-400
              "
            >
              <AlertTriangle size={20} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-sm
                  font-semibold
                  text-amber-900
                  dark:text-amber-300
                "
              >
                Reject this booking?
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-amber-700
                  dark:text-amber-400
                "
              >
                Please provide a reason. The customer will
                be able to see the rejection reason.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="booking-rejection-reason"
              className="
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Rejection Reason
            </label>

            <span
              className="
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              Required
            </span>
          </div>

          <textarea
            id="booking-rejection-reason"
            value={reason}
            onChange={(event) =>
              onReasonChange?.(event.target.value)
            }
            disabled={rejecting}
            rows={5}
            placeholder="Enter the reason for rejecting this booking..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-200
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:border-slate-500
              dark:focus:ring-slate-800
            "
          />

          <p
            className="
              mt-2
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            This reason will be stored with the booking.
          </p>
        </div>

        <div
          className="
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
            disabled={rejecting}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            icon={AlertTriangle}
            loading={rejecting}
            disabled={
              rejecting ||
              !reason?.trim()
            }
            onClick={handleReject}
          >
            Reject Booking
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectBookingModal;