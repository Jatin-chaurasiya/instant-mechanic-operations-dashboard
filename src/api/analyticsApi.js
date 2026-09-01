import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const analyticsApi = {

  getAnalytics: async ({
    from,
    to,
  } = {}) => {

    const params = {};

    if (from) {
      params.from = from;
    }

    if (to) {
      params.to = to;
    }

    const response = await api.get(
      API_ENDPOINTS.ANALYTICS.BASE,
      {
        params,
      }
    );

    return response.data;
  },

};

export default analyticsApi;