import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const serviceApi = {

  // ==========================================
  // CUSTOMER / COMMON SERVICE APIs
  // ==========================================

  // Get All Active Services
  getServices: async () => {

    const response = await api.get(
      API_ENDPOINTS.SERVICES.BASE
    );

    return response.data;
  },


  // Get Active Service By ID
  getServiceById: async (serviceId) => {

    const response = await api.get(
      API_ENDPOINTS.SERVICES.BY_ID(serviceId)
    );

    return response.data;
  },


  // Get Active Service Categories
  getCategories: async () => {

    const response = await api.get(
      API_ENDPOINTS.SERVICES.CATEGORIES
    );

    return response.data;
  },


  // ==========================================
  // ADMIN SERVICE APIs
  // ==========================================

  // Get All Services
  getAdminServices: async () => {

    const response = await api.get(
      API_ENDPOINTS.ADMIN_SERVICES.BASE
    );

    return response.data;
  },


  // Get Service By ID
  getAdminServiceById: async (serviceId) => {

    const response = await api.get(
      API_ENDPOINTS.ADMIN_SERVICES.BY_ID(serviceId)
    );

    return response.data;
  },


  // Create Service
  createService: async (serviceData) => {

    const response = await api.post(
      API_ENDPOINTS.ADMIN_SERVICES.CREATE,
      serviceData
    );

    return response.data;
  },


  // Update Service
  updateService: async (
    serviceId,
    serviceData
  ) => {

    const response = await api.put(
      API_ENDPOINTS.ADMIN_SERVICES.UPDATE(serviceId),
      serviceData
    );

    return response.data;
  },


  // Activate Service
  activateService: async (serviceId) => {

    const response = await api.put(
      API_ENDPOINTS.ADMIN_SERVICES.ACTIVATE(serviceId)
    );

    return response.data;
  },


  // Deactivate Service
  deactivateService: async (serviceId) => {

    const response = await api.put(
      API_ENDPOINTS.ADMIN_SERVICES.DEACTIVATE(serviceId)
    );

    return response.data;
  },


  // Public Services
  // Existing functionality retained
  getPublicServices: async () => {

    const response = await api.get(
      API_ENDPOINTS.SERVICES.BASE
    );

    return response.data;
  },

};

export default serviceApi;