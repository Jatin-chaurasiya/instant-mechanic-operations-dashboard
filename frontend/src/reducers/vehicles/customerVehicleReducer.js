// ==========================================
// Customer Vehicle Initial State
// ==========================================

export const initialCustomerVehicleState = {
  // Vehicles
  vehicles: [],
  loading: false,
  error: "",

  // Search + Pagination
  search: "",
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  // Add / Edit Vehicle Modal
  isModalOpen: false,
  editingVehicle: null,
  savingVehicle: false,
  saveError: "",

  // Delete Vehicle
  deleteVehicleTarget: null,
  deletingVehicle: false,

  // Selected Vehicle
  selectedVehicle: null,
};


// ==========================================
// Customer Vehicle Actions
// ==========================================

export const CUSTOMER_VEHICLE_ACTIONS = {

  // Vehicles
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  // Add Vehicle
  ADD_START: "ADD_START",
  ADD_SUCCESS: "ADD_SUCCESS",
  ADD_ERROR: "ADD_ERROR",

  // Update Vehicle
  UPDATE_START: "UPDATE_START",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  // Delete Vehicle
  DELETE_START: "DELETE_START",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_ERROR: "DELETE_ERROR",

  // Search + Pagination
  SET_SEARCH: "SET_SEARCH",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_TOTAL_PAGES: "SET_TOTAL_PAGES",
  SET_TOTAL_ITEMS: "SET_TOTAL_ITEMS",

  // Modal
  OPEN_ADD_MODAL: "OPEN_ADD_MODAL",
  OPEN_EDIT_MODAL: "OPEN_EDIT_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",

  // Delete Confirmation
  SET_DELETE_VEHICLE_TARGET: "SET_DELETE_VEHICLE_TARGET",

  // Selected Vehicle
  SET_SELECTED_VEHICLE: "SET_SELECTED_VEHICLE",

  // Clear Errors
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_SAVE_ERROR: "CLEAR_SAVE_ERROR",

  // Reset
  RESET_FILTERS: "RESET_FILTERS",
  RESET_DELETE: "RESET_DELETE",
};


// ==========================================
// Customer Vehicle Reducer
// ==========================================

const customerVehicleReducer = (state, action) => {

  switch (action.type) {

    // ======================================
    // FETCH VEHICLES
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.FETCH_START:

      return {
        ...state,
        loading: true,
        error: "",
      };


    case CUSTOMER_VEHICLE_ACTIONS.FETCH_SUCCESS:

      return {
        ...state,
        loading: false,
        vehicles: action.payload.vehicles || [],
        totalPages: action.payload.totalPages || 1,
        totalItems: action.payload.totalItems || 0,
        error: "",
      };


    case CUSTOMER_VEHICLE_ACTIONS.FETCH_ERROR:

      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    // ======================================
    // ADD VEHICLE
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.ADD_START:

      return {
        ...state,
        savingVehicle: true,
        saveError: "",
      };


    case CUSTOMER_VEHICLE_ACTIONS.ADD_SUCCESS:

      return {
        ...state,
        savingVehicle: false,
        vehicles: [
          ...state.vehicles,
          action.payload,
        ],
        isModalOpen: false,
        editingVehicle: null,
        saveError: "",
      };


    case CUSTOMER_VEHICLE_ACTIONS.ADD_ERROR:

      return {
        ...state,
        savingVehicle: false,
        saveError: action.payload,
      };


    // ======================================
    // UPDATE VEHICLE
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.UPDATE_START:

      return {
        ...state,
        savingVehicle: true,
        saveError: "",
      };


    case CUSTOMER_VEHICLE_ACTIONS.UPDATE_SUCCESS:

      return {
        ...state,
        savingVehicle: false,

        vehicles: state.vehicles.map((vehicle) =>
          vehicle.id === action.payload.id
            ? action.payload
            : vehicle
        ),

        isModalOpen: false,
        editingVehicle: null,
        saveError: "",
      };


    case CUSTOMER_VEHICLE_ACTIONS.UPDATE_ERROR:

      return {
        ...state,
        savingVehicle: false,
        saveError: action.payload,
      };


    // ======================================
    // DELETE VEHICLE
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.DELETE_START:

      return {
        ...state,
        deletingVehicle: true,
      };


    case CUSTOMER_VEHICLE_ACTIONS.DELETE_SUCCESS:

      return {
        ...state,
        deletingVehicle: false,

        vehicles: state.vehicles.filter(
          (vehicle) =>
            vehicle.id !== action.payload
        ),

        deleteVehicleTarget: null,
      };


    case CUSTOMER_VEHICLE_ACTIONS.DELETE_ERROR:

      return {
        ...state,
        deletingVehicle: false,
        error: action.payload,
      };


    // ======================================
    // SEARCH
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.SET_SEARCH:

      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };


    // ======================================
    // PAGINATION
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.SET_CURRENT_PAGE:

      return {
        ...state,
        currentPage: action.payload,
      };


    case CUSTOMER_VEHICLE_ACTIONS.SET_TOTAL_PAGES:

      return {
        ...state,
        totalPages: action.payload,
      };


    case CUSTOMER_VEHICLE_ACTIONS.SET_TOTAL_ITEMS:

      return {
        ...state,
        totalItems: action.payload,
      };


    // ======================================
    // ADD MODAL
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.OPEN_ADD_MODAL:

      return {
        ...state,
        isModalOpen: true,
        editingVehicle: null,
        saveError: "",
      };


    // ======================================
    // EDIT MODAL
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.OPEN_EDIT_MODAL:

      return {
        ...state,
        isModalOpen: true,
        editingVehicle: action.payload,
        saveError: "",
      };


    // ======================================
    // CLOSE MODAL
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.CLOSE_MODAL:

      return {
        ...state,
        isModalOpen: false,
        editingVehicle: null,
        savingVehicle: false,
        saveError: "",
      };


    // ======================================
    // DELETE TARGET
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.SET_DELETE_VEHICLE_TARGET:

      return {
        ...state,
        deleteVehicleTarget: action.payload,
      };


    // ======================================
    // SELECTED VEHICLE
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.SET_SELECTED_VEHICLE:

      return {
        ...state,
        selectedVehicle: action.payload,
      };


    // ======================================
    // CLEAR ERROR
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.CLEAR_ERROR:

      return {
        ...state,
        error: "",
      };


    case CUSTOMER_VEHICLE_ACTIONS.CLEAR_SAVE_ERROR:

      return {
        ...state,
        saveError: "",
      };


    // ======================================
    // RESET FILTERS
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.RESET_FILTERS:

      return {
        ...state,
        search: "",
        currentPage: 1,
      };


    // ======================================
    // RESET DELETE
    // ======================================

    case CUSTOMER_VEHICLE_ACTIONS.RESET_DELETE:

      return {
        ...state,
        deleteVehicleTarget: null,
        deletingVehicle: false,
      };


    // ======================================
    // DEFAULT
    // ======================================

    default:
      return state;
  }
};

export default customerVehicleReducer;