import {
  useCallback,
  useEffect,
  useReducer,
} from "react";

import bookingApi from "../../api/bookingApi";
import useWebSocket from "../useWebSocket";

import bookingReducer, {
  initialBookingState,
  BOOKING_ACTIONS,
} from "../../reducers/booking/bookingReducer";

const useBookings = ({
  initialPage = 1,
  initialItemsPerPage = 10,
} = {}) => {
  // ==========================================
  // Booking State
  // ==========================================

  const [state, dispatch] = useReducer(
    bookingReducer,
    {
      ...initialBookingState,
      currentPage: initialPage,
      itemsPerPage: initialItemsPerPage,
    }
  );

  const {
    bookings,
    loading,
    refreshing,
    error,

    search,
    status,
    category,

    sortBy,
    sortOrder,

    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
  } = state;

  // ==========================================
  // Fetch bookings - REST
  // ==========================================

  const fetchBookings = useCallback(
    async (isInitialLoad = false) => {
      try {
        if (isInitialLoad) {
          dispatch({
            type: BOOKING_ACTIONS.SET_LOADING,
            payload: true,
          });
        } else {
          dispatch({
            type: BOOKING_ACTIONS.SET_REFRESHING,
            payload: true,
          });
        }

        dispatch({
          type: BOOKING_ACTIONS.SET_ERROR,
          payload: null,
        });

        const response =
          await bookingApi.getBookings({
            page: currentPage - 1,
            size: itemsPerPage,
            keyword:
              search.trim() || undefined,
            status:
              status || undefined,
            category:
              category || undefined,
            sortBy,
            sortOrder,
          });

        // =====================================
        // Backend response
        // =====================================

        dispatch({
          type: BOOKING_ACTIONS.SET_BOOKINGS,
          payload: Array.isArray(
            response?.bookings
          )
            ? response.bookings
            : [],
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_TOTAL_ITEMS,
          payload: Number(
            response?.totalElements || 0
          ),
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_TOTAL_PAGES,
          payload: Number(
            response?.totalPages || 1
          ),
        });

        // =====================================
        // Keep frontend page in valid range
        // =====================================

        const backendTotalPages =
          Number(
            response?.totalPages || 0
          );

        if (
          backendTotalPages > 0 &&
          currentPage > backendTotalPages
        ) {
          dispatch({
            type:
              BOOKING_ACTIONS.SET_CURRENT_PAGE,
            payload: backendTotalPages,
          });
        }
      } catch (err) {
        console.error(
          "Bookings error:",
          err
        );

        dispatch({
          type: BOOKING_ACTIONS.SET_ERROR,
          payload:
            err?.response?.data?.message ||
            err?.message ||
            "Unable to load bookings.",
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_BOOKINGS,
          payload: [],
        });

        dispatch({
          type:
            BOOKING_ACTIONS.SET_TOTAL_ITEMS,
          payload: 0,
        });

        dispatch({
          type:
            BOOKING_ACTIONS.SET_TOTAL_PAGES,
          payload: 1,
        });
      } finally {
        dispatch({
          type: BOOKING_ACTIONS.SET_LOADING,
          payload: false,
        });

        dispatch({
          type:
            BOOKING_ACTIONS.SET_REFRESHING,
          payload: false,
        });
      }
    },
    [
      currentPage,
      itemsPerPage,
      search,
      status,
      category,
      sortBy,
      sortOrder,
    ]
  );

  // ==========================================
  // Initial load + filters + sorting + page
  // ==========================================

  useEffect(() => {
    fetchBookings(true);
  }, [fetchBookings]);

  // ==========================================
  // WebSocket Live Updates
  // ==========================================

  const handleWebSocketMessage =
    useCallback((event) => {
      console.log(
        "Booking WebSocket Event:",
        event
      );

      if (
        event?.type ===
        "BOOKING_STATUS_CHANGED"
      ) {
        dispatch({
          type:
            BOOKING_ACTIONS.UPDATE_BOOKING_STATUS,
          payload: {
            bookingId: event.bookingId,
            status: event.status,
          },
        });
      }
    }, []);

  const {
    connected: webSocketConnected,
    error: webSocketError,
  } = useWebSocket({
    destination:
      "/topic/dashboard",
    onMessage:
      handleWebSocketMessage,
  });

  // ==========================================
  // Search
  // ==========================================

  const handleSearchChange =
    useCallback((value) => {
      dispatch({
        type: BOOKING_ACTIONS.SET_SEARCH,
        payload: value,
      });
    }, []);

  // ==========================================
  // Status filter
  // ==========================================

  const handleStatusChange =
    useCallback((value) => {
      dispatch({
        type: BOOKING_ACTIONS.SET_STATUS,
        payload: value,
      });
    }, []);

  // ==========================================
  // Category filter
  // ==========================================

  const handleCategoryChange =
    useCallback((value) => {
      dispatch({
        type: BOOKING_ACTIONS.SET_CATEGORY,
        payload: value,
      });
    }, []);

  // ==========================================
  // Sorting
  // ==========================================

  const handleSortChange =
    useCallback(
      (field, order) => {
        dispatch({
          type: BOOKING_ACTIONS.SET_SORT,
          payload: {
            sortBy: field,
            sortOrder: order || "desc",
          },
        });
      },
      []
    );

  // ==========================================
  // Pagination
  // ==========================================

  const handlePageChange =
    useCallback(
      (page) => {
        if (
          page < 1 ||
          page > totalPages
        ) {
          return;
        }

        dispatch({
          type:
            BOOKING_ACTIONS.SET_CURRENT_PAGE,
          payload: page,
        });
      },
      [totalPages]
    );

  // ==========================================
  // Reset filters
  // ==========================================

  const resetFilters =
    useCallback(() => {
      dispatch({
        type:
          BOOKING_ACTIONS.RESET_FILTERS,
      });
    }, []);

  // ==========================================
  // Manual REST refresh
  // ==========================================

  const refresh =
    useCallback(() => {
      return fetchBookings(false);
    }, [fetchBookings]);

  // ==========================================
  // Return
  // ==========================================

  return {
    bookings,

    // Kept for compatibility
    allBookings: bookings,

    loading,
    refreshing,
    error,

    search,
    status,
    category,

    sortBy,
    sortOrder,

    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,

    setSearch:
      handleSearchChange,

    setStatus:
      handleStatusChange,

    setCategory:
      handleCategoryChange,

    setSort:
      handleSortChange,

    setPage:
      handlePageChange,

    resetFilters,
    refresh,

    // WebSocket
    webSocketConnected,
    webSocketError,
  };
};

export default useBookings;