import {
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { toast } from "react-toastify";

import usePolling from "../usePolling";

import customerApi from "../../api/customerApi";

import {
  customersReducer,
  initialCustomerState,
  CUSTOMER_ACTIONS,
} from "../../reducers/customers/customersReducer";

const useCustomers = ({
  autoRefresh = true,
  refreshInterval = 30000,
  initialPage = 1,
  initialItemsPerPage = 10,
} = {}) => {
  // Initial State
  const [state, dispatch] = useReducer(
    customersReducer,
    {
      ...initialCustomerState,
      currentPage: initialPage,
      itemsPerPage: initialItemsPerPage,
    },
  );

  const {
    customers,
    loading,
    refreshing,
    error,

    search,

    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,

    selectedCustomer,
    detailsLoading,
    detailsError,

    isAddCustomerOpen,
    addCustomerLoading,
    addCustomerError,
  } = state;

  // Fetch Customers
  const fetchCustomers = useCallback(
    async (isInitialLoad = false) => {
      try {
        if (isInitialLoad) {
          dispatch({
            type: CUSTOMER_ACTIONS.SET_LOADING,
            payload: true,
          });
        } else {
          dispatch({
            type: CUSTOMER_ACTIONS.SET_REFRESHING,
            payload: true,
          });
        }

        dispatch({
          type: CUSTOMER_ACTIONS.SET_ERROR,
          payload: null,
        });

        const response = await customerApi.getCustomers({
          page: currentPage - 1,
          size: itemsPerPage,
          keyword: search.trim(),
        });

        // Spring Page response
        dispatch({
          type: CUSTOMER_ACTIONS.SET_CUSTOMERS,
          payload: response.content || [],
        });

        dispatch({
          type: CUSTOMER_ACTIONS.SET_TOTAL_ITEMS,
          payload: response.totalElements || 0,
        });

        dispatch({
          type: CUSTOMER_ACTIONS.SET_TOTAL_PAGES,
          payload: response.totalPages || 1,
        });

        // Frontend uses 1-based pages
        if (
          response.totalPages > 0 &&
          currentPage > response.totalPages
        ) {
          dispatch({
            type: CUSTOMER_ACTIONS.SET_CURRENT_PAGE,
            payload: response.totalPages,
          });
        }
      } catch (err) {
        console.error("Customers error:", err);

        dispatch({
          type: CUSTOMER_ACTIONS.SET_ERROR,
          payload:
            err?.response?.data?.message ||
            err?.message ||
            "Unable to load customers.",
        });

        dispatch({
          type: CUSTOMER_ACTIONS.SET_CUSTOMERS,
          payload: [],
        });

        dispatch({
          type: CUSTOMER_ACTIONS.SET_TOTAL_ITEMS,
          payload: 0,
        });

        dispatch({
          type: CUSTOMER_ACTIONS.SET_TOTAL_PAGES,
          payload: 1,
        });
      } finally {
        dispatch({
          type: CUSTOMER_ACTIONS.SET_LOADING,
          payload: false,
        });

        dispatch({
          type: CUSTOMER_ACTIONS.SET_REFRESHING,
          payload: false,
        });
      }
    },
    [currentPage, itemsPerPage, search],
  );

  // Initial Load / Search / Page Change
  useEffect(() => {
    fetchCustomers(true);
  }, [fetchCustomers]);

  // Automatic Polling
  usePolling(
    () => fetchCustomers(false),
    refreshInterval,
    autoRefresh,
  );

  // Search
  const handleSearchChange = useCallback((value) => {
    dispatch({
      type: CUSTOMER_ACTIONS.SET_SEARCH,
      payload: value,
    });
  }, []);

  // Pagination
  const handlePageChange = useCallback(
    (page) => {
      if (
        page >= 1 &&
        page <= totalPages
      ) {
        dispatch({
          type: CUSTOMER_ACTIONS.SET_CURRENT_PAGE,
          payload: page,
        });
      }
    },
    [totalPages],
  );

  // Reset Filters
  const resetFilters = useCallback(() => {
    dispatch({
      type: CUSTOMER_ACTIONS.RESET_FILTERS,
    });
  }, []);

  // Manual Refresh
  const refresh = useCallback(() => {
    return fetchCustomers(false);
  }, [fetchCustomers]);

  // View Customer Details
  const handleViewCustomer = useCallback(
    async (customer) => {
      if (!customer?.id) {
        return;
      }

      dispatch({
        type: CUSTOMER_ACTIONS.SET_SELECTED_CUSTOMER,
        payload: customer,
      });

      dispatch({
        type: CUSTOMER_ACTIONS.SET_DETAILS_ERROR,
        payload: null,
      });

      dispatch({
        type: CUSTOMER_ACTIONS.SET_DETAILS_LOADING,
        payload: true,
      });

      try {
        const response =
          await customerApi.getCustomerById(
            customer.id,
          );

        dispatch({
          type: CUSTOMER_ACTIONS.SET_SELECTED_CUSTOMER,
          payload: response,
        });
      } catch (err) {
        console.error(
          "Customer details error:",
          err,
        );

        dispatch({
          type: CUSTOMER_ACTIONS.SET_DETAILS_ERROR,
          payload:
            err?.response?.data?.message ||
            err?.message ||
            "Unable to load customer details.",
        });
      } finally {
        dispatch({
          type: CUSTOMER_ACTIONS.SET_DETAILS_LOADING,
          payload: false,
        });
      }
    },
    [],
  );

  // Close Customer Details
  const handleCloseDetails = useCallback(() => {
    dispatch({
      type: CUSTOMER_ACTIONS.RESET_DETAILS,
    });
  }, []);

  // Open Add Customer Modal
  const handleOpenAddCustomer = useCallback(() => {
    dispatch({
      type: CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_ERROR,
      payload: null,
    });

    dispatch({
      type: CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_OPEN,
      payload: true,
    });
  }, []);

  // Close Add Customer Modal
  const handleCloseAddCustomer = useCallback(() => {
    if (addCustomerLoading) {
      return;
    }

    dispatch({
      type: CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_ERROR,
      payload: null,
    });

    dispatch({
      type: CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_OPEN,
      payload: false,
    });
  }, [addCustomerLoading]);

  // Add Customer
  const handleAddCustomer = useCallback(
    async (data) => {
      dispatch({
        type: CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_LOADING,
        payload: true,
      });

      dispatch({
        type: CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_ERROR,
        payload: null,
      });

      try {
        await customerApi.createCustomer(data);

        dispatch({
          type: CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_OPEN,
          payload: false,
        });

        toast.success(
          "Customer added successfully!",
        );

        await refresh();
      } catch (err) {
        console.error(
          "Unable to add customer:",
          err,
        );

        toast.error(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to add customer.",
        );
      } finally {
        dispatch({
          type: CUSTOMER_ACTIONS.SET_ADD_CUSTOMER_LOADING,
          payload: false,
        });
      }
    },
    [refresh],
  );

  // Return
  return {
    // Customer List
    customers,
    loading,
    refreshing,
    error,

    // Search
    search,

    // Pagination
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,

    setSearch: handleSearchChange,
    setPage: handlePageChange,
    resetFilters,
    refresh,

    // Details Modal
    selectedCustomer,
    detailsLoading,
    detailsError,

    handleViewCustomer,
    handleCloseDetails,

    // Add Customer Modal
    isAddCustomerOpen,
    addCustomerLoading,
    addCustomerError,

    handleOpenAddCustomer,
    handleCloseAddCustomer,
    handleAddCustomer,
  };
};

export default useCustomers;