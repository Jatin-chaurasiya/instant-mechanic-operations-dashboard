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

    if (keyword) {
      params.keyword = keyword;
    }

    if (status) {
      params.status = status;
    }

    if (category) {
      params.category = category;
    }

    if (sortBy) {
      params.sortBy = sortBy;
    }

    if (sortOrder) {
      params.sortOrder = sortOrder;
    }

    const response = await api.get(
      API_ENDPOINTS.BOOKINGS.BASE,
      {
        params,
      }
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
      {
        status,
      }
    );

    return response.data;
  },
};

export default bookingApi;