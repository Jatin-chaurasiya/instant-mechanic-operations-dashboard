import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const bookingApi = {

  getBookings: async ({
    page = 0,
    size = 10,
    keyword = "",
    status = "",
    category = "",
    sortBy = "bookingDate",
    sortOrder = "desc",
  } = {}) => {

    const params = {
      page,
      size,
    };

    if (keyword) params.keyword = keyword;
    if (status) params.status = status;
    if (category) params.category = category;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;

    const response = await api.get(
      API_ENDPOINTS.BOOKINGS.BASE,
      { params }
    );

    return response.data;
  },


  getBookingById: async (bookingId) => {

    const response = await api.get(
      API_ENDPOINTS.BOOKINGS.BY_ID(bookingId)
    );

    return response.data;
  },


  updateBookingStatus: async (
    bookingId,
    status
  ) => {

    const response = await api.put(
      API_ENDPOINTS.BOOKINGS.STATUS(bookingId),
      { status }
    );

    return response.data;
  },


  // ==========================================
  // Pending Assignments
  // ==========================================

  getPendingAssignments: async ({
    page = 0,
    size = 10,
  } = {}) => {

    const response = await api.get(
      API_ENDPOINTS.BOOKINGS.PENDING_ASSIGNMENTS,
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
  // Active Bookings
  // ==========================================

  getActiveBookings: async ({
    page = 0,
    size = 10,
  } = {}) => {

    const response = await api.get(
      API_ENDPOINTS.BOOKINGS.ACTIVE,
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
  // Create Booking
  // ==========================================

  createBooking: async (bookingData) => {

    const response = await api.post(
      API_ENDPOINTS.BOOKINGS.BASE,
      bookingData
    );

    return response.data;
  },


  // ==========================================
  // Assign Mechanic
  // ==========================================

  assignMechanic: async (
    bookingId,
    mechanicId
  ) => {

    const response = await api.put(
      API_ENDPOINTS.BOOKINGS.ASSIGN(bookingId),
      {
        mechanicId,
      }
    );

    return response.data;
  },


  // ==========================================
  // Delete Booking
  // ==========================================

  deleteBooking: async (bookingId) => {

    const response = await api.delete(
      API_ENDPOINTS.BOOKINGS.BY_ID(bookingId)
    );

    return response.data;
  },

};

export default bookingApi;