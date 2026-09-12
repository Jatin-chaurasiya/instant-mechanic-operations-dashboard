export const initialCustomerState = {
  customers: [],
  loading: true,
  refreshing: false,
  error: null,

  search: "",

  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 1,
  totalItems: 0,

  selectedCustomer: null,
  detailsLoading: false,
  detailsError: null,

  isAddCustomerOpen: false,
  addCustomerLoading: false,
  addCustomerError: null,
};

export const CUSTOMER_ACTIONS = {
  SET_CUSTOMERS: "SET_CUSTOMERS",
  SET_LOADING: "SET_LOADING",
  SET_REFRESHING: "SET_REFRESHING",
  SET_ERROR: "SET_ERROR",

  SET_SEARCH: "SET_SEARCH",

  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_TOTAL_PAGES: "SET_TOTAL_PAGES",
  SET_TOTAL_ITEMS: "SET_TOTAL_ITEMS",

  SET_SELECTED_CUSTOMER: "SET_SELECTED_CUSTOMER",
  SET_DETAILS_LOADING: "SET_DETAILS_LOADING",
  SET_DETAILS_ERROR: "SET_DETAILS_ERROR",

  SET_ADD_CUSTOMER_OPEN: "SET_ADD_CUSTOMER_OPEN",
  SET_ADD_CUSTOMER_LOADING: "SET_ADD_CUSTOMER_LOADING",
  SET_ADD_CUSTOMER_ERROR: "SET_ADD_CUSTOMER_ERROR",

  RESET_FILTERS: "RESET_FILTERS",
  RESET_DETAILS: "RESET_DETAILS",
  RESET_ADD_CUSTOMER: "RESET_ADD_CUSTOMER",
};

export const customersReducer = (state, action) => {
  switch (action.type) {
    case CUSTOMER_ACTIONS.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_REFRESHING:
      return {
        ...state,
        refreshing: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };

    case CUSTOMER_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_SELECTED_CUSTOMER:
      return {
        ...state,
        selectedCustomer: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_DETAILS_LOADING:
      return {
        ...state,
        detailsLoading: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_DETAILS_ERROR:
      return {
        ...state,
        detailsError: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_OPEN:
      return {
        ...state,
        isAddCustomerOpen: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_LOADING:
      return {
        ...state,
        addCustomerLoading: action.payload,
      };

    case CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_ERROR:
      return {
        ...state,
        addCustomerError: action.payload,
      };

    case CUSTOMER_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        search: "",
        currentPage: 1,
      };

    case CUSTOMER_ACTIONS.RESET_DETAILS:
      return {
        ...state,
        selectedCustomer: null,
        detailsLoading: false,
        detailsError: null,
      };

    case CUSTOMER_ACTIONS.RESET_ADD_CUSTOMER:
      return {
        ...state,
        isAddCustomerOpen: false,
        addCustomerLoading: false,
        addCustomerError: null,
      };

    default:
      return state;
  }
};