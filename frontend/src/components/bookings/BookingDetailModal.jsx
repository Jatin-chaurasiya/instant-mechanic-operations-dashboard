import {
  CalendarDays,
  Clock3,
  UserRound,
  CarFront,
  Wrench,
  IndianRupee,
  Hash,
  MapPin,
  Mail,
} from "lucide-react";

import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import StatusBadge from "./StatusBadge";


const DetailItem = ({
  icon: Icon,
  label,
  value,
}) => {

  return (
    <div
      className="
        rounded-xl
        border
        border-slate-100
        bg-slate-50
        p-4
        dark:border-slate-700
        dark:bg-slate-800/60
      "
    >

      <div className="flex items-center gap-2">

        <Icon
          size={15}
          className="
            text-slate-400
            dark:text-slate-500
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
          {label}
        </span>

      </div>


      <p
        className="
          mt-2
          text-sm
          font-semibold
          text-slate-800
          dark:text-slate-200
        "
      >
        {value || "N/A"}
      </p>

    </div>
  );
};


const BookingDetailModal = ({
  isOpen,
  onClose,
  booking,
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
    amount,
    bookingDate,
    bookingTime,
    status,
  } = booking;


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={`Booking #${bookingCode || id}`}
      description="Complete booking information"
    >

      {/* ==========================================
          Header Summary
      ========================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          p-4
          dark:border-slate-700
          dark:bg-slate-800
          sm:flex-row
          sm:items-center
          sm:justify-between
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
            Booking Amount
          </p>

          <div className="mt-1 flex items-center gap-1">

            <IndianRupee
              size={18}
              className="
                text-slate-700
                dark:text-slate-300
              "
            />

            <span
              className="
                text-2xl
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              {Number(
                amount || 0
              ).toLocaleString("en-IN")}
            </span>

          </div>

        </div>


        <StatusBadge status={status} />

      </div>


      {/* ==========================================
          Booking Details
      ========================================== */}

      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
      >

        <DetailItem
          icon={Hash}
          label="Booking ID"
          value={`#${bookingCode || id}`}
        />

        <DetailItem
          icon={UserRound}
          label="Customer"
          value={customerName}
        />

        <DetailItem
          icon={CarFront}
          label="Vehicle"
          value={vehicleName}
        />

        <DetailItem
          icon={MapPin}
          label="Vehicle Number"
          value={vehicleNumber}
        />

        <DetailItem
          icon={Wrench}
          label="Mechanic"
          value={
            mechanicName || "Unassigned"
          }
        />

        <DetailItem
          icon={Wrench}
          label="Service"
          value={serviceName}
        />

        <DetailItem
          icon={CalendarDays}
          label="Booking Date"
          value={bookingDate}
        />

        <DetailItem
          icon={Clock3}
          label="Booking Time"
          value={bookingTime}
        />

      </div>


      {/* ==========================================
          Customer Information
      ========================================== */}

      {customerEmail && (

        <div className="mt-6">

          <h4
            className="
              text-sm
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            Customer Information
          </h4>


          <div className="mt-3">

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-100
                px-4 py-3
                dark:border-slate-700
                dark:bg-slate-800/50
              "
            >

              <Mail
                size={16}
                className="
                  shrink-0
                  text-slate-400
                  dark:text-slate-500
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
                    truncate
                    text-sm
                    font-medium
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  {customerEmail}
                </p>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* ==========================================
          Footer Information
      ========================================== */}

      <div
        className="
          mt-6
          rounded-xl
          border
          border-slate-200
          bg-white
          p-4
          dark:border-slate-700
          dark:bg-slate-800
        "
      >

        <div className="flex flex-wrap items-center gap-2">

          <Badge variant="neutral">
            Service: {serviceName || "N/A"}
          </Badge>

          <Badge variant="neutral">
            Status: {status || "N/A"}
          </Badge>

        </div>

      </div>

    </Modal>
  );
};


export default BookingDetailModal;