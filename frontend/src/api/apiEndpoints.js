const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://instant-mechanic-api.jatindev.xyz/api/v1.0";

const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,

  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
  },

  DASHBOARD: {
    BASE: "/dashboard",
  },

  BOOKINGS: {
    BASE: "/bookings",
    BY_ID: (id) => `/bookings/${id}`,
    STATUS: (id) => `/bookings/${id}/status`,
  },

  MECHANICS: {
    BASE: "/mechanics",
    BY_ID: (id) => `/mechanics/${id}`,
  },

  CUSTOMERS: {
    BASE: "/customers",
    BY_ID: (id) => `/customers/${id}`,
  },

  ANALYTICS: {
    BASE: "/analytics",
  },

  SERVICES: {
    BASE: "/services",
    BY_ID: (id) => `/services/${id}`,
    CATEGORIES: "/services/categories",
  },
};

export default API_ENDPOINTS;