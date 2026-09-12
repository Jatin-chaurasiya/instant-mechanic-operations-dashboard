// Mechanics Initial State

export const initialMechanicsState = {
  // Main Mechanics - Backend Data
  mechanics: [],
  loading: true,
  refreshing: false,
  error: null,

  // Search / Filter
  search: "",
  status: "",

  // Main Pagination
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 1,
  totalItems: 0,

  // Section
  // all | available | inactive
  activeSection: "all",

  // Available Mechanics
  available: {
    data: [],
    loading: false,
    error: "",
    page: 0,
    totalPages: 1,
    totalItems: 0,
  },

  // Inactive Mechanics
  inactive: {
    data: [],
    loading: false,
    error: "",
    page: 0,
    totalPages: 1,
    totalItems: 0,
  },

  // Mechanic Details
  detailsOpen: false,
  selectedMechanicId: null,

  // Add / Update Mechanic Modal
  mechanicModalOpen: false,
  selectedMechanic: null,
  saving: false,
};

// Mechanics Action Types

export const MECHANIC_ACTIONS = {
  // Main Mechanics
  SET_MECHANICS: "SET_MECHANICS",
  SET_LOADING: "SET_LOADING",
  SET_REFRESHING: "SET_REFRESHING",
  SET_ERROR: "SET_ERROR",

  // Search / Filter
  SET_SEARCH: "SET_SEARCH",
  SET_STATUS: "SET_STATUS",

  // Main Pagination
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_TOTAL_ITEMS: "SET_TOTAL_ITEMS",
  SET_TOTAL_PAGES: "SET_TOTAL_PAGES",

  // Section
  SET_ACTIVE_SECTION: "SET_ACTIVE_SECTION",

  // Available Mechanics
  SET_AVAILABLE: "SET_AVAILABLE",
  SET_AVAILABLE_LOADING: "SET_AVAILABLE_LOADING",
  SET_AVAILABLE_ERROR: "SET_AVAILABLE_ERROR",
  SET_AVAILABLE_PAGE: "SET_AVAILABLE_PAGE",
  SET_AVAILABLE_TOTAL_PAGES: "SET_AVAILABLE_TOTAL_PAGES",
  SET_AVAILABLE_TOTAL_ITEMS: "SET_AVAILABLE_TOTAL_ITEMS",

  // Inactive Mechanics
  SET_INACTIVE: "SET_INACTIVE",
  SET_INACTIVE_LOADING: "SET_INACTIVE_LOADING",
  SET_INACTIVE_ERROR: "SET_INACTIVE_ERROR",
  SET_INACTIVE_PAGE: "SET_INACTIVE_PAGE",
  SET_INACTIVE_TOTAL_PAGES: "SET_INACTIVE_TOTAL_PAGES",
  SET_INACTIVE_TOTAL_ITEMS: "SET_INACTIVE_TOTAL_ITEMS",

  // Details Modal
  SET_DETAILS_OPEN: "SET_DETAILS_OPEN",
  SET_SELECTED_MECHANIC_ID: "SET_SELECTED_MECHANIC_ID",

  // Add / Update Modal
  SET_MECHANIC_MODAL_OPEN: "SET_MECHANIC_MODAL_OPEN",
  SET_SELECTED_MECHANIC: "SET_SELECTED_MECHANIC",
  SET_SAVING: "SET_SAVING",

  // Reset
  RESET_FILTERS: "RESET_FILTERS",
};

// Mechanics Reducer

const mechanicsReducer = (state, action) => {
  switch (action.type) {
    // Main Mechanics

    case MECHANIC_ACTIONS.SET_MECHANICS:
      return {
        ...state,
        mechanics: action.payload,
      };

    case MECHANIC_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case MECHANIC_ACTIONS.SET_REFRESHING:
      return {
        ...state,
        refreshing: action.payload,
      };

    case MECHANIC_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // Search / Filter

    case MECHANIC_ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };

    case MECHANIC_ACTIONS.SET_STATUS:
      return {
        ...state,
        status: action.payload,
        currentPage: 1,
      };

    // Main Pagination

    case MECHANIC_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case MECHANIC_ACTIONS.SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };

    case MECHANIC_ACTIONS.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };

    // Section

    case MECHANIC_ACTIONS.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      };

    // Available Mechanics

    case MECHANIC_ACTIONS.SET_AVAILABLE:
      return {
        ...state,
        available: {
          ...state.available,
          ...action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_AVAILABLE_LOADING:
      return {
        ...state,
        available: {
          ...state.available,
          loading: action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_AVAILABLE_ERROR:
      return {
        ...state,
        available: {
          ...state.available,
          error: action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_AVAILABLE_PAGE:
      return {
        ...state,
        available: {
          ...state.available,
          page: action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_AVAILABLE_TOTAL_PAGES:
      return {
        ...state,
        available: {
          ...state.available,
          totalPages: action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_AVAILABLE_TOTAL_ITEMS:
      return {
        ...state,
        available: {
          ...state.available,
          totalItems: action.payload,
        },
      };

    // Inactive Mechanics

    case MECHANIC_ACTIONS.SET_INACTIVE:
      return {
        ...state,
        inactive: {
          ...state.inactive,
          ...action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_INACTIVE_LOADING:
      return {
        ...state,
        inactive: {
          ...state.inactive,
          loading: action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_INACTIVE_ERROR:
      return {
        ...state,
        inactive: {
          ...state.inactive,
          error: action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_INACTIVE_PAGE:
      return {
        ...state,
        inactive: {
          ...state.inactive,
          page: action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_INACTIVE_TOTAL_PAGES:
      return {
        ...state,
        inactive: {
          ...state.inactive,
          totalPages: action.payload,
        },
      };

    case MECHANIC_ACTIONS.SET_INACTIVE_TOTAL_ITEMS:
      return {
        ...state,
        inactive: {
          ...state.inactive,
          totalItems: action.payload,
        },
      };

    // Details Modal

    case MECHANIC_ACTIONS.SET_DETAILS_OPEN:
      return {
        ...state,
        detailsOpen: action.payload,
      };

    case MECHANIC_ACTIONS.SET_SELECTED_MECHANIC_ID:
      return {
        ...state,
        selectedMechanicId: action.payload,
      };

    // Add / Update Mechanic Modal

    case MECHANIC_ACTIONS.SET_MECHANIC_MODAL_OPEN:
      return {
        ...state,
        mechanicModalOpen: action.payload,
      };

    case MECHANIC_ACTIONS.SET_SELECTED_MECHANIC:
      return {
        ...state,
        selectedMechanic: action.payload,
      };

    case MECHANIC_ACTIONS.SET_SAVING:
      return {
        ...state,
        saving: action.payload,
      };

    // Reset Filters

    case MECHANIC_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        search: "",
        status: "",
        currentPage: 1,
      };

    // Default

    default:
      return state;
  }
};

export default mechanicsReducer;