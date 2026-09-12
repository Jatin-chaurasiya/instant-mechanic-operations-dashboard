import {
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { toast } from "react-toastify";

import usePolling from "../usePolling";

import bookingApi from "../../api/bookingApi";
import serviceApi from "../../api/serviceApi";

import bookingReducer, {
  initialBookingState,
  BOOKING_ACTIONS,
} from "../../reducers/bookings/bookingReducer"

// ======================================================
// Normalize API Page Response
// ======================================================

const normalizePageResponse = (response) => {
  const data = response?.data ?? response;

  // Spring Page response
  if (Array.isArray(data?.content)) {
    return {
      content: data.content,
      totalElements:
        data.totalElements ??
        data.content.length,
      totalPages:
        data.totalPages ?? 1,
    };
  }

  // Wrapped Spring Page response
  if (Array.isArray(data?.data?.content)) {
    return {
      content: data.data.content,
      totalElements:
        data.data.totalElements ??
        data.data.content.length,
      totalPages:
        data.data.totalPages ?? 1,
    };
  }

  // Plain array response
  if (Array.isArray(data)) {
    return {
      content: data,
      totalElements: data.length,
      totalPages:
        data.length > 0 ? 1 : 0,
    };
  }

  // Wrapped array response
  if (Array.isArray(data?.bookings)) {
    return {
      content: data.bookings,
      totalElements:
        data.totalElements ??
        data.bookings.length,
      totalPages:
        data.totalPages ??
        (data.bookings.length > 0
          ? 1
          : 0),
    };
  }

  return {
    content: [],
    totalElements: 0,
    totalPages: 0,
  };
};

// ======================================================
// useBookings
// ======================================================

const useBookings = ({
  autoRefresh = true,
  refreshInterval = 30000,
  initialPage = 1,
  initialItemsPerPage = 10,
} = {}) => {
  // ======================================================
  // Reducer
  // ======================================================

  const [state, dispatch] = useReducer(
    bookingReducer,
    {
      ...initialBookingState,
      currentPage: initialPage,
      itemsPerPage: initialItemsPerPage,
    }
  );

  // ======================================================
  // State Destructuring
  // ======================================================

  const {
    // All bookings
    bookings,
    loading,
    refreshing,
    error,

    // Filters
    search,
    status,
    category,

    // Sorting
    sortBy,
    sortOrder,

    // Pagination
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,

    // Categories
    categories,

    // Section
    activeSection,

    // Pending
    pendingBookings,
    pendingCount,
    pendingPage,
    pendingTotalPages,

    // Active
    activeBookings,
    activeCount,
    activePage,
    activeTotalPages,

    // Section loading/error
    sectionLoading,
    sectionError,

    // Add booking
    isAddBookingOpen,

    // Assign booking
    isAssignBookingOpen,
    selectedBooking,

    // Delete
    deleteBookingTarget,
    deletingBooking,
  } = state;

  // ======================================================
  // Fetch All Bookings
  // ======================================================

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

        // Backend response
        dispatch({
          type: BOOKING_ACTIONS.SET_BOOKINGS,
          payload:
            Array.isArray(
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

        // Keep frontend page valid
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
            payload:
              backendTotalPages,
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

  // ======================================================
  // Initial Load + Filters + Sorting + Page
  // ======================================================

  useEffect(() => {
    fetchBookings(true);
  }, [fetchBookings]);

  // ======================================================
  // Automatic Polling
  // ======================================================

  usePolling(
    () => fetchBookings(false),
    refreshInterval,
    autoRefresh
  );

  // ======================================================
  // Load Categories
  // ======================================================

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data =
          await serviceApi.getCategories();

        dispatch({
          type:
            BOOKING_ACTIONS.SET_CATEGORIES,
          payload:
            Array.isArray(data)
              ? data
              : [],
        });
      } catch (error) {
        console.error(
          "Unable to load service categories:",
          error
        );

        dispatch({
          type:
            BOOKING_ACTIONS.SET_CATEGORIES,
          payload: [],
        });
      }
    };

    loadCategories();
  }, []);

  // ======================================================
  // Load Pending Bookings
  // ======================================================

  const loadPendingBookings =
    useCallback(
      async (page = pendingPage) => {
        try {
          dispatch({
            type:
              BOOKING_ACTIONS.SET_SECTION_LOADING,
            payload: true,
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_SECTION_ERROR,
            payload: "",
          });

          const response =
            await bookingApi.getPendingAssignments({
              page,
              size: itemsPerPage,
            });

          const data =
            normalizePageResponse(
              response
            );

          dispatch({
            type:
              BOOKING_ACTIONS.SET_PENDING_BOOKINGS,
            payload: data.content,
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_PENDING_COUNT,
            payload: data.totalElements,
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_PENDING_TOTAL_PAGES,
            payload: data.totalPages,
          });
        } catch (error) {
          console.error(
            "Unable to load pending bookings:",
            error
          );

          dispatch({
            type:
              BOOKING_ACTIONS.SET_SECTION_ERROR,
            payload:
              error?.response?.data?.message ||
              "Unable to load pending bookings.",
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_PENDING_BOOKINGS,
            payload: [],
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_PENDING_COUNT,
            payload: 0,
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_PENDING_TOTAL_PAGES,
            payload: 0,
          });
        } finally {
          dispatch({
            type:
              BOOKING_ACTIONS.SET_SECTION_LOADING,
            payload: false,
          });
        }
      },
      [
        pendingPage,
        itemsPerPage,
      ]
    );

  // ======================================================
  // Load Active Bookings
  // ======================================================

  const loadActiveBookings =
    useCallback(
      async (page = activePage) => {
        try {
          dispatch({
            type:
              BOOKING_ACTIONS.SET_SECTION_LOADING,
            payload: true,
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_SECTION_ERROR,
            payload: "",
          });

          const response =
            await bookingApi.getActiveBookings({
              page,
              size: itemsPerPage,
            });

          const data =
            normalizePageResponse(
              response
            );

          dispatch({
            type:
              BOOKING_ACTIONS.SET_ACTIVE_BOOKINGS,
            payload: data.content,
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_ACTIVE_COUNT,
            payload: data.totalElements,
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_ACTIVE_TOTAL_PAGES,
            payload: data.totalPages,
          });
        } catch (error) {
          console.error(
            "Unable to load active bookings:",
            error
          );

          dispatch({
            type:
              BOOKING_ACTIONS.SET_SECTION_ERROR,
            payload:
              error?.response?.data?.message ||
              "Unable to load active bookings.",
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_ACTIVE_BOOKINGS,
            payload: [],
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_ACTIVE_COUNT,
            payload: 0,
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_ACTIVE_TOTAL_PAGES,
            payload: 0,
          });
        } finally {
          dispatch({
            type:
              BOOKING_ACTIONS.SET_SECTION_LOADING,
            payload: false,
          });
        }
      },
      [
        activePage,
        itemsPerPage,
      ]
    );

  // ======================================================
  // Load Current Section
  // ======================================================

  useEffect(() => {
    if (
      activeSection === "pending"
    ) {
      loadPendingBookings(
        pendingPage
      );
    }
  }, [
    activeSection,
    pendingPage,
    loadPendingBookings,
  ]);

  useEffect(() => {
    if (
      activeSection === "active"
    ) {
      loadActiveBookings(
        activePage
      );
    }
  }, [
    activeSection,
    activePage,
    loadActiveBookings,
  ]);

  // ======================================================
  // Initial Pending / Active Counts
  // ======================================================

  useEffect(() => {
    const loadSectionCounts =
      async () => {
        try {
          const [
            pendingResponse,
            activeResponse,
          ] = await Promise.all([
            bookingApi.getPendingAssignments({
              page: 0,
              size: 1,
            }),

            bookingApi.getActiveBookings({
              page: 0,
              size: 1,
            }),
          ]);

          const pendingData =
            normalizePageResponse(
              pendingResponse
            );

          const activeData =
            normalizePageResponse(
              activeResponse
            );

          dispatch({
            type:
              BOOKING_ACTIONS.SET_PENDING_COUNT,
            payload:
              pendingData.totalElements,
          });

          dispatch({
            type:
              BOOKING_ACTIONS.SET_ACTIVE_COUNT,
            payload:
              activeData.totalElements,
          });
        } catch (error) {
          console.error(
            "Unable to load booking section counts:",
            error
          );
        }
      };

    loadSectionCounts();
  }, []);

  // ======================================================
  // Search
  // ======================================================

  const handleSearchChange =
    useCallback((value) => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_SEARCH,
        payload: value,
      });
    }, []);

  // ======================================================
  // Status Filter
  // ======================================================

  const handleStatusChange =
    useCallback((value) => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_STATUS,
        payload: value,
      });
    }, []);

  // ======================================================
  // Category Filter
  // ======================================================

  const handleCategoryChange =
    useCallback((value) => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_CATEGORY,
        payload: value,
      });
    }, []);

  // ======================================================
  // Sorting
  // ======================================================

  const handleSortChange =
    useCallback(
      (field, order) => {
        dispatch({
          type:
            BOOKING_ACTIONS.SET_SORT,
          payload: {
            sortBy: field,
            sortOrder:
              order || "desc",
          },
        });
      },
      []
    );

  // ======================================================
  // All Bookings Pagination
  // ======================================================

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

  // ======================================================
  // Reset Filters
  // ======================================================

  const resetFilters =
    useCallback(() => {
      dispatch({
        type:
          BOOKING_ACTIONS.RESET_FILTERS,
      });
    }, []);

  // ======================================================
  // Section Change
  // ======================================================

  const handleSectionChange =
    useCallback((section) => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_ACTIVE_SECTION,
        payload: section,
      });

      dispatch({
        type:
          BOOKING_ACTIONS.SET_SECTION_ERROR,
        payload: "",
      });

      if (section === "pending") {
        dispatch({
          type:
            BOOKING_ACTIONS.SET_PENDING_PAGE,
          payload: 0,
        });
      }

      if (section === "active") {
        dispatch({
          type:
            BOOKING_ACTIONS.SET_ACTIVE_PAGE,
          payload: 0,
        });
      }
    }, []);

  // ======================================================
  // Pending Pagination
  // ======================================================

  const handlePendingPageChange =
    useCallback((page) => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_PENDING_PAGE,
        payload: page,
      });
    }, []);

  // ======================================================
  // Active Pagination
  // ======================================================

  const handleActivePageChange =
    useCallback((page) => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_ACTIVE_PAGE,
        payload: page,
      });
    }, []);

  // ======================================================
  // Assign Booking
  // ======================================================

  const handleAssignClick =
    useCallback((booking) => {
      if (!booking?.id) {
        return;
      }

      dispatch({
        type:
          BOOKING_ACTIONS.SET_SELECTED_BOOKING,
        payload: booking,
      });

      dispatch({
        type:
          BOOKING_ACTIONS.SET_ASSIGN_BOOKING_OPEN,
        payload: true,
      });
    }, []);

  // ======================================================
  // Close Assign Modal
  // ======================================================

  const handleCloseAssignModal =
    useCallback(() => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_ASSIGN_BOOKING_OPEN,
        payload: false,
      });

      dispatch({
        type:
          BOOKING_ACTIONS.SET_SELECTED_BOOKING,
        payload: null,
      });
    }, []);

  // ======================================================
  // Refresh Counts
  // ======================================================

  const refreshSectionCounts =
    useCallback(async () => {
      try {
        const [
          pendingResponse,
          activeResponse,
        ] = await Promise.all([
          bookingApi.getPendingAssignments({
            page: 0,
            size: 1,
          }),

          bookingApi.getActiveBookings({
            page: 0,
            size: 1,
          }),
        ]);

        const pendingData =
          normalizePageResponse(
            pendingResponse
          );

        const activeData =
          normalizePageResponse(
            activeResponse
          );

        dispatch({
          type:
            BOOKING_ACTIONS.SET_PENDING_COUNT,
          payload:
            pendingData.totalElements,
        });

        dispatch({
          type:
            BOOKING_ACTIONS.SET_ACTIVE_COUNT,
          payload:
            activeData.totalElements,
        });
      } catch (error) {
        console.error(
          "Unable to refresh booking counts:",
          error
        );
      }
    }, []);

  // ======================================================
  // Assignment Successful
  // ======================================================

  const handleAssigned =
    useCallback(async () => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_ASSIGN_BOOKING_OPEN,
        payload: false,
      });

      dispatch({
        type:
          BOOKING_ACTIONS.SET_SELECTED_BOOKING,
        payload: null,
      });

      // Refresh All
      await fetchBookings(false);

      // Refresh Pending
      await loadPendingBookings(
        pendingPage
      );

      // Refresh Active
      await loadActiveBookings(
        activePage
      );

      // Refresh Counts
      await refreshSectionCounts();
    }, [
      fetchBookings,
      loadPendingBookings,
      loadActiveBookings,
      pendingPage,
      activePage,
      refreshSectionCounts,
    ]);

  // ======================================================
  // Delete Booking
  // ======================================================

  const handleDeleteBooking =
    useCallback((booking) => {
      if (!booking?.id) {
        return;
      }

      dispatch({
        type:
          BOOKING_ACTIONS.SET_DELETE_BOOKING_TARGET,
        payload: booking,
      });
    }, []);

  // ======================================================
  // Confirm Delete Booking
  // ======================================================

  const handleConfirmDeleteBooking =
    useCallback(async () => {
      if (!deleteBookingTarget?.id) {
        return;
      }

      try {
        dispatch({
          type:
            BOOKING_ACTIONS.SET_DELETING_BOOKING,
          payload: true,
        });

        await bookingApi.deleteBooking(
          deleteBookingTarget.id
        );

        dispatch({
          type:
            BOOKING_ACTIONS.SET_DELETE_BOOKING_TARGET,
          payload: null,
        });

        toast.success(
          "Booking deleted successfully."
        );

        // Refresh All
        await fetchBookings(false);

        // Refresh Pending
        await loadPendingBookings(
          pendingPage
        );

        // Refresh Active
        await loadActiveBookings(
          activePage
        );
      } catch (error) {
        console.error(
          "Unable to delete booking:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Unable to delete booking."
        );
      } finally {
        dispatch({
          type:
            BOOKING_ACTIONS.SET_DELETING_BOOKING,
          payload: false,
        });
      }
    }, [
      deleteBookingTarget,
      fetchBookings,
      loadPendingBookings,
      loadActiveBookings,
      pendingPage,
      activePage,
    ]);

  // ======================================================
  // Close Delete Modal
  // ======================================================

  const handleCloseDeleteModal =
    useCallback(() => {
      if (deletingBooking) {
        return;
      }

      dispatch({
        type:
          BOOKING_ACTIONS.SET_DELETE_BOOKING_TARGET,
        payload: null,
      });
    }, [deletingBooking]);

  // ======================================================
  // Add Booking Modal
  // ======================================================

  const openAddBooking =
    useCallback(() => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_ADD_BOOKING_OPEN,
        payload: true,
      });
    }, []);

  const closeAddBooking =
    useCallback(() => {
      dispatch({
        type:
          BOOKING_ACTIONS.SET_ADD_BOOKING_OPEN,
        payload: false,
      });
    }, []);

  // ======================================================
  // Add Booking
  // ======================================================

  const handleAddBooking =
    useCallback(
      async (bookingData) => {
        try {
          await bookingApi.createBooking(
            bookingData
          );

          dispatch({
            type:
              BOOKING_ACTIONS.SET_ADD_BOOKING_OPEN,
            payload: false,
          });

          toast.success(
            "Booking created successfully."
          );

          // Refresh All
          await fetchBookings(false);

          // Refresh Pending
          await loadPendingBookings(
            pendingPage
          );

          // Refresh Active
          await loadActiveBookings(
            activePage
          );
        } catch (error) {
          console.error(
            "Unable to create booking:",
            error
          );

          toast.error(
            error?.response?.data?.message ||
              "Unable to create booking."
          );
        }
      },
      [
        fetchBookings,
        loadPendingBookings,
        loadActiveBookings,
        pendingPage,
        activePage,
      ]
    );

  // ======================================================
  // Refresh Current Section
  // ======================================================

  const refreshCurrentSection =
    useCallback(async () => {
      if (
        activeSection === "all"
      ) {
        await fetchBookings(false);
        return;
      }

      if (
        activeSection === "pending"
      ) {
        await loadPendingBookings(
          pendingPage
        );
        return;
      }

      if (
        activeSection === "active"
      ) {
        await loadActiveBookings(
          activePage
        );
      }
    }, [
      activeSection,
      fetchBookings,
      loadPendingBookings,
      loadActiveBookings,
      pendingPage,
      activePage,
    ]);

  // ======================================================
  // Current Section Data
  // ======================================================

  let sectionBookings = bookings;
  let sectionCurrentPage =
    currentPage;
  let sectionTotalPages =
    totalPages;
  let sectionTotalItems =
    totalItems;
  let sectionIsLoading =
    loading;
  let sectionErrorMessage =
    error;

  if (
    activeSection === "pending"
  ) {
    sectionBookings =
      pendingBookings;

    sectionCurrentPage =
      pendingPage;

    sectionTotalPages =
      pendingTotalPages;

    sectionTotalItems =
      pendingCount;

    sectionIsLoading =
      sectionLoading;

    sectionErrorMessage =
      sectionError;
  }

  if (
    activeSection === "active"
  ) {
    sectionBookings =
      activeBookings;

    sectionCurrentPage =
      activePage;

    sectionTotalPages =
      activeTotalPages;

    sectionTotalItems =
      activeCount;

    sectionIsLoading =
      sectionLoading;

    sectionErrorMessage =
      sectionError;
  }

  // ======================================================
  // Current Section Pagination
  // ======================================================

  const handleCurrentSectionPageChange =
    useCallback(
      (page) => {
        if (
          activeSection === "all"
        ) {
          handlePageChange(page);
          return;
        }

        if (
          activeSection === "pending"
        ) {
          if (
            page < 1 ||
            page > pendingTotalPages
          ) {
            return;
          }

          handlePendingPageChange(
            page
          );
          return;
        }

        if (
          activeSection === "active"
        ) {
          if (
            page < 1 ||
            page > activeTotalPages
          ) {
            return;
          }

          handleActivePageChange(
            page
          );
        }
      },
      [
        activeSection,
        handlePageChange,
        handlePendingPageChange,
        handleActivePageChange,
        pendingTotalPages,
        activeTotalPages,
      ]
    );

  // ======================================================
  // Manual Refresh
  // ======================================================

  const refresh =
    useCallback(() => {
      return fetchBookings(false);
    }, [fetchBookings]);

  // ======================================================
  // Return
  // ======================================================

  return {
    // ==========================================
    // All Bookings
    // ==========================================

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

    // ==========================================
    // Categories
    // ==========================================

    categories,

    // ==========================================
    // Existing handlers
    // ==========================================

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

    // ==========================================
    // Sections
    // ==========================================

    activeSection,

    pendingBookings,
    pendingCount,
    pendingPage,
    pendingTotalPages,

    activeBookings,
    activeCount,
    activePage,
    activeTotalPages,

    sectionLoading,
    sectionError,

    sectionBookings,
    sectionCurrentPage,
    sectionTotalPages,
    sectionTotalItems,
    sectionIsLoading,
    sectionErrorMessage,

    handleSectionChange,
    handleCurrentSectionPageChange,

    loadPendingBookings,
    loadActiveBookings,

    // ==========================================
    // Add Booking
    // ==========================================

    isAddBookingOpen,

    openAddBooking,
    closeAddBooking,
    handleAddBooking,

    // ==========================================
    // Assign Booking
    // ==========================================

    isAssignBookingOpen,
    selectedBooking,

    handleAssignClick,
    handleAssigned,
    handleCloseAssignModal,

    // ==========================================
    // Delete Booking
    // ==========================================

    deleteBookingTarget,
    deletingBooking,

    handleDeleteBooking,
    handleConfirmDeleteBooking,
    handleCloseDeleteModal,
  };
};

export default useBookings;