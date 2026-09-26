import { useEffect, useState } from "react";
import { CalendarCheck, CarFront, CreditCard, Wrench } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useCustomerBooking from "../hooks/bookings/useCustomerBooking";
import useCustomerPayment from "../hooks/payments/useCustomerPayment";
import useCustomerVehicles from "../hooks/vehicles/useCustomerVehicles";
import useServices from "../hooks/services/useServices";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
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

const CustomerCreateBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    services,
    loading: servicesLoading,
    getPublicServices,
  } = useServices();

  const {
    paymentMethod,
    paymentSuccess,

    cashLoading,
    orderLoading,
    verifying,

    setPaymentMethod,
    createCashPayment,
    createRazorpayOrder,
    verifyRazorpayPayment,
  } = useCustomerPayment();

  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    getPublicServices();
    loadVehicles(1, "");
  }, [getPublicServices, loadVehicles]);

  useEffect(() => {
    const serviceFromNavigation = location.state?.service;

    if (serviceFromNavigation) {
      setSelectedService(serviceFromNavigation);
    }
  }, [location.state, setSelectedService]);

  useEffect(() => {
    return () => {
      resetCreateForm();
    };
  }, [resetCreateForm]);

  const handleServiceChange = (event) => {
    const serviceId = Number(event.target.value);

    const service = services.find((item) => Number(item.id) === serviceId);

    setSelectedService(service || null);
  };

  const handleVehicleChange = (event) => {
    const vehicleId = Number(event.target.value);

    const vehicle = vehicles.find((item) => Number(item.id) === vehicleId);

    setSelectedVehicle(vehicle || null);
  };

  const validateForm = () => {
    if (!selectedService?.id) {
      toast.error("Please select a service.");
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
    const payment = await createCashPayment(booking.id);

    if (!payment) {
      return false;
    }

    toast.success("Booking created. Cash payment is pending.");

    navigate("/customer/bookings", {
      replace: true,
    });

    return true;
  };

  const handleOnlinePayment = async (booking) => {
    const razorpayLoaded = await loadRazorpayScript();

    if (!razorpayLoaded) {
      toast.error("Unable to load Razorpay Checkout.");
      return false;
    }

    const order = await createRazorpayOrder(booking.id);

    if (!order) {
      return false;
    }

    const options = {
      key: order.razorpayKeyId,

      amount: Math.round(Number(order.amount) * 100),

      currency: order.currency || "INR",

      name: "Instant Mechanic",

      description: `Booking ${booking.bookingCode}`,

      order_id: order.razorpayOrderId,

      handler: async (response) => {
        const verification = await verifyRazorpayPayment({
          razorpayOrderId: response.razorpay_order_id,

          razorpayPaymentId: response.razorpay_payment_id,

          razorpaySignature: response.razorpay_signature,
        });

        if (!verification) {
          return;
        }

        toast.success("Payment successful! Booking created successfully.");

        navigate("/customer/bookings", {
          replace: true,
        });
      },

      modal: {
        ondismiss: () => {
          setProcessingPayment(false);

          toast.info("Payment window closed.");
        },
      },

      theme: {
        color: "#0f172a",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", (response) => {
      setProcessingPayment(false);

      toast.error(response?.error?.description || "Payment failed.");
    });

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
      const booking = await createCustomerBooking();

      if (!booking) {
        return;
      }

      if (paymentMethod === "CASH") {
        await handleCashPayment(booking);

        return;
      }

      if (paymentMethod === "ONLINE") {
        await handleOnlinePayment(booking);
      }
    } finally {
      if (paymentMethod === "CASH" || !orderLoading) {
        setProcessingPayment(false);
      }
    }
  };

  const isProcessing =
    submitting || cashLoading || orderLoading || verifying || processingPayment;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Create Booking
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Book a vehicle service and choose your preferred payment method.
        </p>
      </div>

      {/* Error */}

      {submitError && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {submitError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Service */}

        <div className="mb-6">
          <label
            htmlFor="service"
            className="
              mb-2
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            <Wrench size={17} />
            Select Service
          </label>

          <select
            id="service"
            value={selectedService?.id || ""}
            onChange={handleServiceChange}
            disabled={servicesLoading || isProcessing}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-900
              outline-none
              focus:border-slate-500
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          >
            <option value="">
              {servicesLoading ? "Loading services..." : "Select a service"}
            </option>

            {services
              .filter((service) => service.active === true)
              .map((service) => (
                <option key={service.id} value={service.id}>
                  {service.serviceName}
                  {" - ₹"}
                  {service.price}
                </option>
              ))}
          </select>
        </div>

        {/* Selected Service */}

        {selectedService && (
          <div className="mb-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Selected Service
            </p>

            <p className="mt-1 font-semibold text-slate-900 dark:text-white">
              {selectedService.serviceName}
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              ₹{selectedService.price}
            </p>
          </div>
        )}

        {/* Vehicle */}

        <div className="mb-6">
          <label
            htmlFor="vehicle"
            className="
              mb-2
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            <CarFront size={17} />
            Select Vehicle
          </label>

          <select
            id="vehicle"
            value={selectedVehicle?.id || ""}
            onChange={handleVehicleChange}
            disabled={vehiclesLoading || isProcessing}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-900
              outline-none
              focus:border-slate-500
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          >
            <option value="">
              {vehiclesLoading ? "Loading vehicles..." : "Select a vehicle"}
            </option>

            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicleModel}
                {" - "}
                {vehicle.vehicleNumber}
              </option>
            ))}
          </select>

          {!vehiclesLoading && vehicles.length === 0 && (
            <p className="mt-2 text-sm text-amber-500">
              Please add a vehicle before creating a booking.
            </p>
          )}
        </div>

        {/* Date and Time */}

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="bookingDate"
              className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              <CalendarCheck size={17} />
              Booking Date
            </label>

            <input
              id="bookingDate"
              type="date"
              min={today}
              value={bookingDate}
              onChange={(event) => setBookingDate(event.target.value)}
              disabled={isProcessing}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                text-slate-900
                outline-none
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          <div>
            <label
              htmlFor="bookingTime"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Booking Time
            </label>

            <input
              id="bookingTime"
              type="time"
              value={bookingTime}
              onChange={(event) => setBookingTime(event.target.value)}
              disabled={isProcessing}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                text-slate-900
                outline-none
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>
        </div>

        {/* Payment */}

        <div className="mb-8">
          <label
            className="
              mb-3
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            <CreditCard size={17} />
            Payment Method
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Cash */}

            <button
              type="button"
              onClick={() => setPaymentMethod("CASH")}
              disabled={isProcessing}
              className={`
                rounded-xl
                border
                p-4
                text-left
                transition

                ${
                  paymentMethod === "CASH"
                    ? `
                      border-slate-900
                      bg-slate-100
                      dark:border-white
                      dark:bg-slate-800
                    `
                    : `
                      border-slate-200
                      hover:border-slate-400
                      dark:border-slate-700
                      dark:hover:border-slate-500
                    `
                }
              `}
            >
              <p className="font-semibold text-slate-900 dark:text-white">
                Cash
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Pay cash when the service is completed.
              </p>
            </button>

            {/* Online */}

            <button
              type="button"
              onClick={() => setPaymentMethod("ONLINE")}
              disabled={isProcessing}
              className={`
                rounded-xl
                border
                p-4
                text-left
                transition

                ${
                  paymentMethod === "ONLINE"
                    ? `
                      border-slate-900
                      bg-slate-100
                      dark:border-white
                      dark:bg-slate-800
                    `
                    : `
                      border-slate-200
                      hover:border-slate-400
                      dark:border-slate-700
                      dark:hover:border-slate-500
                    `
                }
              `}
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

        {/* Amount */}

        {selectedService && (
          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              rounded-xl
              bg-slate-50
              px-5
              py-4
              dark:bg-slate-800
            "
          >
            <span className="text-slate-500 dark:text-slate-400">
              Service Amount
            </span>

            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ₹{selectedService.price}
            </span>
          </div>
        )}

        {/* Submit */}

        <button
          type="submit"
          disabled={
            isProcessing ||
            !selectedService ||
            !selectedVehicle ||
            !bookingDate ||
            !bookingTime ||
            !paymentMethod
          }
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-slate-900
            px-5
            py-3.5
            font-semibold
            text-white
            transition
            hover:bg-slate-800
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:bg-white
            dark:text-slate-900
            dark:hover:bg-slate-100
          "
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
  );
};

export default CustomerCreateBookingPage;
