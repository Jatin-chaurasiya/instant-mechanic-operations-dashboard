import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const customerApi = {

  getCustomers: async ({
    page = 0,
    size = 10,
    keyword = "",
  } = {}) => {

    const params = {
      page,
      size,
    };

    if (keyword) {
      params.keyword = keyword;
    }

    const response = await api.get(
      API_ENDPOINTS.CUSTOMERS.BASE,
      {
        params,
      }
    );

    return response.data;
  },

  getCustomerById: async (customerId) => {

    const response = await api.get(
      API_ENDPOINTS.CUSTOMERS.BY_ID(customerId)
    );

    return response.data;
  },

};

export default customerApi;