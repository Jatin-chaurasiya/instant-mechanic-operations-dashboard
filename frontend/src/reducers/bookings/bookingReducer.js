// ======================================================
// Booking Initial State
// ======================================================

export const initialBookingState = {
  // ======================================================
  // All Bookings - Backend Data
  // ======================================================

  bookings: [],
  loading: true,
  refreshing: false,
  error: null,

  // ======================================================
  // All Bookings - Filters
  // ======================================================

  search: "",
  status: "",
  category: "",

  // ======================================================
  // All Bookings - Sorting
  // ======================================================

  sortBy: "date",
  sortOrder: "desc",

  // ======================================================
  // All Bookings - Pagination
  // ======================================================

  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 1,
  totalItems: 0,

  // ======================================================
  // Categories
  // ======================================================

  categories: [],

  // ======================================================
  // Active Section
  // all | pending | active
  // ======================================================

  activeSection: "all",

  // ======================================================
  // Pending Bookings
  // ======================================================

  pendingBookings: [],
  pendingCount: 0,
  pendingPage: 0,
  pendingTotalPages: 0,

  // ======================================================
  // Active Bookings
  // ======================================================

  activeBookings: [],
  activeCount: 0,
  activePage: 0,
  activeTotalPages: 0,

  // ======================================================
  // Section Loading / Error
  // ======================================================

  sectionLoading: false,
  sectionError: "",

  // ======================================================
  // Add Booking Modal
  // ======================================================

  isAddBookingOpen: false,

  // ======================================================
  // Assign Booking Modal
  // ======================================================

  isAssignBookingOpen: false,
  selectedBooking: null,

  // ======================================================
  // Delete Booking
  // ======================================================

  deleteBookingTarget: null,
  deletingBooking: false,
};

// ======================================================
// Booking Action Types
// ======================================================

export const BOOKING_ACTIONS = {
  // ------------------------------------------
  // All Bookings
  // ------------------------------------------

  SET_BOOKINGS: "SET_BOOKINGS",
  SET_LOADING: "SET_LOADING",
  SET_REFRESHING: "SET_REFRESHING",
  SET_ERROR: "SET_ERROR",

  // ------------------------------------------
  // Filters
  // ------------------------------------------

  SET_SEARCH: "SET_SEARCH",
  SET_STATUS: "SET_STATUS",
  SET_CATEGORY: "SET_CATEGORY",

  // ------------------------------------------
  // Sorting
  // ------------------------------------------

  SET_SORT: "SET_SORT",

  // ------------------------------------------
  // Pagination
  // ------------------------------------------

  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",

  // ------------------------------------------
  // Categories
  // ------------------------------------------

  SET_CATEGORIES: "SET_CATEGORIES",

  // ------------------------------------------
  // Pending Bookings
  // ------------------------------------------

  SET_PENDING_BOOKINGS: "SET_PENDING_BOOKINGS",
  SET_PENDING_COUNT: "SET_PENDING_COUNT",
  SET_PENDING_PAGE: "SET_PENDING_PAGE",
  SET_PENDING_TOTAL_PAGES: "SET_PENDING_TOTAL_PAGES",

  // ------------------------------------------
  // Active Bookings
  // ------------------------------------------

  SET_ACTIVE_BOOKINGS: "SET_ACTIVE_BOOKINGS",
  SET_ACTIVE_COUNT: "SET_ACTIVE_COUNT",
  SET_ACTIVE_PAGE: "SET_ACTIVE_PAGE",
  SET_ACTIVE_TOTAL_PAGES: "SET_ACTIVE_TOTAL_PAGES",

  // ------------------------------------------
  // Section
  // ------------------------------------------

  SET_ACTIVE_SECTION: "SET_ACTIVE_SECTION",
  SET_SECTION_LOADING: "SET_SECTION_LOADING",
  SET_SECTION_ERROR: "SET_SECTION_ERROR",

  // ------------------------------------------
  // Add Booking Modal
  // ------------------------------------------

  SET_ADD_BOOKING_OPEN: "SET_ADD_BOOKING_OPEN",

  // ------------------------------------------
  // Assign Booking Modal
  // ------------------------------------------

  SET_ASSIGN_BOOKING_OPEN: "SET_ASSIGN_BOOKING_OPEN",
  SET_SELECTED_BOOKING: "SET_SELECTED_BOOKING",

  // ------------------------------------------
  // Delete Booking
  // ------------------------------------------

  SET_DELETE_BOOKING_TARGET:
    "SET_DELETE_BOOKING_TARGET",

  SET_DELETING_BOOKING:
    "SET_DELETING_BOOKING",

  // ------------------------------------------
  // Reset
  // ------------------------------------------

  RESET_FILTERS: "RESET_FILTERS",
};

