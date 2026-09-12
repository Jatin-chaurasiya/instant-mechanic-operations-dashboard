import {
  UserRound,
  CarFront,
  Wrench,
  CalendarDays,
  Clock3,
  IndianRupee,
  Loader2,
  AlertCircle,
} from "lucide-react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

const AddBookingModal = ({
  isOpen,
  onClose,
  onSubmit,

  // ==========================================
  // Data
  // ==========================================

  customers = [],
  vehicles = [],
  services = [],
  mechanics = [],

  // ==========================================
  // Selected IDs
  // ==========================================

  customerId = "",
  vehicleId = "",
  serviceId = "",
  mechanicId = "",

  // ==========================================
  // Booking Fields
  // ==========================================

  bookingDate = "",
  bookingTime = "",
  amount = "",

  // ==========================================
  // Search
  // ==========================================

  customerSearch = "",
  vehicleSearch = "",

  // ==========================================
  // Loading
  // ==========================================

  loadingCustomers = false,
  loadingVehicles = false,
  loadingServices = false,
  loadingMechanics = false,
  submitting = false,

  // ==========================================
  // Error
  // ==========================================

  error = "",

  // ==========================================
  // Handlers
  // ==========================================

  onCustomerSearch,
  onCustomerChange,
  onVehicleSearch,
  onVehicleChange,
  onServiceChange,
  onMechanicChange,
  onBookingDateChange,
  onBookingTimeChange,
  onAmountChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Add New Booking"
      description="Create a vehicle service booking manually."
    >
      <form
        onSubmit={onSubmit}
        className="space-y-6"
      >
        {/* =====================================
            Error
        ====================================== */}

        {error && (
          <div
            className="
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
              dark:bg-red-950/30
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

        {/* =====================================
            Customer Information
        ====================================== */}

        <div>
          <h3
            className="
              mb-4
              text-sm
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            Customer Information
          </h3>

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >
            {/* Customer */}

            <div>
              <label
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Customer
              </label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  value={customerSearch}
                  onChange={onCustomerSearch}
                  placeholder="Search customer..."
                  disabled={submitting}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-sm
                    text-slate-900
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                />
              </div>

              <select
                value={customerId}
                onChange={onCustomerChange}
                disabled={
                  loadingCustomers ||
                  submitting
                }
                required
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-slate-900
                  outline-none
                  focus:border-slate-400
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              >
                <option value="">
                  {loadingCustomers
                    ? "Loading customers..."
                    : customers.length === 0
                      ? "No customers found"
                      : "Select customer"}
                </option>

                {customers.map(
                  (customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Vehicle */}

            <div>
              <label
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Vehicle
              </label>

              <div className="relative">
                <CarFront
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  value={vehicleSearch}
                  onChange={onVehicleSearch}
                  placeholder={
                    customerId
                      ? "Search vehicle..."
                      : "Select customer first"
                  }
                  disabled={
                    !customerId ||
                    submitting
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-sm
                    text-slate-900
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                />
              </div>

              <select
                value={vehicleId}
                onChange={onVehicleChange}
                disabled={
                  !customerId ||
                  loadingVehicles ||
                  submitting
                }
                required
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-slate-900
                  outline-none
                  focus:border-slate-400
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              >
                <option value="">
                  {!customerId
                    ? "Select customer first"
                    : loadingVehicles
                      ? "Loading vehicles..."
                      : vehicles.length === 0
                        ? "No vehicles found"
                        : "Select vehicle"}
                </option>

                {vehicles.map(
                  (vehicle) => (
                    <option
                      key={vehicle.id}
                      value={vehicle.id}
                    >
                      {vehicle.vehicleModel} -{" "}
                      {vehicle.vehicleNumber}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        {/* =====================================
            Service Information
        ====================================== */}

        <div>
          <h3
            className="
              mb-4
              text-sm
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            Service Information
          </h3>

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >
            {/* Service */}

            <div>
              <label
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Service
              </label>

              <div className="relative">
                <Wrench
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <select
                  value={serviceId}
                  onChange={onServiceChange}
                  disabled={
                    loadingServices ||
                    submitting
                  }
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-sm
                    text-slate-900
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                >
                  <option value="">
                    {loadingServices
                      ? "Loading services..."
                      : "Select service"}
                  </option>

                  {services.map(
                    (service) => (
                      <option
                        key={service.id}
                        value={service.id}
                      >
                        {service.serviceName}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Mechanic */}

            <div>
              <label
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Mechanic{" "}
                <span
                  className="
                    text-xs
                    font-normal
                    text-slate-400
                  "
                >
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <Wrench
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <select
                  value={mechanicId}
                  onChange={onMechanicChange}
                  disabled={
                    loadingMechanics ||
                    submitting
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-sm
                    text-slate-900
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                >
                  <option value="">
                    {loadingMechanics
                      ? "Loading mechanics..."
                      : "Assign later"}
                  </option>

                  {mechanics.map(
                    (mechanic) => (
                      <option
                        key={mechanic.id}
                        value={mechanic.id}
                      >
                        {mechanic.name} -{" "}
                        {mechanic.mechanicCode}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Booking Date */}

            <div>
              <label
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Booking Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="date"
                  value={bookingDate}
                  onChange={onBookingDateChange}
                  disabled={submitting}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-sm
                    text-slate-900
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                />
              </div>
            </div>

            {/* Booking Time */}

            <div>
              <label
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Booking Time
              </label>

              <div className="relative">
                <Clock3
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="time"
                  value={bookingTime}
                  onChange={onBookingTimeChange}
                  disabled={submitting}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-sm
                    text-slate-900
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                />
              </div>
            </div>

            {/* Booking Amount */}

            <div className="sm:col-span-2">
              <label
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Booking Amount
              </label>

              <div className="relative">
                <IndianRupee
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="number"
                  value={amount}
                  onChange={onAmountChange}
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                  disabled={submitting}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-sm
                    text-slate-900
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            Footer
        ====================================== */}

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-slate-100
            pt-5
            dark:border-slate-700
            sm:flex-row
            sm:justify-end
          "
        >
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={
              submitting ||
              loadingCustomers ||
              loadingServices ||
              loadingVehicles
            }
          >
            {submitting && (
              <Loader2
                size={16}
                className="mr-2 animate-spin"
              />
            )}

            {submitting
              ? "Creating..."
              : "Create Booking"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBookingModal;