import axios from "axios";
import API_ENDPOINTS from "./apiEndpoints";

const api = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response) {

      console.error(
        "API Error:",
        error.response.status,
        error.response.data
      );

      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }

    } else if (error.request) {

      console.error(
        "Network Error: Server not reachable"
      );

    } else {

      console.error(
        "Request Error:",
        error.message
      );
    }

    return Promise.reject(error);
  }
);

export default api;