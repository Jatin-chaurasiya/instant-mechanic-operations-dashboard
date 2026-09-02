import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const searchApi = {
  globalSearch: async (query) => {
    const response = await api.get(
      API_ENDPOINTS.SEARCH.BASE,
      {
        params: {
          query: query.trim(),
        },
      }
    );

    return response.data;
  },
};

export default searchApi;