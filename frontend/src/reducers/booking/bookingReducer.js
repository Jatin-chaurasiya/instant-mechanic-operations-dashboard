// ==========================================
// Booking Initial State
// ==========================================

export const initialBookingState = {
  // Backend data
  bookings: [],

  // Loading / error
  loading: true,
  refreshing: false,
  error: null,

  // Filters
  search: "",
  status: "",
  category: "",

  // Sorting
  sortBy: "date",
  sortOrder: "desc",

  // Pagination
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 1,
  totalItems: 0,
};

// ==========================================
// Booking Action Types
// ==========================================

export const BOOKING_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_REFRESHING: "SET_REFRESHING",
  SET_ERROR: "SET_ERROR",

  SET_BOOKINGS: "SET_BOOKINGS",
  SET_TOTAL_ITEMS: "SET_TOTAL_ITEMS",
  SET_TOTAL_PAGES: "SET_TOTAL_PAGES",

  SET_SEARCH: "SET_SEARCH",
  SET_STATUS: "SET_STATUS",
  SET_CATEGORY: "SET_CATEGORY",

  SET_SORT: "SET_SORT",

  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",

  RESET_FILTERS: "RESET_FILTERS",

  UPDATE_BOOKING_STATUS: "UPDATE_BOOKING_STATUS",
};

// ==========================================
// Booking Reducer
// ==========================================

const bookingReducer = (state, action) => {
  switch (action.type) {
    // ------------------------------------------
    // Loading
    // ------------------------------------------

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

    // ------------------------------------------
    // Error
    // ------------------------------------------

    case BOOKING_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // ------------------------------------------
    // Backend Data
    // ------------------------------------------

    case BOOKING_ACTIONS.SET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
      };

    case BOOKING_ACTIONS.SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };

    case BOOKING_ACTIONS.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };

    // ------------------------------------------
    // Filters
    // ------------------------------------------

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

    // ------------------------------------------
    // Sorting
    // ------------------------------------------

    case BOOKING_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder || "desc",
        currentPage: 1,
      };

    // ------------------------------------------
    // Pagination
    // ------------------------------------------

    case BOOKING_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    // ------------------------------------------
    // Reset Filters
    // ------------------------------------------

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

    // ------------------------------------------
    // WebSocket Booking Status Update
    // ------------------------------------------

    case BOOKING_ACTIONS.UPDATE_BOOKING_STATUS:
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking.id === action.payload.bookingId
            ? {
                ...booking,
                status: action.payload.status,
              }
            : booking
        ),
      };

    // ------------------------------------------
    // Default
    // ------------------------------------------

    default:
      return state;
  }
};

export default bookingReducer;