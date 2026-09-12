// ==========================================
// Initial Vehicle State
// ==========================================

export const initialVehicleState = {
  // Vehicles
  vehicles: [],
  loading: false,
  error: "",

  // Search + Pagination
  search: "",
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  // Add Vehicle Modal
  isAddModalOpen: false,
  addLoading: false,
  addError: "",

  // Delete Vehicle
  deleteVehicleTarget: null,
  deletingVehicle: false,

  // Vehicle Details
  selectedVehicle: null,
};


// ==========================================
// Vehicle Actions
// ==========================================

export const VEHICLE_ACTIONS = {
  // Vehicles
  SET_VEHICLES: "SET_VEHICLES",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",

  // Search + Pagination
  SET_SEARCH: "SET_SEARCH",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_TOTAL_PAGES: "SET_TOTAL_PAGES",
  SET_TOTAL_ITEMS: "SET_TOTAL_ITEMS",

  // Add Vehicle
  SET_ADD_MODAL_OPEN: "SET_ADD_MODAL_OPEN",
  SET_ADD_LOADING: "SET_ADD_LOADING",
  SET_ADD_ERROR: "SET_ADD_ERROR",

  // Delete Vehicle
  SET_DELETE_VEHICLE_TARGET: "SET_DELETE_VEHICLE_TARGET",
  SET_DELETING_VEHICLE: "SET_DELETING_VEHICLE",

  // Vehicle Details
  SET_SELECTED_VEHICLE: "SET_SELECTED_VEHICLE",

  // Reset
  RESET_FILTERS: "RESET_FILTERS",
  RESET_ADD_VEHICLE: "RESET_ADD_VEHICLE",
  RESET_DELETE_VEHICLE: "RESET_DELETE_VEHICLE",
  RESET_DETAILS: "RESET_DETAILS",
};


// ==========================================
// Vehicles Reducer
// ==========================================

export const vehiclesReducer = (state, action) => {
  switch (action.type) {

    // ======================================
    // Vehicles
    // ======================================

    case VEHICLE_ACTIONS.SET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      };


    case VEHICLE_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };


    case VEHICLE_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };


    // ======================================
    // Search + Pagination
    // ======================================

    case VEHICLE_ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };


    case VEHICLE_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };


    case VEHICLE_ACTIONS.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };


    case VEHICLE_ACTIONS.SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };


    // ======================================
    // Add Vehicle
    // ======================================

    case VEHICLE_ACTIONS.SET_ADD_MODAL_OPEN:
      return {
        ...state,
        isAddModalOpen: action.payload,
      };


    case VEHICLE_ACTIONS.SET_ADD_LOADING:
      return {
        ...state,
        addLoading: action.payload,
      };


    case VEHICLE_ACTIONS.SET_ADD_ERROR:
      return {
        ...state,
        addError: action.payload,
      };


    // ======================================
    // Delete Vehicle
    // ======================================

    case VEHICLE_ACTIONS.SET_DELETE_VEHICLE_TARGET:
      return {
        ...state,
        deleteVehicleTarget: action.payload,
      };


    case VEHICLE_ACTIONS.SET_DELETING_VEHICLE:
      return {
        ...state,
        deletingVehicle: action.payload,
      };


    // ======================================
    // Vehicle Details
    // ======================================

    case VEHICLE_ACTIONS.SET_SELECTED_VEHICLE:
      return {
        ...state,
        selectedVehicle: action.payload,
      };


    // ======================================
    // Reset Filters
    // ======================================

    case VEHICLE_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        search: "",
        currentPage: 1,
      };


    // ======================================
    // Reset Add Vehicle
    // ======================================

    case VEHICLE_ACTIONS.RESET_ADD_VEHICLE:
      return {
        ...state,
        isAddModalOpen: false,
        addLoading: false,
        addError: "",
      };


    // ======================================
    // Reset Delete Vehicle
    // ======================================

    case VEHICLE_ACTIONS.RESET_DELETE_VEHICLE:
      return {
        ...state,
        deleteVehicleTarget: null,
        deletingVehicle: false,
      };


    // ======================================
    // Reset Details
    // ======================================

    case VEHICLE_ACTIONS.RESET_DETAILS:
      return {
        ...state,
        selectedVehicle: null,
      };


    // ======================================
    // Default
    // ======================================

    default:
      return state;
  }
};