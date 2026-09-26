const initialState = {
  services: [],
  loading: false,
  error: null,
};

const serviceReducer = (state, action) => {
  switch (action.type) {

    // Start API request
    case "FETCH_SERVICES_REQUEST":
    case "CREATE_SERVICE_REQUEST":
    case "UPDATE_SERVICE_REQUEST":
    case "ACTIVATE_SERVICE_REQUEST":
    case "DEACTIVATE_SERVICE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Services loaded successfully
    case "FETCH_SERVICES_SUCCESS":
      return {
        ...state,
        loading: false,
        services: action.payload,
        error: null,
      };

    // Service created successfully
    case "CREATE_SERVICE_SUCCESS":
      return {
        ...state,
        loading: false,
        services: [action.payload, ...state.services],
        error: null,
      };

    // Service updated successfully
    case "UPDATE_SERVICE_SUCCESS":
      return {
        ...state,
        loading: false,
        services: state.services.map((service) =>
          service.id === action.payload.id
            ? action.payload
            : service
        ),
        error: null,
      };

    // Service activated successfully
    case "ACTIVATE_SERVICE_SUCCESS":
      return {
        ...state,
        loading: false,
        services: state.services.map((service) =>
          service.id === action.payload.id
            ? action.payload
            : service
        ),
        error: null,
      };

    // Service deactivated successfully
    case "DEACTIVATE_SERVICE_SUCCESS":
      return {
        ...state,
        loading: false,
        services: state.services.map((service) =>
          service.id === action.payload.id
            ? action.payload
            : service
        ),
        error: null,
      };

    // API request failed
    case "FETCH_SERVICES_FAILURE":
    case "CREATE_SERVICE_FAILURE":
    case "UPDATE_SERVICE_FAILURE":
    case "ACTIVATE_SERVICE_FAILURE":
    case "DEACTIVATE_SERVICE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear error message
    case "CLEAR_SERVICE_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export { initialState };
export default serviceReducer;