export const initialCustomerPaymentState = {
  payment: null,

  loading: false,
  error: "",

  // Razorpay order
  razorpayOrder: null,
  orderLoading: false,
  orderError: "",

  // Razorpay verification
  verifying: false,
  verifyError: "",
  verificationResult: null,

  // Cash payment
  cashPayment: null,
  cashLoading: false,
  cashError: "",

  // Current payment method
  paymentMethod: "",

  // Overall payment process
  paymentSuccess: false,
};


// Customer Payment Actions

export const CUSTOMER_PAYMENT_ACTIONS = {

  // General
  SET_PAYMENT_METHOD: "SET_PAYMENT_METHOD",

  // Cash
  CASH_START: "CASH_START",
  CASH_SUCCESS: "CASH_SUCCESS",
  CASH_ERROR: "CASH_ERROR",

  // Razorpay Order
  ORDER_START: "ORDER_START",
  ORDER_SUCCESS: "ORDER_SUCCESS",
  ORDER_ERROR: "ORDER_ERROR",

  // Razorpay Verify
  VERIFY_START: "VERIFY_START",
  VERIFY_SUCCESS: "VERIFY_SUCCESS",
  VERIFY_ERROR: "VERIFY_ERROR",

  // Errors
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_ORDER_ERROR: "CLEAR_ORDER_ERROR",
  CLEAR_VERIFY_ERROR: "CLEAR_VERIFY_ERROR",
  CLEAR_CASH_ERROR: "CLEAR_CASH_ERROR",

  // Reset
  RESET_PAYMENT: "RESET_PAYMENT",
};


// Customer Payment Reducer

const customerPaymentReducer = (
  state,
  action
) => {

  switch (action.type) {

    // Payment Method

    case CUSTOMER_PAYMENT_ACTIONS.SET_PAYMENT_METHOD:

      return {
        ...state,

        paymentMethod: action.payload,
      };


    // Cash Payment

    case CUSTOMER_PAYMENT_ACTIONS.CASH_START:

      return {
        ...state,

        cashLoading: true,
        cashError: "",
        paymentSuccess: false,
      };


    case CUSTOMER_PAYMENT_ACTIONS.CASH_SUCCESS:

      return {
        ...state,

        cashLoading: false,
        cashError: "",

        cashPayment: action.payload,
        payment: action.payload,

        paymentSuccess: true,
      };


    case CUSTOMER_PAYMENT_ACTIONS.CASH_ERROR:

      return {
        ...state,

        cashLoading: false,

        cashError:
          action.payload ||
          "Unable to create cash payment.",

        paymentSuccess: false,
      };


    // Razorpay Order

    case CUSTOMER_PAYMENT_ACTIONS.ORDER_START:

      return {
        ...state,

        orderLoading: true,
        orderError: "",
        paymentSuccess: false,

        razorpayOrder: null,
      };


    case CUSTOMER_PAYMENT_ACTIONS.ORDER_SUCCESS:

      return {
        ...state,

        orderLoading: false,
        orderError: "",

        razorpayOrder: action.payload,
      };


    case CUSTOMER_PAYMENT_ACTIONS.ORDER_ERROR:

      return {
        ...state,

        orderLoading: false,

        orderError:
          action.payload ||
          "Unable to create Razorpay order.",

        razorpayOrder: null,
      };


    // Razorpay Verification

    case CUSTOMER_PAYMENT_ACTIONS.VERIFY_START:

      return {
        ...state,

        verifying: true,
        verifyError: "",
        paymentSuccess: false,
      };


    case CUSTOMER_PAYMENT_ACTIONS.VERIFY_SUCCESS:

      return {
        ...state,

        verifying: false,
        verifyError: "",

        verificationResult:
          action.payload,

        payment:
          action.payload,

        paymentSuccess: true,
      };


    case CUSTOMER_PAYMENT_ACTIONS.VERIFY_ERROR:

      return {
        ...state,

        verifying: false,

        verifyError:
          action.payload ||
          "Payment verification failed.",

        paymentSuccess: false,
      };


    // Clear General Error

    case CUSTOMER_PAYMENT_ACTIONS.CLEAR_ERROR:

      return {
        ...state,

        error: "",
      };


    // Clear Order Error

    case CUSTOMER_PAYMENT_ACTIONS.CLEAR_ORDER_ERROR:

      return {
        ...state,

        orderError: "",
      };


    // Clear Verify Error

    case CUSTOMER_PAYMENT_ACTIONS.CLEAR_VERIFY_ERROR:

      return {
        ...state,

        verifyError: "",
      };


    // Clear Cash Error

    case CUSTOMER_PAYMENT_ACTIONS.CLEAR_CASH_ERROR:

      return {
        ...state,

        cashError: "",
      };


    // Reset Payment

    case CUSTOMER_PAYMENT_ACTIONS.RESET_PAYMENT:

      return {
        ...initialCustomerPaymentState,
      };


    default:

      return state;
  }
};

export default customerPaymentReducer;