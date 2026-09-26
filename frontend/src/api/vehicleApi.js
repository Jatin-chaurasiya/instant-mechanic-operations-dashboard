import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const vehicleApi = {

  // ==========================================
  // ADMIN VEHICLE APIs
  // ==========================================

  // Get All Vehicles
  // Pagination + Search
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


  // Get Vehicles By Customer
  // Admin use
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
      API_ENDPOINTS.VEHICLES.BY_CUSTOMER(customerId),
      {
        params,
      }
    );

    return response.data;
  },


  // Create Vehicle
  // Admin use
  createVehicle: async (vehicleData) => {

    const response = await api.post(
      API_ENDPOINTS.VEHICLES.CREATE,
      vehicleData
    );

    return response.data;
  },


  // Update Vehicle
  // Admin use
  updateVehicle: async (
    vehicleId,
    vehicleData
  ) => {

    const response = await api.put(
      API_ENDPOINTS.VEHICLES.BY_ID(vehicleId),
      vehicleData
    );

    return response.data;
  },


  // Delete Vehicle
  // Admin use
  deleteVehicle: async (vehicleId) => {

    const response = await api.delete(
      API_ENDPOINTS.VEHICLES.BY_ID(vehicleId)
    );

    return response.data;
  },


  // ==========================================
  // CUSTOMER VEHICLE APIs
  // ==========================================

  // Get Logged-in Customer's Vehicles
  // Pagination + Search
  getCustomerVehicles: async ({
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
      API_ENDPOINTS.CUSTOMER_VEHICLES.BASE,
      {
        params,
      }
    );

    return response.data;
  },


  // Add Vehicle For Logged-in Customer
  createCustomerVehicle: async (vehicleData) => {

    const response = await api.post(
      API_ENDPOINTS.CUSTOMER_VEHICLES.CREATE,
      vehicleData
    );

    return response.data;
  },


  // Update Logged-in Customer's Vehicle
  updateCustomerVehicle: async (
    vehicleId,
    vehicleData
  ) => {

    const response = await api.put(
      API_ENDPOINTS.CUSTOMER_VEHICLES.BY_ID(vehicleId),
      vehicleData
    );

    return response.data;
  },


  // Delete Logged-in Customer's Vehicle
  deleteCustomerVehicle: async (vehicleId) => {

    const response = await api.delete(
      API_ENDPOINTS.CUSTOMER_VEHICLES.BY_ID(vehicleId)
    );

    return response.data;
  },

};

export default vehicleApi;