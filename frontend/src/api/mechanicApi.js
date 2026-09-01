import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const mechanicApi = {

  getMechanics: async ({
    page = 0,
    size = 12,
    keyword = "",
    status = "",
  } = {}) => {

    const params = {
      page,
      size,
    };

    if (keyword) {
      params.keyword = keyword;
    }

    if (status) {
      params.status = status;
    }

    const response = await api.get(
      API_ENDPOINTS.MECHANICS.BASE,
      {
        params,
      }
    );

    return response.data;
  },

  getMechanicById: async (mechanicId) => {

    const response = await api.get(
      API_ENDPOINTS.MECHANICS.BY_ID(mechanicId)
    );

    return response.data;
  },

};

export default mechanicApi;