// ======================================================
// Booking Reducer
// ======================================================

const bookingReducer = (state, action) => {
  switch (action.type) {
    // ==================================================
    // All Bookings
    // ==================================================

    case BOOKING_ACTIONS.SET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
      };

    case BOOKING_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case BOOKING_ACTIONS.SET_REFRESHING:
      return {
        ...state,
        refreshing: action.payload,
      };

    case BOOKING_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // ==================================================
    // Filters
    // ==================================================

    case BOOKING_ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };

    case BOOKING_ACTIONS.SET_STATUS:
      return {
        ...state,
        status: action.payload,
        currentPage: 1,
      };

    case BOOKING_ACTIONS.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        currentPage: 1,
      };

    // ==================================================
    // Sorting
    // ==================================================

    case BOOKING_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder:
          action.payload.sortOrder || "desc",
        currentPage: 1,
      };

    // ==================================================
    // All Bookings Pagination
    // ==================================================

    case BOOKING_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    // ==================================================
    // Categories
    // ==================================================

    case BOOKING_ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    // ==================================================
    // Pending Bookings
    // ==================================================

    case BOOKING_ACTIONS.SET_PENDING_BOOKINGS:
      return {
        ...state,
        pendingBookings: action.payload,
      };

    case BOOKING_ACTIONS.SET_PENDING_COUNT:
      return {
        ...state,
        pendingCount: action.payload,
      };

    case BOOKING_ACTIONS.SET_PENDING_PAGE:
      return {
        ...state,
        pendingPage: action.payload,
      };

    case BOOKING_ACTIONS.SET_PENDING_TOTAL_PAGES:
      return {
        ...state,
        pendingTotalPages: action.payload,
      };

    // ==================================================
    // Active Bookings
    // ==================================================

    case BOOKING_ACTIONS.SET_ACTIVE_BOOKINGS:
      return {
        ...state,
        activeBookings: action.payload,
      };

    case BOOKING_ACTIONS.SET_ACTIVE_COUNT:
      return {
        ...state,
        activeCount: action.payload,
      };

    case BOOKING_ACTIONS.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };

    case BOOKING_ACTIONS.SET_ACTIVE_TOTAL_PAGES:
      return {
        ...state,
        activeTotalPages: action.payload,
      };

    // ==================================================
    // Section
    // ==================================================

    case BOOKING_ACTIONS.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      };

    case BOOKING_ACTIONS.SET_SECTION_LOADING:
      return {
        ...state,
        sectionLoading: action.payload,
      };

    case BOOKING_ACTIONS.SET_SECTION_ERROR:
      return {
        ...state,
        sectionError: action.payload,
      };

    // ==================================================
    // Add Booking Modal
    // ==================================================

    case BOOKING_ACTIONS.SET_ADD_BOOKING_OPEN:
      return {
        ...state,
        isAddBookingOpen: action.payload,
      };

    // ==================================================
    // Assign Booking Modal
    // ==================================================

    case BOOKING_ACTIONS.SET_ASSIGN_BOOKING_OPEN:
      return {
        ...state,
        isAssignBookingOpen: action.payload,
      };

    case BOOKING_ACTIONS.SET_SELECTED_BOOKING:
      return {
        ...state,
        selectedBooking: action.payload,
      };

    // ==================================================
    // Delete Booking
    // ==================================================

    case BOOKING_ACTIONS.SET_DELETE_BOOKING_TARGET:
      return {
        ...state,
        deleteBookingTarget: action.payload,
      };

    case BOOKING_ACTIONS.SET_DELETING_BOOKING:
      return {
        ...state,
        deletingBooking: action.payload,
      };

    // ==================================================
    // Reset Filters
    // ==================================================

    case BOOKING_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        search: "",
        status: "",
        category: "",
        sortBy: "date",
        sortOrder: "desc",
        currentPage: 1,
      };

    // ==================================================
    // Default
    // ==================================================

    default:
      return state;
  }
};

export default bookingReducer;