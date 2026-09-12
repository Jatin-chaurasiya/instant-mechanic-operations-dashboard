import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const vehicleApi = {

  // ==========================================
  // Get All Vehicles
  // Pagination + Search
  // Used in Vehicles Page
  // ==========================================

  getVehicles: async ({
    page = 0,
    size = 10,
    keyword = "",
  } = {}) => {

    const params = {
      page,
      size,
    };

    if (keyword?.trim()) {
      params.keyword = keyword.trim();
    }

    const response = await api.get(
      API_ENDPOINTS.VEHICLES.BASE,
      {
        params,
      }
    );

    return response.data;
  },


  // ==========================================
  // Get Vehicles By Customer
  // Pagination + Search
  // Used in Add Booking
  // ==========================================

  getVehiclesByCustomer: async ({
    customerId,
    page = 0,
    size = 10,
    keyword = "",
  } = {}) => {

    const params = {
      customerId: Number(customerId),
      page,
      size,
    };

    if (keyword?.trim()) {
      params.keyword = keyword.trim();
    }

    const response = await api.get(
      API_ENDPOINTS.VEHICLES.BASE,
      {
        params,
      }
    );

    return response.data;
  },


  // ==========================================
  // Create Vehicle
  // ==========================================

  createVehicle: async (vehicleData) => {

    const response = await api.post(
      API_ENDPOINTS.VEHICLES.CREATE,
      vehicleData
    );

    return response.data;
  },
  deleteVehicle: async (vehicleId) => {
  const response = await api.delete(
    API_ENDPOINTS.VEHICLES.BY_ID(vehicleId)
  );

  return response.data;
},
};

export default vehicleApi;