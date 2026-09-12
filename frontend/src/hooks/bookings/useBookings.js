import { useCallback, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import usePolling from "../usePolling";

import bookingApi from "../../api/bookingApi";
import serviceApi from "../../api/serviceApi";
import customerApi from "../../api/customerApi";
import vehicleApi from "../../api/vehicleApi";
import mechanicApi from "../../api/mechanicApi";

import bookingReducer, {
  initialBookingState,
  BOOKING_ACTIONS,
} from "../../reducers/bookings/bookingReducer";

const CUSTOMER_PAGE_SIZE = 10;
const VEHICLE_PAGE_SIZE = 10;
const MECHANIC_PAGE_SIZE = 10;

const normalizePageResponse = (response) => {
  const data = response?.data ?? response;

  if (Array.isArray(data?.content)) {
    return {
      content: data.content,
      totalElements: data.totalElements ?? data.content.length,
      totalPages: data.totalPages ?? 1,
    };
  }

  if (Array.isArray(data?.data?.content)) {
    return {
      content: data.data.content,
      totalElements: data.data.totalElements ?? data.data.content.length,
      totalPages: data.data.totalPages ?? 1,
    };
  }

  if (Array.isArray(data)) {
    return {
      content: data,
      totalElements: data.length,
      totalPages: data.length > 0 ? 1 : 0,
    };
  }

  if (Array.isArray(data?.bookings)) {
    return {
      content: data.bookings,
      totalElements: data.totalElements ?? data.bookings.length,
      totalPages:
        data.totalPages ??
        (data.bookings.length > 0 ? 1 : 0),
    };
  }

  return {
    content: [],
    totalElements: 0,
    totalPages: 0,
  };
};

const useBookings = ({
  autoRefresh = true,
  refreshInterval = 30000,
  initialPage = 1,
  initialItemsPerPage = 10,
} = {}) => {
  const [state, dispatch] = useReducer(bookingReducer, {
    ...initialBookingState,
    currentPage: initialPage,
    itemsPerPage: initialItemsPerPage,
  });

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
    itemsPerPage,
    totalPages,
    totalItems,

    categories,

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

    isAddBookingOpen,

    customers,
    vehicles,
    services,
    mechanics,

    customerId,
    vehicleId,
    serviceId,
    mechanicId,

    bookingDate,
    bookingTime,
    amount,

    customerSearch,
    vehicleSearch,

    loadingCustomers,
    loadingVehicles,
    loadingServices,
    loadingMechanics,

    submitting,

    isAssignBookingOpen,
    selectedBooking,

    deleteBookingTarget,
    deletingBooking,
  } = state;

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

        const response = await bookingApi.getBookings({
          page: currentPage - 1,
          size: itemsPerPage,
          keyword: search.trim() || undefined,
          status: status || undefined,
          category: category || undefined,
          sortBy,
          sortOrder,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_BOOKINGS,
          payload: Array.isArray(response?.bookings)
            ? response.bookings
            : [],
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_TOTAL_ITEMS,
          payload: Number(response?.totalElements || 0),
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_TOTAL_PAGES,
          payload: Number(response?.totalPages || 1),
        });

        const backendTotalPages = Number(
          response?.totalPages || 0
        );

        if (
          backendTotalPages > 0 &&
          currentPage > backendTotalPages
        ) {
          dispatch({
            type: BOOKING_ACTIONS.SET_CURRENT_PAGE,
            payload: backendTotalPages,
          });
        }
      } catch (err) {
        console.error("Bookings error:", err);

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
          type: BOOKING_ACTIONS.SET_TOTAL_ITEMS,
          payload: 0,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_TOTAL_PAGES,
          payload: 1,
        });
      } finally {
        dispatch({
          type: BOOKING_ACTIONS.SET_LOADING,
          payload: false,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_REFRESHING,
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

  useEffect(() => {
    fetchBookings(true);
  }, [fetchBookings]);

  usePolling(
    () => fetchBookings(false),
    refreshInterval,
    autoRefresh
  );

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await serviceApi.getCategories();

        dispatch({
          type: BOOKING_ACTIONS.SET_CATEGORIES,
          payload: Array.isArray(data) ? data : [],
        });
      } catch (error) {
        console.error(
          "Unable to load service categories:",
          error
        );

        dispatch({
          type: BOOKING_ACTIONS.SET_CATEGORIES,
          payload: [],
        });
      }
    };

    loadCategories();
  }, []);

  const loadPendingBookings = useCallback(
    async (page = pendingPage) => {
      try {
        dispatch({
          type: BOOKING_ACTIONS.SET_SECTION_LOADING,
          payload: true,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_SECTION_ERROR,
          payload: "",
        });

        const response =
          await bookingApi.getPendingAssignments({
            page,
            size: itemsPerPage,
          });

        const data = normalizePageResponse(response);

        dispatch({
          type: BOOKING_ACTIONS.SET_PENDING_BOOKINGS,
          payload: data.content,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_PENDING_COUNT,
          payload: data.totalElements,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_PENDING_TOTAL_PAGES,
          payload: data.totalPages,
        });
      } catch (error) {
        console.error(
          "Unable to load pending bookings:",
          error
        );

        dispatch({
          type: BOOKING_ACTIONS.SET_SECTION_ERROR,
          payload:
            error?.response?.data?.message ||
            "Unable to load pending bookings.",
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_PENDING_BOOKINGS,
          payload: [],
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_PENDING_COUNT,
          payload: 0,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_PENDING_TOTAL_PAGES,
          payload: 0,
        });
      } finally {
        dispatch({
          type: BOOKING_ACTIONS.SET_SECTION_LOADING,
          payload: false,
        });
      }
    },
    [pendingPage, itemsPerPage]
  );

  const loadActiveBookings = useCallback(
    async (page = activePage) => {
      try {
        dispatch({
          type: BOOKING_ACTIONS.SET_SECTION_LOADING,
          payload: true,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_SECTION_ERROR,
          payload: "",
        });

        const response =
          await bookingApi.getActiveBookings({
            page,
            size: itemsPerPage,
          });

        const data = normalizePageResponse(response);

        dispatch({
          type: BOOKING_ACTIONS.SET_ACTIVE_BOOKINGS,
          payload: data.content,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_ACTIVE_COUNT,
          payload: data.totalElements,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_ACTIVE_TOTAL_PAGES,
          payload: data.totalPages,
        });
      } catch (error) {
        console.error(
          "Unable to load active bookings:",
          error
        );

        dispatch({
          type: BOOKING_ACTIONS.SET_SECTION_ERROR,
          payload:
            error?.response?.data?.message ||
            "Unable to load active bookings.",
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_ACTIVE_BOOKINGS,
          payload: [],
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_ACTIVE_COUNT,
          payload: 0,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_ACTIVE_TOTAL_PAGES,
          payload: 0,
        });
      } finally {
        dispatch({
          type: BOOKING_ACTIONS.SET_SECTION_LOADING,
          payload: false,
        });
      }
    },
    [activePage, itemsPerPage]
  );

  useEffect(() => {
    if (activeSection === "pending") {
      loadPendingBookings(pendingPage);
    }
  }, [
    activeSection,
    pendingPage,
    loadPendingBookings,
  ]);

  useEffect(() => {
    if (activeSection === "active") {
      loadActiveBookings(activePage);
    }
  }, [
    activeSection,
    activePage,
    loadActiveBookings,
  ]);

  useEffect(() => {
    const loadSectionCounts = async () => {
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
          normalizePageResponse(pendingResponse);

        const activeData =
          normalizePageResponse(activeResponse);

        dispatch({
          type: BOOKING_ACTIONS.SET_PENDING_COUNT,
          payload: pendingData.totalElements,
        });

        dispatch({
          type: BOOKING_ACTIONS.SET_ACTIVE_COUNT,
          payload: activeData.totalElements,
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

  const handleSearchChange = useCallback((value) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_SEARCH,
      payload: value,
    });
  }, []);

  const handleStatusChange = useCallback((value) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_STATUS,
      payload: value,
    });
  }, []);

  const handleCategoryChange = useCallback((value) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_CATEGORY,
      payload: value,
    });
  }, []);

  const handleSortChange = useCallback(
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

  const handlePageChange = useCallback(
    (page) => {
      if (page < 1 || page > totalPages) {
        return;
      }

      dispatch({
        type: BOOKING_ACTIONS.SET_CURRENT_PAGE,
        payload: page,
      });
    },
    [totalPages]
  );

  const resetFilters = useCallback(() => {
    dispatch({
      type: BOOKING_ACTIONS.RESET_FILTERS,
    });
  }, []);

  const handleSectionChange = useCallback((section) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_ACTIVE_SECTION,
      payload: section,
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_SECTION_ERROR,
      payload: "",
    });

    if (section === "pending") {
      dispatch({
        type: BOOKING_ACTIONS.SET_PENDING_PAGE,
        payload: 0,
      });
    }

    if (section === "active") {
      dispatch({
        type: BOOKING_ACTIONS.SET_ACTIVE_PAGE,
        payload: 0,
      });
    }
  }, []);

  const handlePendingPageChange = useCallback((page) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_PENDING_PAGE,
      payload: page,
    });
  }, []);

  const handleActivePageChange = useCallback((page) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_ACTIVE_PAGE,
      payload: page,
    });
  }, []);

  const handleAssignClick = useCallback((booking) => {
    if (!booking?.id) {
      return;
    }

    dispatch({
      type: BOOKING_ACTIONS.SET_SELECTED_BOOKING,
      payload: booking,
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_ASSIGN_BOOKING_OPEN,
      payload: true,
    });
  }, []);

  const handleCloseAssignModal = useCallback(() => {
    dispatch({
      type: BOOKING_ACTIONS.SET_ASSIGN_BOOKING_OPEN,
      payload: false,
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_SELECTED_BOOKING,
      payload: null,
    });
  }, []);

  const refreshSectionCounts = useCallback(async () => {
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
        normalizePageResponse(pendingResponse);

      const activeData =
        normalizePageResponse(activeResponse);

      dispatch({
        type: BOOKING_ACTIONS.SET_PENDING_COUNT,
        payload: pendingData.totalElements,
      });

      dispatch({
        type: BOOKING_ACTIONS.SET_ACTIVE_COUNT,
        payload: activeData.totalElements,
      });
    } catch (error) {
      console.error(
        "Unable to refresh booking counts:",
        error
      );
    }
  }, []);

  const handleAssigned = useCallback(async () => {
    dispatch({
      type: BOOKING_ACTIONS.SET_ASSIGN_BOOKING_OPEN,
      payload: false,
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_SELECTED_BOOKING,
      payload: null,
    });

    await fetchBookings(false);
    await loadPendingBookings(pendingPage);
    await loadActiveBookings(activePage);
    await refreshSectionCounts();
  }, [
    fetchBookings,
    loadPendingBookings,
    loadActiveBookings,
    pendingPage,
    activePage,
    refreshSectionCounts,
  ]);

  const handleDeleteBooking = useCallback((booking) => {
    if (!booking?.id) {
      return;
    }

    dispatch({
      type: BOOKING_ACTIONS.SET_DELETE_BOOKING_TARGET,
      payload: booking,
    });
  }, []);

  const handleConfirmDeleteBooking =
    useCallback(async () => {
      if (!deleteBookingTarget?.id) {
        return;
      }

      try {
        dispatch({
          type: BOOKING_ACTIONS.SET_DELETING_BOOKING,
          payload: true,
        });

        await bookingApi.deleteBooking(
          deleteBookingTarget.id
        );

        dispatch({
          type: BOOKING_ACTIONS.SET_DELETE_BOOKING_TARGET,
          payload: null,
        });

        toast.success("Booking deleted successfully.");

        await fetchBookings(false);
        await loadPendingBookings(pendingPage);
        await loadActiveBookings(activePage);
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
          type: BOOKING_ACTIONS.SET_DELETING_BOOKING,
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

  const handleCloseDeleteModal = useCallback(() => {
    if (deletingBooking) {
      return;
    }

    dispatch({
      type: BOOKING_ACTIONS.SET_DELETE_BOOKING_TARGET,
      payload: null,
    });
  }, [deletingBooking]);

  const openAddBooking = useCallback(() => {
    dispatch({
      type: BOOKING_ACTIONS.SET_ADD_BOOKING_OPEN,
      payload: true,
    });
  }, []);

  const closeAddBooking = useCallback(() => {
    dispatch({
      type: BOOKING_ACTIONS.SET_ADD_BOOKING_OPEN,
      payload: false,
    });
  }, []);

  const loadCustomers = useCallback(
    async (page = 0, keyword = "") => {
      try {
        dispatch({
          type: BOOKING_ACTIONS.SET_LOADING_CUSTOMERS,
          payload: true,
        });

        const response =
          await customerApi.getCustomers({
            page,
            size: CUSTOMER_PAGE_SIZE,
            keyword: keyword.trim(),
          });

        dispatch({
          type: BOOKING_ACTIONS.SET_CUSTOMERS,
          payload: Array.isArray(response?.content)
            ? response.content
            : [],
        });
      } catch (error) {
        console.error(
          "Unable to load customers:",
          error
        );

        const message =
          error?.response?.data?.message ||
          "Unable to load customers.";

        toast.error(message);

        dispatch({
          type: BOOKING_ACTIONS.SET_CUSTOMERS,
          payload: [],
        });
      } finally {
        dispatch({
          type: BOOKING_ACTIONS.SET_LOADING_CUSTOMERS,
          payload: false,
        });
      }
    },
    []
  );

  const loadServices = useCallback(async () => {
    try {
      dispatch({
        type: BOOKING_ACTIONS.SET_LOADING_SERVICES,
        payload: true,
      });

      const response = await serviceApi.getServices();

      dispatch({
        type: BOOKING_ACTIONS.SET_SERVICES,
        payload: Array.isArray(response)
          ? response
          : Array.isArray(response?.content)
          ? response.content
          : [],
      });
    } catch (error) {
      console.error(
        "Unable to load services:",
        error
      );

      const message =
        error?.response?.data?.message ||
        "Unable to load services.";

      toast.error(message);

      dispatch({
        type: BOOKING_ACTIONS.SET_SERVICES,
        payload: [],
      });
    } finally {
      dispatch({
        type: BOOKING_ACTIONS.SET_LOADING_SERVICES,
        payload: false,
      });
    }
  }, []);

  const loadMechanics = useCallback(async () => {
    try {
      dispatch({
        type: BOOKING_ACTIONS.SET_LOADING_MECHANICS,
        payload: true,
      });

      const response =
        await mechanicApi.getAvailableMechanics({
          page: 0,
          size: MECHANIC_PAGE_SIZE,
        });

      dispatch({
        type: BOOKING_ACTIONS.SET_MECHANICS,
        payload: Array.isArray(response?.content)
          ? response.content
          : [],
      });
    } catch (error) {
      console.error(
        "Unable to load mechanics:",
        error
      );

      const message =
        error?.response?.data?.message ||
        "Unable to load available mechanics.";

      toast.error(message);

      dispatch({
        type: BOOKING_ACTIONS.SET_MECHANICS,
        payload: [],
      });
    } finally {
      dispatch({
        type: BOOKING_ACTIONS.SET_LOADING_MECHANICS,
        payload: false,
      });
    }
  }, []);

  useEffect(() => {
    if (!isAddBookingOpen) {
      return;
    }

    dispatch({
      type: BOOKING_ACTIONS.SET_CUSTOMER_SEARCH,
      payload: "",
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_VEHICLE_SEARCH,
      payload: "",
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_CUSTOMER_ID,
      payload: "",
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_VEHICLE_ID,
      payload: "",
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_SERVICE_ID,
      payload: "",
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_MECHANIC_ID,
      payload: "",
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_BOOKING_DATE,
      payload: "",
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_BOOKING_TIME,
      payload: "",
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_AMOUNT,
      payload: "",
    });

    loadCustomers(0, "");
    loadServices();
    loadMechanics();
  }, [
    isAddBookingOpen,
    loadCustomers,
    loadServices,
    loadMechanics,
  ]);

  const handleCustomerSearch = useCallback(
    async (event) => {
      const value = event.target.value;

      dispatch({
        type: BOOKING_ACTIONS.SET_CUSTOMER_SEARCH,
        payload: value,
      });

      dispatch({
        type: BOOKING_ACTIONS.SET_CUSTOMER_ID,
        payload: "",
      });

      dispatch({
        type: BOOKING_ACTIONS.SET_VEHICLE_ID,
        payload: "",
      });

      dispatch({
        type: BOOKING_ACTIONS.SET_VEHICLE_SEARCH,
        payload: "",
      });

      await loadCustomers(0, value);
    },
    [loadCustomers]
  );

  const handleCustomerChange = useCallback((event) => {
    const selectedCustomerId = event.target.value;

    dispatch({
      type: BOOKING_ACTIONS.SET_CUSTOMER_ID,
      payload: selectedCustomerId,
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_VEHICLE_ID,
      payload: "",
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_VEHICLE_SEARCH,
      payload: "",
    });
  }, []);

  useEffect(() => {
    if (!customerId) {
      dispatch({
        type: BOOKING_ACTIONS.SET_VEHICLES,
        payload: [],
      });

      return;
    }

    const loadVehicles = async () => {
      try {
        dispatch({
          type: BOOKING_ACTIONS.SET_LOADING_VEHICLES,
          payload: true,
        });

        const response =
          await vehicleApi.getVehiclesByCustomer({
            customerId: Number(customerId),
            page: 0,
            size: VEHICLE_PAGE_SIZE,
            keyword: vehicleSearch.trim(),
          });

        dispatch({
          type: BOOKING_ACTIONS.SET_VEHICLES,
          payload: Array.isArray(response?.content)
            ? response.content
            : [],
        });
      } catch (error) {
        console.error(
          "Unable to load customer vehicles:",
          error
        );

        const message =
          error?.response?.data?.message ||
          "Unable to load customer vehicles.";

        toast.error(message);

        dispatch({
          type: BOOKING_ACTIONS.SET_VEHICLES,
          payload: [],
        });
      } finally {
        dispatch({
          type: BOOKING_ACTIONS.SET_LOADING_VEHICLES,
          payload: false,
        });
      }
    };

    loadVehicles();
  }, [customerId, vehicleSearch]);

  const handleVehicleSearch = useCallback((event) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_VEHICLE_SEARCH,
      payload: event.target.value,
    });

    dispatch({
      type: BOOKING_ACTIONS.SET_VEHICLE_ID,
      payload: "",
    });
  }, []);

  const handleVehicleChange = useCallback((event) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_VEHICLE_ID,
      payload: event.target.value,
    });
  }, []);

  const handleServiceChange = useCallback((event) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_SERVICE_ID,
      payload: event.target.value,
    });
  }, []);

  useEffect(() => {
    if (!serviceId) {
      dispatch({
        type: BOOKING_ACTIONS.SET_AMOUNT,
        payload: "",
      });

      return;
    }

    const selectedService = services.find(
      (service) =>
        Number(service.id) === Number(serviceId)
    );

    if (selectedService?.price != null) {
      dispatch({
        type: BOOKING_ACTIONS.SET_AMOUNT,
        payload: String(selectedService.price),
      });
    }
  }, [serviceId, services]);

  const handleMechanicChange = useCallback((event) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_MECHANIC_ID,
      payload: event.target.value,
    });
  }, []);

  const handleBookingDateChange =
    useCallback((event) => {
      dispatch({
        type: BOOKING_ACTIONS.SET_BOOKING_DATE,
        payload: event.target.value,
      });
    }, []);

  const handleBookingTimeChange =
    useCallback((event) => {
      dispatch({
        type: BOOKING_ACTIONS.SET_BOOKING_TIME,
        payload: event.target.value,
      });
    }, []);

  const handleAmountChange = useCallback((event) => {
    dispatch({
      type: BOOKING_ACTIONS.SET_AMOUNT,
      payload: event.target.value,
    });
  }, []);

  const handleAddBooking = useCallback(
    async (bookingData) => {
      try {
        dispatch({
          type: BOOKING_ACTIONS.SET_SUBMITTING,
          payload: true,
        });

        await bookingApi.createBooking(bookingData);

        dispatch({
          type: BOOKING_ACTIONS.SET_ADD_BOOKING_OPEN,
          payload: false,
        });

        toast.success("Booking created successfully.");

        await fetchBookings(false);
        await loadPendingBookings(pendingPage);
        await loadActiveBookings(activePage);
      } catch (error) {
        console.error(
          "Unable to create booking:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
          "Unable to create booking."
        );
      } finally {
        dispatch({
          type: BOOKING_ACTIONS.SET_SUBMITTING,
          payload: false,
        });
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

  const refreshCurrentSection = useCallback(
    async () => {
      if (activeSection === "all") {
        await fetchBookings(false);
        return;
      }

      if (activeSection === "pending") {
        await loadPendingBookings(pendingPage);
        return;
      }

      if (activeSection === "active") {
        await loadActiveBookings(activePage);
      }
    },
    [
      activeSection,
      fetchBookings,
      loadPendingBookings,
      loadActiveBookings,
      pendingPage,
      activePage,
    ]
  );

  let sectionBookings = bookings;
  let sectionCurrentPage = currentPage;
  let sectionTotalPages = totalPages;
  let sectionTotalItems = totalItems;
  let sectionIsLoading = loading;
  let sectionErrorMessage = error;

  if (activeSection === "pending") {
    sectionBookings = pendingBookings;
    sectionCurrentPage = pendingPage;
    sectionTotalPages = pendingTotalPages;
    sectionTotalItems = pendingCount;
    sectionIsLoading = sectionLoading;
    sectionErrorMessage = sectionError;
  }

  if (activeSection === "active") {
    sectionBookings = activeBookings;
    sectionCurrentPage = activePage;
    sectionTotalPages = activeTotalPages;
    sectionTotalItems = activeCount;
    sectionIsLoading = sectionLoading;
    sectionErrorMessage = sectionError;
  }

  const handleCurrentSectionPageChange =
    useCallback(
      (page) => {
        if (activeSection === "all") {
          handlePageChange(page);
          return;
        }

        if (activeSection === "pending") {
          if (
            page < 1 ||
            page > pendingTotalPages
          ) {
            return;
          }

          handlePendingPageChange(page);
          return;
        }

        if (activeSection === "active") {
          if (
            page < 1 ||
            page > activeTotalPages
          ) {
            return;
          }

          handleActivePageChange(page);
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

  const refresh = useCallback(
    () => fetchBookings(false),
    [fetchBookings]
  );

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

    categories,

    setSearch: handleSearchChange,
    setStatus: handleStatusChange,
    setCategory: handleCategoryChange,
    setSort: handleSortChange,
    setPage: handlePageChange,
    resetFilters,
    refresh,

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

    isAddBookingOpen,

    customers,
    vehicles,
    services,
    mechanics,

    customerId,
    vehicleId,
    serviceId,
    mechanicId,

    bookingDate,
    bookingTime,
    amount,

    customerSearch,
    vehicleSearch,

    loadingCustomers,
    loadingVehicles,
    loadingServices,
    loadingMechanics,

    submitting,

    openAddBooking,
    closeAddBooking,
    handleAddBooking,

    handleCustomerSearch,
    handleCustomerChange,

    handleVehicleSearch,
    handleVehicleChange,

    handleServiceChange,
    handleMechanicChange,

    handleBookingDateChange,
    handleBookingTimeChange,
    handleAmountChange,

    isAssignBookingOpen,
    selectedBooking,

    handleAssignClick,
    handleAssigned,
    handleCloseAssignModal,

    deleteBookingTarget,
    deletingBooking,
    handleDeleteBooking,
    handleConfirmDeleteBooking,
    handleCloseDeleteModal,

    refreshCurrentSection,
  };
};

export default useBookings;