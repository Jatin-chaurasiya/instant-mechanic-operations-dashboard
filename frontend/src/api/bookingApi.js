import api from "./axios";
import API_ENDPOINTS from "./apiEndpoints";

const bookingApi = {
  // ADMIN BOOKING APIs

  // Get All Bookings
  // Pagination + Search + Filter + Sorting
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

    if (keyword?.trim()) {
      params.keyword = keyword.trim();
    }

    if (status) {
      params.status = status;
    }

    if (category?.trim()) {
      params.category = category.trim();
    }

    if (sortBy) {
      params.sortBy = sortBy;
    }

    if (sortOrder) {
      params.sortOrder = sortOrder;
    }

    const response = await api.get(API_ENDPOINTS.BOOKINGS.BASE, {
      params,
    });

    return response.data;
  },

  // Get Booking By ID
  // Admin use
  getBookingById: async (bookingId) => {
    const response = await api.get(API_ENDPOINTS.BOOKINGS.BY_ID(bookingId));

    return response.data;
  },

  // Update Booking Status
  // Admin use
  updateBookingStatus: async (bookingId, status) => {
    const response = await api.put(API_ENDPOINTS.BOOKINGS.STATUS(bookingId), {
      status,
    });

    return response.data;
  },

  // ==========================================
  // PENDING ASSIGNMENTS
  // ==========================================

  getPendingAssignments: async ({ page = 0, size = 10 } = {}) => {
    const response = await api.get(API_ENDPOINTS.BOOKINGS.PENDING_ASSIGNMENTS, {
      params: {
        page,
        size,
      },
    });

    return response.data;
  },

  // ==========================================
  // ACTIVE BOOKINGS
  // ==========================================

  getActiveBookings: async ({ page = 0, size = 10 } = {}) => {
    const response = await api.get(API_ENDPOINTS.BOOKINGS.ACTIVE, {
      params: {
        page,
        size,
      },
    });

    return response.data;
  },

  // ==========================================
  // CREATE BOOKING
  // ADMIN USE
  // ==========================================

  createBooking: async (bookingData) => {
    const response = await api.post(API_ENDPOINTS.BOOKINGS.BASE, bookingData);

    return response.data;
  },

  // ==========================================
  // ASSIGN MECHANIC
  // ADMIN USE
  // ==========================================

  assignMechanic: async (bookingId, mechanicId) => {
    const response = await api.put(API_ENDPOINTS.BOOKINGS.ASSIGN(bookingId), {
      mechanicId,
    });

    return response.data;
  },

  // ==========================================
  // REJECT BOOKING
  // ADMIN USE
  // ==========================================

  rejectBooking: async (bookingId, reason) => {
    const response = await api.put(API_ENDPOINTS.BOOKINGS.REJECT(bookingId), {
      reason,
    });

    return response.data;
  },
  getUnpaidBookings: async ({ page = 0, size = 10 } = {}) => {
    const response = await api.get(API_ENDPOINTS.BOOKINGS.UNPAID, {
      params: {
        page,
        size,
      },
    });

    return response.data;
  },

  markBookingAsPaid: async (bookingId) => {
    const response = await api.put(API_ENDPOINTS.BOOKINGS.MARK_PAID(bookingId));

    return response.data;
  },

  // DELETE BOOKING
  // ADMIN USE
  deleteBooking: async (bookingId) => {
    const response = await api.delete(API_ENDPOINTS.BOOKINGS.BY_ID(bookingId));

    return response.data;
  },

  // CUSTOMER BOOKING APIs

  // Create Booking
  // Logged-in Customer
  createCustomerBooking: async (bookingData) => {
    const response = await api.post(
      API_ENDPOINTS.CUSTOMER_BOOKINGS.BASE,
      bookingData,
    );

    return response.data;
  },

  // Get My Bookings
  // Logged-in Customer
  getMyBookings: async ({ page = 0, size = 10 } = {}) => {
    const response = await api.get(API_ENDPOINTS.CUSTOMER_BOOKINGS.BASE, {
      params: {
        page,
        size,
      },
    });

    return response.data;
  },

  // Get My Booking By ID
  // Logged-in Customer
  getMyBookingById: async (bookingId) => {
    const response = await api.get(
      API_ENDPOINTS.CUSTOMER_BOOKINGS.BY_ID(bookingId),
    );

    return response.data;
  },
};

export default bookingApi;
