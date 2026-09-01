import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const authApi = {
  register: async ({
    name,
    email,
    password,
  }) => {
    const response = await api.post(
      API_ENDPOINTS.AUTH.REGISTER,
      {
        name,
        email,
        password,
      }
    );

    return response.data;
  },

  login: async ({
    email,
    password,
  }) => {
    const response = await api.post(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        email,
        password,
      }
    );

    return response.data;
  },
};

export default authApi;