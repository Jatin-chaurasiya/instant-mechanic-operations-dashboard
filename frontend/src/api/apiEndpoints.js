const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://instant-mechanic-api.jatindev.xyz/api/v1.0";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ||
//   "http://localhost:8081/api/v1.0";

const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,

  // Auth APIs
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
  },

  // Dashboard APIs
  DASHBOARD: {
    BASE: "/dashboard",
  },

  // Admin Booking APIs
  BOOKINGS: {
    BASE: "/bookings",

    BY_ID: (id) => `/bookings/${id}`,

    STATUS: (id) => `/bookings/${id}/status`,

    PENDING_ASSIGNMENTS: "/bookings/pending-assignments",

    ACTIVE: "/bookings/active",

    ASSIGN: (id) => `/bookings/${id}/assign`,

    REJECT: (id) => `/bookings/${id}/reject`,

    // Unpaid cash bookings
    UNPAID: "/bookings/unpaid",

    // Mark cash payment as paid
    MARK_PAID: (id) => `/bookings/${id}/mark-paid`,
  },

  // Customer Booking APIs
  CUSTOMER_BOOKINGS: {
    BASE: "/customer/bookings",

    BY_ID: (id) => `/customer/bookings/${id}`,
  },

  // Mechanic APIs
  MECHANICS: {
    BASE: "/mechanics",

    BY_ID: (id) => `/mechanics/${id}`,

    AVAILABLE: "/mechanics/available",

    INACTIVE: "/mechanics/inactive",

    DEACTIVATE: (id) => `/mechanics/${id}/deactivate`,

    ACTIVATE: (id) => `/mechanics/${id}/activate`,
  },

  // Customer APIs - Admin Side
  CUSTOMERS: {
    BASE: "/customers",

    BY_ID: (id) => `/customers/${id}`,

    CREATE: "/customers",
  },

  // Analytics APIs
  ANALYTICS: {
    BASE: "/analytics",
  },

  // Customer / Common Service APIs
  SERVICES: {
    BASE: "/services",

    BY_ID: (id) => `/services/${id}`,

    CATEGORIES: "/services/categories",
  },

  // Admin Service Management APIs
  ADMIN_SERVICES: {
    BASE: "/admin/services",

    BY_ID: (id) => `/admin/services/${id}`,

    CREATE: "/admin/services",

    UPDATE: (id) => `/admin/services/${id}`,

    ACTIVATE: (id) => `/admin/services/${id}/activate`,

    DEACTIVATE: (id) => `/admin/services/${id}/deactivate`,
  },

  // Admin Vehicle APIs
  VEHICLES: {
    BASE: "/admin/vehicles",

    CREATE: "/admin/vehicles",

    BY_ID: (id) => `/admin/vehicles/${id}`,

    BY_CUSTOMER: (customerId) =>
      `/admin/vehicles/customer/${customerId}`,
  },

  // Customer Vehicle APIs
  CUSTOMER_VEHICLES: {
    BASE: "/customer/vehicles",

    CREATE: "/customer/vehicles",

    BY_ID: (id) => `/customer/vehicles/${id}`,
  },

  // Customer Payment APIs
  CUSTOMER_PAYMENTS: {
    BASE: "/customer/payments",

    CASH: "/customer/payments/cash",

    RAZORPAY_ORDER: "/customer/payments/razorpay/order",

    RAZORPAY_VERIFY: "/customer/payments/razorpay/verify",
  },

  // Global Search APIs
  SEARCH: {
    BASE: "/search",
  },

  // Profile APIs
  PROFILE: {
    ADMIN: "/admin/profile",

    CUSTOMER: "/customer/profile",
  },

  // Support APIs
  SUPPORT: {
    BASE: "/support",
  },
};

export default API_ENDPOINTS;