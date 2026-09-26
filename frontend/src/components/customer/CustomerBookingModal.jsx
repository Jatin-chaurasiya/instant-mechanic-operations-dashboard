import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CarFront,
  CreditCard,
  Wrench,
  X,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useCustomerBooking from "../../hooks/bookings/useCustomerBooking";
import useCustomerPayment from "../../hooks/payments/useCustomerPayment";
import useCustomerVehicles from "../../hooks/vehicles/useCustomerVehicles";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.onload = () => resolve(true);
      existingScript.onerror = () => resolve(false);
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const CustomerBookingModal = ({
  service,
  onClose,
}) => {
  const navigate = useNavigate();

  const {
    selectedService,
    selectedVehicle,
    bookingDate,
    bookingTime,
    submitting,
    submitError,

    setSelectedService,
    setSelectedVehicle,
    setBookingDate,
    setBookingTime,

    createCustomerBooking,
    resetCreateForm,
  } = useCustomerBooking();

  const {
    vehicles,
    loading: vehiclesLoading,
    loadVehicles,
  } = useCustomerVehicles();

  const {
    paymentMethod,
    cashLoading,
    orderLoading,
    verifying,

    setPaymentMethod,
    createCashPayment,
    createRazorpayOrder,
    verifyRazorpayPayment,
  } = useCustomerPayment();

  const [processingPayment, setProcessingPayment] =
    useState(false);

  useEffect(() => {
    if (service) {
      setSelectedService(service);
    }

    loadVehicles(1, "");

    return () => {
      resetCreateForm();
    };
  }, [
    service,
    setSelectedService,
    loadVehicles,
    resetCreateForm,
  ]);

  const handleVehicleChange = (event) => {
    const vehicleId = Number(event.target.value);

    const vehicle = vehicles.find(
      (item) => Number(item.id) === vehicleId
    );

    setSelectedVehicle(vehicle || null);
  };

  const handleAddVehicle = () => {
    onClose();

    navigate("/customer/vehicles");
  };

  const validateForm = () => {
    if (!selectedService?.id) {
      toast.error("Service information is missing.");
      return false;
    }

    if (!selectedVehicle?.id) {
      toast.error("Please select a vehicle.");
      return false;
    }

    if (!bookingDate) {
      toast.error("Please select a booking date.");
      return false;
    }

    if (!bookingTime) {
      toast.error("Please select a booking time.");
      return false;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return false;
    }

    return true;
  };

  const handleCashPayment = async (booking) => {
    const payment = await createCashPayment(
      booking.id
    );

    if (!payment) {
      return false;
    }

    toast.success(
      "Booking created. Cash payment is pending."
    );

    onClose();

    navigate("/customer/bookings", {
      replace: true,
    });

    return true;
  };

  const handleOnlinePayment = async (booking) => {
    const razorpayLoaded =
      await loadRazorpayScript();

    if (!razorpayLoaded) {
      toast.error(
        "Unable to load Razorpay Checkout."
      );

      setProcessingPayment(false);

      return false;
    }

    const order =
      await createRazorpayOrder(booking.id);

    if (!order) {
      setProcessingPayment(false);
      return false;
    }

    const options = {
      key: order.razorpayKeyId,

      amount: Math.round(
        Number(order.amount) * 100
      ),

      currency: order.currency || "INR",

      name: "Instant Mechanic",

      description: `Booking ${booking.bookingCode}`,

      order_id: order.razorpayOrderId,

      handler: async (response) => {
        const verification =
          await verifyRazorpayPayment({
            razorpayOrderId:
              response.razorpay_order_id,

            razorpayPaymentId:
              response.razorpay_payment_id,

            razorpaySignature:
              response.razorpay_signature,
          });

        if (!verification) {
          setProcessingPayment(false);
          return;
        }

        toast.success(
          "Payment successful! Booking created successfully."
        );

        onClose();

        navigate("/customer/bookings", {
          replace: true,
        });
      },

      modal: {
        ondismiss: () => {
          setProcessingPayment(false);

          toast.info(
            "Payment window closed."
          );
        },
      },

      theme: {
        color: "#0f172a",
      },
    };

    const razorpay = new window.Razorpay(
      options
    );

    razorpay.on(
      "payment.failed",
      (response) => {
        setProcessingPayment(false);

        toast.error(
          response?.error?.description ||
            "Payment failed."
        );
      }
    );

    razorpay.open();

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setProcessingPayment(true);

    try {
      const booking =
        await createCustomerBooking();

      if (!booking) {
        setProcessingPayment(false);
        return;
      }

      if (paymentMethod === "CASH") {
        await handleCashPayment(booking);
        return;
      }

      if (paymentMethod === "ONLINE") {
        await handleOnlinePayment(booking);
      }
    } catch (error) {
      setProcessingPayment(false);
    }
  };

  const isProcessing =
    submitting ||
    cashLoading ||
    orderLoading ||
    verifying ||
    processingPayment;

  const today = new Date()
    .toISOString()
    .split("T")[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={isProcessing ? undefined : onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Book Service
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Complete your booking details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >
          {submitError && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {submitError}
            </div>
          )}

          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                <Wrench size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Selected Service
                </p>

                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {selectedService?.serviceName ||
                    service?.serviceName ||
                    "Service"}
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {selectedService?.category ||
                    service?.category ||
                    "Vehicle Service"}
                </p>
              </div>

              <div className="ml-auto text-right">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Amount
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  ₹
                  {Number(
                    selectedService?.price ||
                      service?.price ||
                      0
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="bookingVehicle"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              <CarFront size={17} />
              Select Vehicle
            </label>

            {vehiclesLoading ? (
              <div className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                Loading vehicles...
              </div>
            ) : vehicles.length > 0 ? (
              <select
                id="bookingVehicle"
                value={selectedVehicle?.id || ""}
                onChange={handleVehicleChange}
                disabled={isProcessing}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="">
                  Select a vehicle
                </option>

                {vehicles.map((vehicle) => (
                  <option
                    key={vehicle.id}
                    value={vehicle.id}
                  >
                    {vehicle.vehicleModel} -{" "}
                    {vehicle.vehicleNumber}
                  </option>
                ))}
              </select>
            ) : (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  You need to add a vehicle before
                  creating a booking.
                </p>

                <button
                  type="button"
                  onClick={handleAddVehicle}
                  disabled={isProcessing}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900"
                >
                  <Plus size={16} />
                  Add Vehicle
                </button>
              </div>
            )}
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="modalBookingDate"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <CalendarCheck size={17} />
                Booking Date
              </label>

              <input
                id="modalBookingDate"
                type="date"
                min={today}
                value={bookingDate}
                onChange={(event) =>
                  setBookingDate(
                    event.target.value
                  )
                }
                disabled={isProcessing}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="modalBookingTime"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Booking Time
              </label>

              <input
                id="modalBookingTime"
                type="time"
                value={bookingTime}
                onChange={(event) =>
                  setBookingTime(
                    event.target.value
                  )
                }
                disabled={isProcessing}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <CreditCard size={17} />
              Payment Method
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setPaymentMethod("CASH")
                }
                disabled={isProcessing}
                className={`rounded-xl border p-4 text-left transition ${
                  paymentMethod === "CASH"
                    ? "border-slate-900 bg-slate-100 dark:border-white dark:bg-slate-800"
                    : "border-slate-200 hover:border-slate-400 dark:border-slate-700"
                }`}
              >
                <p className="font-semibold text-slate-900 dark:text-white">
                  Cash
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Pay cash when the service is completed.
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setPaymentMethod("ONLINE")
                }
                disabled={isProcessing}
                className={`rounded-xl border p-4 text-left transition ${
                  paymentMethod === "ONLINE"
                    ? "border-slate-900 bg-slate-100 dark:border-white dark:bg-slate-800"
                    : "border-slate-200 hover:border-slate-400 dark:border-slate-700"
                }`}
              >
                <p className="font-semibold text-slate-900 dark:text-white">
                  Online Payment
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Pay securely using Razorpay.
                </p>
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-50 px-5 py-4 dark:bg-slate-800">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Total Amount
            </span>

            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ₹
              {Number(
                selectedService?.price ||
                  service?.price ||
                  0
              ).toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="submit"
            disabled={
              isProcessing ||
              !selectedService?.id ||
              !selectedVehicle?.id ||
              !bookingDate ||
              !bookingTime ||
              !paymentMethod
            }
            className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {submitting
              ? "Creating Booking..."
              : orderLoading
                ? "Creating Payment Order..."
                : verifying
                  ? "Verifying Payment..."
                  : cashLoading
                    ? "Processing..."
                    : paymentMethod === "ONLINE"
                      ? "Create Booking & Pay"
                      : "Create Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerBookingModal;