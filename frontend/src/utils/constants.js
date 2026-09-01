export const APP_NAME =
  "Instant Mechanic";

export const APP_DESCRIPTION =
  "On-Demand Vehicle Service Platform";

export const DEFAULT_PAGE_SIZE = 10;

export const MECHANICS_PAGE_SIZE = 12;

export const POLLING_INTERVAL = 30000;

export const API_TIMEOUT = 15000;

export const ROUTES = {
  ROOT: "/",
  OVERVIEW: "/overview",
  ANALYTICS: "/analytics",
  BOOKINGS: "/bookings",
  MECHANICS: "/mechanics",
};

export const BOOKING_CATEGORIES = [
  {
    value: "Oil Change",
    label: "Oil Change",
  },
  {
    value: "AC Service",
    label: "AC Service",
  },
  {
    value: "Battery",
    label: "Battery",
  },
  {
    value: "Tyre",
    label: "Tyre",
  },
  {
    value: "Engine",
    label: "Engine",
  },
  {
    value: "General Repair",
    label: "General Repair",
  },
];

export const BOOKING_SORT_OPTIONS = [
  {
    value: "date",
    label: "Date",
  },
  {
    value: "amount",
    label: "Amount",
  },
  {
    value: "customer",
    label: "Customer",
  },
  {
    value: "status",
    label: "Status",
  },
];

export const BOOKING_STATUS_OPTIONS = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "ASSIGNED",
    label: "Assigned",
  },
  {
    value: "ON_THE_WAY",
    label: "On The Way",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

export const MECHANIC_STATUS_OPTIONS = [
  {
    value: "AVAILABLE",
    label: "Available",
  },
  {
    value: "BUSY",
    label: "Busy",
  },
  {
    value: "ON_THE_WAY",
    label: "On The Way",
  },
  {
    value: "OFFLINE",
    label: "Offline",
  },
  {
    value: "UNAVAILABLE",
    label: "Unavailable",
  },
];

export const DATE_RANGES = {
  TODAY: "today",
  LAST_7_DAYS: "last_7_days",
  LAST_30_DAYS: "last_30_days",
  THIS_MONTH: "this_month",
  LAST_MONTH: "last_month",
};

export const REFRESH_INTERVALS = {
  DEFAULT: 30000,
  FAST: 15000,
  SLOW: 60000,
};

export const STORAGE_KEYS = {
  TOKEN: "instant_mechanic_token",
  USER: "instant_mechanic_user",
};