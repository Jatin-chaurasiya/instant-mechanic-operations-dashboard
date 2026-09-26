import { useCallback, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import bookingApi from "../../api/bookingApi";
import customerBookingReducer, {
  initialCustomerBookingState,
  CUSTOMER_BOOKING_ACTIONS,
} from "../../reducers/bookings/customerBookingReducer";

const PAGE_SIZE = 10;

const normalizePageResponse = (response) => {
  const data = response?.data ?? response;

  if (Array.isArray(data?.content)) {
    return {
      content: data.content,
      totalElements: data.totalElements ?? data.content.length,
      totalPages: data.totalPages ?? 1,
      currentPage: (data.number ?? 0) + 1,
      pageSize: data.size ?? PAGE_SIZE,
    };
  }

  if (Array.isArray(data?.data?.content)) {
    return {
      content: data.data.content,
      totalElements: data.data.totalElements ?? data.data.content.length,
      totalPages: data.data.totalPages ?? 1,
      currentPage: (data.data.number ?? 0) + 1,
      pageSize: data.data.size ?? PAGE_SIZE,
    };
  }

  if (Array.isArray(data)) {
    return {
      content: data,
      totalElements: data.length,
      totalPages: data.length > 0 ? 1 : 0,
      currentPage: 1,
      pageSize: PAGE_SIZE,
    };
  }

  if (Array.isArray(data?.bookings)) {
    return {
      content: data.bookings,
      totalElements: data.totalElements ?? data.bookings.length,
      totalPages: data.totalPages ?? (data.bookings.length > 0 ? 1 : 0),
      currentPage: data.currentPage ?? 1,
      pageSize: data.pageSize ?? PAGE_SIZE,
    };
  }

  return {
    content: [],
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: PAGE_SIZE,
  };
};

const useCustomerBooking = ({
  initialPage = 1,
  initialPageSize = PAGE_SIZE,
} = {}) => {
  const [state, dispatch] = useReducer(customerBookingReducer, {
    ...initialCustomerBookingState,
    currentPage: initialPage,
    pageSize: initialPageSize,
  });

  const {
    bookings,
    loading,
    error,

    currentPage,
    pageSize,
    totalPages,
    totalItems,

    selectedBooking,
    detailsLoading,
    detailsError,

    isCreateBookingOpen,

    selectedService,
    selectedVehicle,

    bookingDate,
    bookingTime,

    submitting,
    submitError,
    createdBooking,
  } = state;

  const loadBookings = useCallback(
    async (page = currentPage) => {
      try {
        dispatch({
          type: CUSTOMER_BOOKING_ACTIONS.FETCH_START,
        });

        const response = await bookingApi.getMyBookings({
          page: page - 1,
          size: pageSize,
        });

        const data = normalizePageResponse(response);

        dispatch({
          type: CUSTOMER_BOOKING_ACTIONS.FETCH_SUCCESS,
          payload: {
            bookings: data.content,
            currentPage: data.currentPage,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
            totalItems: data.totalElements,
          },
        });
      } catch (error) {
        console.error("Unable to load customer bookings:", error);

        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Unable to load bookings.";

        dispatch({
          type: CUSTOMER_BOOKING_ACTIONS.FETCH_ERROR,
          payload: message,
        });
      }
    },
    [currentPage, pageSize],
  );

  useEffect(() => {
    loadBookings(currentPage);
  }, [loadBookings, currentPage]);

  const handlePageChange = useCallback(
    (page) => {
      if (page < 1 || page > totalPages) {
        return;
      }

      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.SET_CURRENT_PAGE,
        payload: page,
      });
    },
    [totalPages],
  );

  const getBookingById = useCallback(async (bookingId) => {
    if (!bookingId) {
      return null;
    }

    try {
      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.DETAILS_START,
      });

      const response = await bookingApi.getMyBookingById(bookingId);

      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.DETAILS_SUCCESS,
        payload: response,
      });

      return response;
    } catch (error) {
      console.error("Unable to load booking details:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to load booking details.";

      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.DETAILS_ERROR,
        payload: message,
      });

      toast.error(message);

      return null;
    }
  }, []);

  const openCreateBooking = useCallback((service = null) => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.OPEN_CREATE_BOOKING,
    });

    if (service) {
      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.SET_SELECTED_SERVICE,
        payload: service,
      });
    }
  }, []);

  const closeCreateBooking = useCallback(() => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.CLOSE_CREATE_BOOKING,
    });
  }, []);

  const setSelectedService = useCallback((service) => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.SET_SELECTED_SERVICE,
      payload: service,
    });
  }, []);

  const setSelectedVehicle = useCallback((vehicle) => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.SET_SELECTED_VEHICLE,
      payload: vehicle,
    });
  }, []);

  const setBookingDate = useCallback((date) => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.SET_BOOKING_DATE,
      payload: date,
    });
  }, []);

  const setBookingTime = useCallback((time) => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.SET_BOOKING_TIME,
      payload: time,
    });
  }, []);

  const createCustomerBooking = useCallback(async () => {
    if (!selectedService?.id) {
      const message = "Please select a service.";

      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.CREATE_ERROR,
        payload: message,
      });

      toast.error(message);
      return null;
    }

    if (!selectedVehicle?.id) {
      const message = "Please select a vehicle.";

      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.CREATE_ERROR,
        payload: message,
      });

      toast.error(message);
      return null;
    }

    if (!bookingDate) {
      const message = "Please select a booking date.";

      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.CREATE_ERROR,
        payload: message,
      });

      toast.error(message);
      return null;
    }

    if (!bookingTime) {
      const message = "Please select a booking time.";

      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.CREATE_ERROR,
        payload: message,
      });

      toast.error(message);
      return null;
    }

    try {
      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.CREATE_START,
      });

      const bookingData = {
        vehicleId: Number(selectedVehicle.id),
        serviceId: Number(selectedService.id),
        bookingDate,
        bookingTime:
          bookingTime.length === 5 ? `${bookingTime}:00` : bookingTime,
      };

      const response = await bookingApi.createCustomerBooking(bookingData);

      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.CREATE_SUCCESS,
        payload: response,
      });

      return response;
    } catch (error) {
      console.error("Unable to create booking:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to create booking.";

      dispatch({
        type: CUSTOMER_BOOKING_ACTIONS.CREATE_ERROR,
        payload: message,
      });

      toast.error(message);

      return null;
    }
  }, [selectedService, selectedVehicle, bookingDate, bookingTime]);

  const refresh = useCallback(() => {
    return loadBookings(currentPage);
  }, [loadBookings, currentPage]);

  const clearError = useCallback(() => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.CLEAR_ERROR,
    });
  }, []);

  const clearDetailsError = useCallback(() => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.CLEAR_DETAILS_ERROR,
    });
  }, []);

  const clearSubmitError = useCallback(() => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.CLEAR_SUBMIT_ERROR,
    });
  }, []);

  const resetCreateForm = useCallback(() => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.RESET_CREATE_FORM,
    });
  }, []);

  const resetSelectedBooking = useCallback(() => {
    dispatch({
      type: CUSTOMER_BOOKING_ACTIONS.RESET_SELECTED_BOOKING,
    });
  }, []);

  return {
    bookings,
    loading,
    error,

    currentPage,
    pageSize,
    totalPages,
    totalItems,

    selectedBooking,
    detailsLoading,
    detailsError,

    isCreateBookingOpen,

    selectedService,
    selectedVehicle,

    bookingDate,
    bookingTime,

    submitting,
    submitError,
    createdBooking,

    loadBookings,
    refresh,
    handlePageChange,

    getBookingById,

    openCreateBooking,
    closeCreateBooking,

    setSelectedService,
    setSelectedVehicle,

    setBookingDate,
    setBookingTime,

    createCustomerBooking,

    clearError,
    clearDetailsError,
    clearSubmitError,

    resetCreateForm,
    resetSelectedBooking,
  };
};

export default useCustomerBooking;
