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

    if (keyword) params.keyword = keyword;
    if (status) params.status = status;

    const response = await api.get(
      API_ENDPOINTS.MECHANICS.BASE,
      { params }
    );

    return response.data;
  },


  getMechanicById: async (mechanicId) => {

    const response = await api.get(
      API_ENDPOINTS.MECHANICS.BY_ID(mechanicId)
    );

    return response.data;
  },


  // ==========================================
  // Available Mechanics
  // ==========================================

  getAvailableMechanics: async ({
    page = 0,
    size = 10,
  } = {}) => {

    const response = await api.get(
      API_ENDPOINTS.MECHANICS.AVAILABLE,
      {
        params: {
          page,
          size,
        },
      }
    );

    return response.data;
  },


  // ==========================================
  // Inactive Mechanics
  // ==========================================

  getInactiveMechanics: async ({
    page = 0,
    size = 10,
  } = {}) => {

    const response = await api.get(
      API_ENDPOINTS.MECHANICS.INACTIVE,
      {
        params: {
          page,
          size,
        },
      }
    );

    return response.data;
  },


  // ==========================================
  // Add Mechanic
  // ==========================================

  createMechanic: async (mechanicData) => {

    const response = await api.post(
      API_ENDPOINTS.MECHANICS.BASE,
      mechanicData
    );

    return response.data;
  },


  // ==========================================
  // Update Mechanic
  // ==========================================

  updateMechanic: async (
    mechanicId,
    mechanicData
  ) => {

    const response = await api.put(
      API_ENDPOINTS.MECHANICS.BY_ID(mechanicId),
      mechanicData
    );

    return response.data;
  },


  // ==========================================
  // Deactivate Mechanic
  // ==========================================

  deactivateMechanic: async (mechanicId) => {

    const response = await api.put(
      API_ENDPOINTS.MECHANICS.DEACTIVATE(mechanicId)
    );

    return response.data;
  },


  // ==========================================
  // Activate Mechanic
  // ==========================================

  activateMechanic: async (mechanicId) => {

    const response = await api.put(
      API_ENDPOINTS.MECHANICS.ACTIVATE(mechanicId)
    );

    return response.data;
  },

};

export default mechanicApi;