import { useCallback, useReducer } from "react";
import { toast } from "react-toastify";

import serviceApi from "../../api/serviceApi";
import serviceReducer, {
  initialState,
} from "../../reducers/services/serviceReducer";

const useServices = () => {
  const [state, dispatch] = useReducer(
    serviceReducer,
    initialState
  );

  // Fetch all services for Admin
  const getServices = useCallback(async () => {
    dispatch({
      type: "FETCH_SERVICES_REQUEST",
    });

    try {
      const data = await serviceApi.getAdminServices();

      dispatch({
        type: "FETCH_SERVICES_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.error("Failed to load services:", error);

      const message =
        error.response?.data?.message ||
        "Unable to load services";

      dispatch({
        type: "FETCH_SERVICES_FAILURE",
        payload: message,
      });

      toast.error(message);
    }
  }, []);

  // Fetch active services for public users
  const getPublicServices = useCallback(async () => {
    dispatch({
      type: "FETCH_SERVICES_REQUEST",
    });

    try {
      const data = await serviceApi.getPublicServices();

      dispatch({
        type: "FETCH_SERVICES_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.error(
        "Failed to load public services:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Unable to load services";

      dispatch({
        type: "FETCH_SERVICES_FAILURE",
        payload: message,
      });

      toast.error(message);
    }
  }, []);

  // Create a new service
  const createService = useCallback(async (serviceData) => {
    dispatch({
      type: "CREATE_SERVICE_REQUEST",
    });

    try {
      const data = await serviceApi.createService(
        serviceData
      );

      dispatch({
        type: "CREATE_SERVICE_SUCCESS",
        payload: data,
      });

      toast.success("Service created successfully");

      return data;
    } catch (error) {
      console.error(
        "Failed to create service:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Unable to create service";

      dispatch({
        type: "CREATE_SERVICE_FAILURE",
        payload: message,
      });

      toast.error(message);

      throw error;
    }
  }, []);

  // Update an existing service
  const updateService = useCallback(
    async (serviceId, serviceData) => {
      dispatch({
        type: "UPDATE_SERVICE_REQUEST",
      });

      try {
        const data = await serviceApi.updateService(
          serviceId,
          serviceData
        );

        dispatch({
          type: "UPDATE_SERVICE_SUCCESS",
          payload: data,
        });

        toast.success("Service updated successfully");

        return data;
      } catch (error) {
        console.error(
          "Failed to update service:",
          error
        );

        const message =
          error.response?.data?.message ||
          "Unable to update service";

        dispatch({
          type: "UPDATE_SERVICE_FAILURE",
          payload: message,
        });

        toast.error(message);

        throw error;
      }
    },
    []
  );

  // Activate a service
  const activateService = useCallback(async (serviceId) => {
    dispatch({
      type: "ACTIVATE_SERVICE_REQUEST",
    });

    try {
      const data =
        await serviceApi.activateService(serviceId);

      dispatch({
        type: "ACTIVATE_SERVICE_SUCCESS",
        payload: data,
      });

      toast.success("Service activated successfully");

      return data;
    } catch (error) {
      console.error(
        "Failed to activate service:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Unable to activate service";

      dispatch({
        type: "ACTIVATE_SERVICE_FAILURE",
        payload: message,
      });

      toast.error(message);

      throw error;
    }
  }, []);

  // Deactivate a service
  const deactivateService = useCallback(async (serviceId) => {
    dispatch({
      type: "DEACTIVATE_SERVICE_REQUEST",
    });

    try {
      const data =
        await serviceApi.deactivateService(serviceId);

      dispatch({
        type: "DEACTIVATE_SERVICE_SUCCESS",
        payload: data,
      });

      toast.success("Service deactivated successfully");

      return data;
    } catch (error) {
      console.error(
        "Failed to deactivate service:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Unable to deactivate service";

      dispatch({
        type: "DEACTIVATE_SERVICE_FAILURE",
        payload: message,
      });

      toast.error(message);

      throw error;
    }
  }, []);

  // Clear current error
  const clearError = useCallback(() => {
    dispatch({
      type: "CLEAR_SERVICE_ERROR",
    });
  }, []);

  return {
    services: state.services,
    loading: state.loading,
    error: state.error,

    getServices,
    getPublicServices,

    createService,
    updateService,
    activateService,
    deactivateService,

    clearError,
  };
};

export default useServices;