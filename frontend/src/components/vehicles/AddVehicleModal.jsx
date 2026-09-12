import {
  X,
  CarFront,
  UserRound,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";

import customerApi from "../../api/customerApi";

const CUSTOMER_PAGE_SIZE = 5;

const AddVehicleModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleModel: "",
    customerId: "",
  });

  const [customers, setCustomers] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerPage, setCustomerPage] = useState(0);
  const [customerTotalPages, setCustomerTotalPages] = useState(0);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerError, setCustomerError] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);


  // ==========================================
  // Reset Modal
  // ==========================================

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        vehicleNumber: "",
        vehicleModel: "",
        customerId: "",
      });

      setCustomers([]);
      setCustomerSearch("");
      setCustomerPage(0);
      setCustomerTotalPages(0);
      setSelectedCustomer(null);
      setCustomerError("");
    }
  }, [isOpen]);


  // ==========================================
  // Load Customers
  // ==========================================

  const loadCustomers = async (
    page = customerPage,
    keyword = customerSearch
  ) => {
    try {
      setCustomerLoading(true);
      setCustomerError("");

      const response = await customerApi.getCustomers({
        page,
        size: CUSTOMER_PAGE_SIZE,
        keyword: keyword.trim(),
      });

      setCustomers(response?.content || []);
      setCustomerTotalPages(response?.totalPages || 0);
      setCustomerPage(response?.number ?? page);
    } catch (err) {
      setCustomerError(
        err?.response?.data?.message ||
          "Unable to load customers."
      );
    } finally {
      setCustomerLoading(false);
    }
  };


  // ==========================================
  // Load Customers When Modal Opens
  // ==========================================

  useEffect(() => {
    if (isOpen) {
      loadCustomers(0, "");
    }
  }, [isOpen]);


  // ==========================================
  // Handle Input
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ==========================================
  // Customer Search
  // ==========================================

  const handleCustomerSearch = (event) => {
    const value = event.target.value;

    setCustomerSearch(value);
    setCustomerPage(0);

    loadCustomers(0, value);
  };


  // ==========================================
  // Select Customer
  // ==========================================

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);

    setFormData((prev) => ({
      ...prev,
      customerId: customer.id,
    }));
  };


  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.customerId) {
      return;
    }

    await onSubmit({
      vehicleNumber: formData.vehicleNumber.trim(),
      vehicleModel: formData.vehicleModel.trim(),
      customerId: Number(formData.customerId),
    });
  };


  if (!isOpen) {
    return null;
  }


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
          w-full max-w-lg
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
                Add New Vehicle
              </h2>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Register a vehicle for a customer.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              disabled:opacity-50
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>


        {/* =================================
            Form
        ================================== */}

        <form onSubmit={handleSubmit}>

          <div className="space-y-4 p-5">

            {/* Vehicle Number */}

            <div>
              <label
                className="
                  mb-1.5 block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Vehicle Number
              </label>

              <div className="relative">

                <CarFront
                  size={17}
                  className="
                    pointer-events-none
                    absolute left-3.5 top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="e.g. UP16AB1234"
                  required
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-200
                    bg-white
                    pl-10 pr-4
                    text-sm
                    text-slate-700
                    uppercase
                    outline-none
                    transition
                    focus:border-slate-400
                    focus:ring-4
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-200
                  "
                />

              </div>
            </div>


            {/* Vehicle Model */}

            <div>
              <label
                className="
                  mb-1.5 block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Vehicle Model
              </label>

              <div className="relative">

                <CarFront
                  size={17}
                  className="
                    pointer-events-none
                    absolute left-3.5 top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="e.g. Kia Seltos"
                  required
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-200
                    bg-white
                    pl-10 pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition
                    focus:border-slate-400
                    focus:ring-4
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-200
                  "
                />

              </div>
            </div>


            {/* Customer */}

            <div>

              <label
                className="
                  mb-1.5 block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Customer
              </label>

              {selectedCustomer ? (

                <div
                  className="
                    flex items-center justify-between
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-3.5 py-3
                    dark:border-slate-700
                    dark:bg-slate-800/60
                  "
                >
                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        bg-slate-900
                        text-xs
                        font-semibold
                        text-white
                        dark:bg-white
                        dark:text-slate-900
                      "
                    >
                      {selectedCustomer?.name
                        ?.trim()
                        ?.split(/\s+/)
                        ?.map((word) => word[0])
                        ?.slice(0, 2)
                        ?.join("")
                        ?.toUpperCase() || "C"}
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-slate-800
                          dark:text-slate-200
                        "
                      >
                        {selectedCustomer.name}
                      </p>

                      <p
                        className="
                          text-xs
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        Customer #{selectedCustomer.id}
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCustomer(null);

                      setFormData((prev) => ({
                        ...prev,
                        customerId: "",
                      }));
                    }}
                    className="
                      text-xs
                      font-medium
                      text-slate-500
                      hover:text-slate-900
                      dark:text-slate-400
                      dark:hover:text-white
                    "
                  >
                    Change
                  </button>

                </div>

              ) : (

                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border border-slate-200
                    dark:border-slate-700
                  "
                >

                  {/* Search */}

                  <div className="relative">

                    <Search
                      size={16}
                      className="
                        pointer-events-none
                        absolute left-3.5 top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      value={customerSearch}
                      onChange={handleCustomerSearch}
                      placeholder="Search customer..."
                      className="
                        h-10 w-full
                        border-b
                        border-slate-200
                        bg-white
                        pl-10 pr-4
                        text-sm
                        text-slate-700
                        outline-none
                        focus:bg-slate-50
                        dark:border-slate-700
                        dark:bg-slate-800
                        dark:text-slate-200
                      "
                    />

                  </div>


                  {/* Customers */}

                  <div className="max-h-40 overflow-y-auto">

                    {customerLoading ? (

                      <div
                        className="
                          flex items-center
                          justify-center
                          gap-2
                          px-4 py-6
                          text-xs
                          text-slate-400
                        "
                      >
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Loading customers...
                      </div>

                    ) : customerError ? (

                      <div
                        className="
                          px-4 py-6
                          text-center
                          text-xs
                          text-red-500
                        "
                      >
                        {customerError}
                      </div>

                    ) : customers.length === 0 ? (

                      <div
                        className="
                          px-4 py-6
                          text-center
                          text-xs
                          text-slate-400
                        "
                      >
                        No customers found.
                      </div>

                    ) : (

                      customers.map((customer) => (

                        <button
                          key={customer.id}
                          type="button"
                          onClick={() =>
                            handleCustomerSelect(customer)
                          }
                          className="
                            flex w-full
                            items-center gap-3
                            border-b
                            border-slate-100
                            px-3.5 py-2.5
                            text-left
                            transition
                            hover:bg-slate-50
                            dark:border-slate-700
                            dark:hover:bg-slate-800
                          "
                        >

                          <div
                            className="
                              flex h-8 w-8
                              shrink-0
                              items-center justify-center
                              rounded-full
                              bg-slate-900
                              text-[10px]
                              font-semibold
                              text-white
                              dark:bg-white
                              dark:text-slate-900
                            "
                          >
                            {customer.name
                              ?.trim()
                              ?.split(/\s+/)
                              ?.map((word) => word[0])
                              ?.slice(0, 2)
                              ?.join("")
                              ?.toUpperCase() || "C"}
                          </div>

                          <div className="min-w-0">

                            <p
                              className="
                                truncate
                                text-sm
                                font-medium
                                text-slate-700
                                dark:text-slate-200
                              "
                            >
                              {customer.name}
                            </p>

                            <p
                              className="
                                text-xs
                                text-slate-400
                                dark:text-slate-500
                              "
                            >
                              Customer #{customer.id}
                            </p>

                          </div>

                        </button>

                      ))

                    )}

                  </div>


                  {/* Customer Pagination */}

                  {customerTotalPages > 1 && (

                    <div
                      className="
                        flex items-center
                        justify-between
                        border-t
                        border-slate-100
                        px-3 py-2
                        dark:border-slate-700
                      "
                    >

                      <button
                        type="button"
                        disabled={customerPage === 0}
                        onClick={() =>
                          loadCustomers(
                            customerPage - 1,
                            customerSearch
                          )
                        }
                        className="
                          rounded-lg
                          p-1.5
                          text-slate-500
                          hover:bg-slate-100
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                          dark:hover:bg-slate-700
                        "
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <span
                        className="
                          text-xs
                          font-medium
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        Page {customerPage + 1} of{" "}
                        {customerTotalPages}
                      </span>

                      <button
                        type="button"
                        disabled={
                          customerPage >=
                          customerTotalPages - 1
                        }
                        onClick={() =>
                          loadCustomers(
                            customerPage + 1,
                            customerSearch
                          )
                        }
                        className="
                          rounded-lg
                          p-1.5
                          text-slate-500
                          hover:bg-slate-100
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                          dark:hover:bg-slate-700
                        "
                      >
                        <ChevronRight size={16} />
                      </button>

                    </div>

                  )}

                </div>

              )}

            </div>


            {/* Error */}

            {error && (

              <div
                className="
                  rounded-xl
                  border border-red-200
                  bg-red-50
                  px-4 py-3
                  text-sm
                  text-red-700
                  dark:border-red-900/50
                  dark:bg-red-950/30
                  dark:text-red-400
                "
              >
                {error}
              </div>

            )}

          </div>


          {/* =================================
              Footer
          ================================== */}

          <div
            className="
              flex justify-end gap-3
              border-t
              border-slate-100
              px-5 py-4
              dark:border-slate-700
            "
          >

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                border border-slate-200
                bg-white
                px-4 py-2.5
                text-sm
                font-medium
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !formData.customerId
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-900
                px-5 py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:bg-white
                dark:text-slate-900
              "
            >

              {loading && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Adding..."
                : "Add Vehicle"}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddVehicleModal;