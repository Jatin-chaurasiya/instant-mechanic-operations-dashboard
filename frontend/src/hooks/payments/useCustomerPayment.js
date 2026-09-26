import { useCallback, useReducer } from "react";
import { toast } from "react-toastify";

import paymentApi from "../../api/paymentApi";

import customerPaymentReducer, {
  initialCustomerPaymentState,
  CUSTOMER_PAYMENT_ACTIONS,
} from "../../reducers/payments/customerPaymentReducer";

const useCustomerPayment = () => {
  const [state, dispatch] = useReducer(
    customerPaymentReducer,
    initialCustomerPaymentState
  );

  const {
    payment,
    loading,
    error,

    razorpayOrder,
    orderLoading,
    orderError,

    verifying,
    verifyError,
    verificationResult,

    cashPayment,
    cashLoading,
    cashError,

    paymentMethod,
    paymentSuccess,
  } = state;

  // Set payment method

  const setPaymentMethod = useCallback((method) => {
    dispatch({
      type:
        CUSTOMER_PAYMENT_ACTIONS.SET_PAYMENT_METHOD,
      payload: method,
    });
  }, []);

  // Create cash payment

  const createCashPayment = useCallback(
    async (bookingId) => {
      if (!bookingId) {
        const message =
          "Booking ID is required.";

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.CASH_ERROR,
          payload: message,
        });

        toast.error(message);

        return null;
      }

      try {
        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.CASH_START,
        });

        const response =
          await paymentApi.createCashPayment(
            bookingId
          );

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.CASH_SUCCESS,
          payload: response,
        });

        return response;
      } catch (error) {
        console.error(
          "Unable to create cash payment:",
          error
        );

        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Unable to create cash payment.";

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.CASH_ERROR,
          payload: message,
        });

        toast.error(message);

        return null;
      }
    },
    []
  );

  // Create Razorpay order

  const createRazorpayOrder = useCallback(
    async (bookingId) => {
      if (!bookingId) {
        const message =
          "Booking ID is required.";

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.ORDER_ERROR,
          payload: message,
        });

        toast.error(message);

        return null;
      }

      try {
        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.ORDER_START,
        });

        const response =
          await paymentApi.createRazorpayOrder(
            bookingId
          );

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.ORDER_SUCCESS,
          payload: response,
        });

        return response;
      } catch (error) {
        console.error(
          "Unable to create Razorpay order:",
          error
        );

        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Unable to create Razorpay order.";

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.ORDER_ERROR,
          payload: message,
        });

        toast.error(message);

        return null;
      }
    },
    []
  );

  // Verify Razorpay payment

  const verifyRazorpayPayment = useCallback(
    async ({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    }) => {
      if (!razorpayOrderId) {
        const message =
          "Razorpay order ID is required.";

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.VERIFY_ERROR,
          payload: message,
        });

        toast.error(message);

        return null;
      }

      if (!razorpayPaymentId) {
        const message =
          "Razorpay payment ID is required.";

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.VERIFY_ERROR,
          payload: message,
        });

        toast.error(message);

        return null;
      }

      if (!razorpaySignature) {
        const message =
          "Razorpay signature is required.";

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.VERIFY_ERROR,
          payload: message,
        });

        toast.error(message);

        return null;
      }

      try {
        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.VERIFY_START,
        });

        const response =
          await paymentApi.verifyRazorpayPayment({
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
          });

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.VERIFY_SUCCESS,
          payload: response,
        });

        return response;
      } catch (error) {
        console.error(
          "Unable to verify Razorpay payment:",
          error
        );

        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Payment verification failed.";

        dispatch({
          type:
            CUSTOMER_PAYMENT_ACTIONS.VERIFY_ERROR,
          payload: message,
        });

        toast.error(message);

        return null;
      }
    },
    []
  );

  // Clear general error

  const clearError = useCallback(() => {
    dispatch({
      type:
        CUSTOMER_PAYMENT_ACTIONS.CLEAR_ERROR,
    });
  }, []);

  // Clear Razorpay order error

  const clearOrderError = useCallback(() => {
    dispatch({
      type:
        CUSTOMER_PAYMENT_ACTIONS.CLEAR_ORDER_ERROR,
    });
  }, []);

  // Clear verification error

  const clearVerifyError = useCallback(() => {
    dispatch({
      type:
        CUSTOMER_PAYMENT_ACTIONS.CLEAR_VERIFY_ERROR,
    });
  }, []);

  // Clear cash payment error

  const clearCashError = useCallback(() => {
    dispatch({
      type:
        CUSTOMER_PAYMENT_ACTIONS.CLEAR_CASH_ERROR,
    });
  }, []);

  // Reset payment state

  const resetPayment = useCallback(() => {
    dispatch({
      type:
        CUSTOMER_PAYMENT_ACTIONS.RESET_PAYMENT,
    });
  }, []);

  return {
    payment,
    loading,
    error,

    razorpayOrder,
    orderLoading,
    orderError,

    verifying,
    verifyError,
    verificationResult,

    cashPayment,
    cashLoading,
    cashError,

    paymentMethod,
    paymentSuccess,

    setPaymentMethod,

    createCashPayment,
    createRazorpayOrder,
    verifyRazorpayPayment,

    clearError,
    clearOrderError,
    clearVerifyError,
    clearCashError,

    resetPayment,
  };
};

export default useCustomerPayment;