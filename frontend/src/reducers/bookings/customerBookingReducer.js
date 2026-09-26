export const initialCustomerBookingState = {
  // ==========================================
  // My Bookings
  // ==========================================

  bookings: [],
  loading: false,
  error: "",

  // ==========================================
  // Pagination
  // ==========================================

  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  totalItems: 0,

  // ==========================================
  // Selected Booking
  // ==========================================

  selectedBooking: null,
  detailsLoading: false,
  detailsError: "",

  // ==========================================
  // Create Booking
  // ==========================================

  isCreateBookingOpen: false,

  selectedService: null,
  selectedVehicle: null,

  bookingDate: "",
  bookingTime: "",

  submitting: false,
  submitError: "",
  createdBooking: null,
};


// ======================================================
// Customer Booking Action Types
// ======================================================

export const CUSTOMER_BOOKING_ACTIONS = {

  // ------------------------------------------
  // My Bookings
  // ------------------------------------------

  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  // ------------------------------------------
  // Pagination
  // ------------------------------------------

  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",

  // ------------------------------------------
  // Booking Details
  // ------------------------------------------

  DETAILS_START: "DETAILS_START",
  DETAILS_SUCCESS: "DETAILS_SUCCESS",
  DETAILS_ERROR: "DETAILS_ERROR",

  // ------------------------------------------
  // Create Booking Modal / Page
  // ------------------------------------------

  OPEN_CREATE_BOOKING: "OPEN_CREATE_BOOKING",
  CLOSE_CREATE_BOOKING: "CLOSE_CREATE_BOOKING",

  // ------------------------------------------
  // Create Booking Selection
  // ------------------------------------------

  SET_SELECTED_SERVICE: "SET_SELECTED_SERVICE",
  SET_SELECTED_VEHICLE: "SET_SELECTED_VEHICLE",

  // ------------------------------------------
  // Create Booking Form
  // ------------------------------------------

  SET_BOOKING_DATE: "SET_BOOKING_DATE",
  SET_BOOKING_TIME: "SET_BOOKING_TIME",

  // ------------------------------------------
  // Create Booking Submit
  // ------------------------------------------

  CREATE_START: "CREATE_START",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_ERROR: "CREATE_ERROR",

  // ------------------------------------------
  // Errors
  // ------------------------------------------

  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_DETAILS_ERROR: "CLEAR_DETAILS_ERROR",
  CLEAR_SUBMIT_ERROR: "CLEAR_SUBMIT_ERROR",

  // ------------------------------------------
  // Reset
  // ------------------------------------------

  RESET_CREATE_FORM: "RESET_CREATE_FORM",
  RESET_SELECTED_BOOKING: "RESET_SELECTED_BOOKING",
};


// ======================================================
// Customer Booking Reducer
// ======================================================

const customerBookingReducer = (
  state,
  action
) => {

  switch (action.type) {

    // ==================================================
    // My Bookings
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.FETCH_START:

      return {
        ...state,

        loading: true,
        error: "",
      };


    case CUSTOMER_BOOKING_ACTIONS.FETCH_SUCCESS:

      return {
        ...state,

        loading: false,
        error: "",

        bookings:
          action.payload?.bookings || [],

        currentPage:
          action.payload?.currentPage ?? 1,

        pageSize:
          action.payload?.pageSize ?? state.pageSize,

        totalPages:
          action.payload?.totalPages ?? 1,

        totalItems:
          action.payload?.totalItems ?? 0,
      };


    case CUSTOMER_BOOKING_ACTIONS.FETCH_ERROR:

      return {
        ...state,

        loading: false,
        error:
          action.payload || "Failed to load bookings.",
      };


    // ==================================================
    // Pagination
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.SET_CURRENT_PAGE:

      return {
        ...state,

        currentPage: action.payload,
      };


    case CUSTOMER_BOOKING_ACTIONS.SET_PAGE_SIZE:

      return {
        ...state,

        pageSize: action.payload,
        currentPage: 1,
      };


    // ==================================================
    // Booking Details
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.DETAILS_START:

      return {
        ...state,

        detailsLoading: true,
        detailsError: "",
      };


    case CUSTOMER_BOOKING_ACTIONS.DETAILS_SUCCESS:

      return {
        ...state,

        detailsLoading: false,
        detailsError: "",

        selectedBooking:
          action.payload,
      };


    case CUSTOMER_BOOKING_ACTIONS.DETAILS_ERROR:

      return {
        ...state,

        detailsLoading: false,

        detailsError:
          action.payload ||
          "Failed to load booking details.",
      };


    // ==================================================
    // Create Booking
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.OPEN_CREATE_BOOKING:

      return {
        ...state,

        isCreateBookingOpen: true,

        submitError: "",
      };


    case CUSTOMER_BOOKING_ACTIONS.CLOSE_CREATE_BOOKING:

      return {
        ...state,

        isCreateBookingOpen: false,
      };


    // ==================================================
    // Service Selection
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.SET_SELECTED_SERVICE:

      return {
        ...state,

        selectedService:
          action.payload,
      };


    // ==================================================
    // Vehicle Selection
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.SET_SELECTED_VEHICLE:

      return {
        ...state,

        selectedVehicle:
          action.payload,
      };


    // ==================================================
    // Booking Date
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.SET_BOOKING_DATE:

      return {
        ...state,

        bookingDate:
          action.payload,
      };


    // ==================================================
    // Booking Time
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.SET_BOOKING_TIME:

      return {
        ...state,

        bookingTime:
          action.payload,
      };


    // ==================================================
    // Create Booking
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.CREATE_START:

      return {
        ...state,

        submitting: true,
        submitError: "",
      };


    case CUSTOMER_BOOKING_ACTIONS.CREATE_SUCCESS:

      return {
        ...state,

        submitting: false,
        submitError: "",

        createdBooking:
          action.payload,

        isCreateBookingOpen: false,
      };


    case CUSTOMER_BOOKING_ACTIONS.CREATE_ERROR:

      return {
        ...state,

        submitting: false,

        submitError:
          action.payload ||
          "Failed to create booking.",
      };


    // ==================================================
    // Clear Errors
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.CLEAR_ERROR:

      return {
        ...state,

        error: "",
      };


    case CUSTOMER_BOOKING_ACTIONS.CLEAR_DETAILS_ERROR:

      return {
        ...state,

        detailsError: "",
      };


    case CUSTOMER_BOOKING_ACTIONS.CLEAR_SUBMIT_ERROR:

      return {
        ...state,

        submitError: "",
      };


    // ==================================================
    // Reset Create Form
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.RESET_CREATE_FORM:

      return {
        ...state,

        selectedService: null,
        selectedVehicle: null,

        bookingDate: "",
        bookingTime: "",

        submitting: false,
        submitError: "",

        createdBooking: null,

        isCreateBookingOpen: false,
      };


    // ==================================================
    // Reset Selected Booking
    // ==================================================

    case CUSTOMER_BOOKING_ACTIONS.RESET_SELECTED_BOOKING:

      return {
        ...state,

        selectedBooking: null,
        detailsLoading: false,
        detailsError: "",
      };


    // ==================================================
    // Default
    // ==================================================

    default:

      return state;
  }
};

export default customerBookingReducer;