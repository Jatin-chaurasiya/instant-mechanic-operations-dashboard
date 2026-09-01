import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const dashboardApi = {

  getDashboard: async () => {

    const response = await api.get(
      API_ENDPOINTS.DASHBOARD.BASE
    );

    return response.data;
  },

};

export default dashboardApi;