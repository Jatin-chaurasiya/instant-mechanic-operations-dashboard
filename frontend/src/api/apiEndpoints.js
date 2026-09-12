// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ||
//   "https://instant-mechanic-api.jatindev.xyz/api/v1.0";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8081/api/v1.0";

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

    PENDING_ASSIGNMENTS: "/bookings/pending-assignments",
    ACTIVE: "/bookings/active",
    ASSIGN: (id) => `/bookings/${id}/assign`,
  },

  MECHANICS: {
    BASE: "/mechanics",
    BY_ID: (id) => `/mechanics/${id}`,

    AVAILABLE: "/mechanics/available",
    INACTIVE: "/mechanics/inactive",
    DEACTIVATE: (id) => `/mechanics/${id}/deactivate`,
    ACTIVATE: (id) => `/mechanics/${id}/activate`,
  },

  CUSTOMERS: {
    BASE: "/customers",
    BY_ID: (id) => `/customers/${id}`,

    // NEW
    CREATE: "/customers",
  },

  ANALYTICS: {
    BASE: "/analytics",
  },

  SERVICES: {
    BASE: "/services",
    BY_ID: (id) => `/services/${id}`,
    CATEGORIES: "/services/categories",
  },

  SEARCH: {
    BASE: "/search",
  },

  PROFILE: {
    BASE: "/profile",
  },

  SUPPORT: {
    BASE: "/support",
  },
  VEHICLES: {
  BASE: "/vehicles",
  CREATE: "/vehicles",
  BY_ID: (id) => `/vehicles/${id}`,
},
};

export default API_ENDPOINTS;