import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const paymentApi = {

  // ==========================================
  // CASH PAYMENT
  // ==========================================

  createCashPayment: async (bookingId) => {
    const response = await api.post(
      API_ENDPOINTS.CUSTOMER_PAYMENTS.CASH,
      {
        bookingId,
      }
    );

    return response.data;
  },


  // ==========================================
  // RAZORPAY CREATE ORDER
  // ==========================================

  createRazorpayOrder: async (bookingId) => {
    const response = await api.post(
      API_ENDPOINTS.CUSTOMER_PAYMENTS.RAZORPAY_ORDER,
      {
        bookingId,
      }
    );

    return response.data;
  },


  // ==========================================
  // RAZORPAY VERIFY PAYMENT
  // ==========================================

  verifyRazorpayPayment: async ({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  }) => {

    const response = await api.post(
      API_ENDPOINTS.CUSTOMER_PAYMENTS.RAZORPAY_VERIFY,
      {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      }
    );

    return response.data;
  },

};

export default paymentApi;