import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const serviceApi = {
  getServices: async () => {
    const response = await api.get(
      API_ENDPOINTS.SERVICES.BASE
    );

    return response.data;
  },

  getServiceById: async (serviceId) => {
    const response = await api.get(
      API_ENDPOINTS.SERVICES.BY_ID(serviceId)
    );

    return response.data;
  },

  getCategories: async () => {
    const response = await api.get(
      API_ENDPOINTS.SERVICES.CATEGORIES
    );

    return response.data;
  },
};

export default serviceApi;