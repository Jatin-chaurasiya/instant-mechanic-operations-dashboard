import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const profileApi = {
  getAdminProfile: async () => {
    const response = await api.get(
      API_ENDPOINTS.PROFILE.ADMIN
    );

    return response.data;
  },

  getCustomerProfile: async () => {
    const response = await api.get(
      API_ENDPOINTS.PROFILE.CUSTOMER
    );

    return response.data;
  },
};

export default profileApi;