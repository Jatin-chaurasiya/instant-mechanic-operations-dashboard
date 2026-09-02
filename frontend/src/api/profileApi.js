import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const profileApi = {
  getProfile: async () => {
    const response = await api.get(
      API_ENDPOINTS.PROFILE.BASE
    );

    return response.data;
  },
};

export default profileApi;