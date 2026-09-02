import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const supportApi = {
  sendMessage: async (data) => {
    const response = await api.post(
      API_ENDPOINTS.SUPPORT.BASE,
      data
    );

    return response.data;
  },
};

export default supportApi;