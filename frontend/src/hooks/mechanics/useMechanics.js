import {
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { toast } from "react-toastify";

import usePolling from "../usePolling";

import mechanicApi from "../../api/mechanicApi";

import mechanicsReducer, {
  initialMechanicsState,
  MECHANIC_ACTIONS,
} from "../../reducers/mechanics/mechanicsReducer";

const PAGE_SIZE = 10;

const useMechanics = ({
  autoRefresh = true,
  refreshInterval = 30000,
  initialPage = 1,
  initialItemsPerPage = 12,
} = {}) => {
  // ======================================================
  // Reducer
  // ======================================================

  const [state, dispatch] = useReducer(
    mechanicsReducer,
    {
      ...initialMechanicsState,
      currentPage: initialPage,
      itemsPerPage: initialItemsPerPage,
    }
  );

  // ======================================================
  // State Destructuring
  // ======================================================

  const {
    // Main mechanics
    mechanics,
    loading,
    refreshing,
    error,

    // Search / Filter
    search,
    status,

    // Pagination
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,

    // Section
    activeSection,

    // Available
    available,

    // Inactive
    inactive,

    // Details
    detailsOpen,
    selectedMechanicId,

    // Add / Update
    mechanicModalOpen,
    selectedMechanic,
    saving,
  } = state;

  // ======================================================
  // Fetch Mechanics
  // ======================================================

  const fetchMechanics = useCallback(
    async (isInitialLoad = false) => {
      try {
        if (isInitialLoad) {
          dispatch({
            type:
              MECHANIC_ACTIONS.SET_LOADING,
            payload: true,
          });
        } else {
          dispatch({
            type:
              MECHANIC_ACTIONS.SET_REFRESHING,
            payload: true,
          });
        }

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_ERROR,
          payload: null,
        });

        const response =
          await mechanicApi.getMechanics({
            page: currentPage - 1,
            size: itemsPerPage,
            keyword: search.trim(),
            status,
          });

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_MECHANICS,
          payload:
            response.content || [],
        });

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_TOTAL_ITEMS,
          payload:
            response.totalElements || 0,
        });

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_TOTAL_PAGES,
          payload:
            response.totalPages || 1,
        });

        // Keep frontend page 1-based
        if (
          response.totalPages > 0 &&
          currentPage >
            response.totalPages
        ) {
          dispatch({
            type:
              MECHANIC_ACTIONS.SET_CURRENT_PAGE,
            payload:
              response.totalPages,
          });
        }
      } catch (err) {
        console.error(
          "Mechanics error:",
          err
        );

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_ERROR,
          payload:
            err?.response?.data?.message ||
            err?.message ||
            "Unable to load mechanics.",
        });

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_MECHANICS,
          payload: [],
        });

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_TOTAL_ITEMS,
          payload: 0,
        });

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_TOTAL_PAGES,
          payload: 1,
        });
      } finally {
        dispatch({
          type:
            MECHANIC_ACTIONS.SET_LOADING,
          payload: false,
        });

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_REFRESHING,
          payload: false,
        });
      }
    },
    [
      currentPage,
      itemsPerPage,
      search,
      status,
    ]
  );

  // ======================================================
  // Initial Load / Filter / Page
  // ======================================================

  useEffect(() => {
    fetchMechanics(true);
  }, [fetchMechanics]);

  // ======================================================
  // Automatic Polling
  // ======================================================

  usePolling(
    () => fetchMechanics(false),
    refreshInterval,
    autoRefresh
  );

  // ======================================================
  // Search
  // ======================================================

  const handleSearchChange =
    useCallback((value) => {
      dispatch({
        type:
          MECHANIC_ACTIONS.SET_SEARCH,
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
          MECHANIC_ACTIONS.SET_STATUS,
        payload: value,
      });
    }, []);

  // ======================================================
  // Main Pagination
  // ======================================================

  const handlePageChange =
    useCallback(
      (page) => {
        if (
          page >= 1 &&
          page <= totalPages
        ) {
          dispatch({
            type:
              MECHANIC_ACTIONS.SET_CURRENT_PAGE,
            payload: page,
          });
        }
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
          MECHANIC_ACTIONS.RESET_FILTERS,
      });
    }, []);

  // ======================================================
  // Manual Refresh
  // ======================================================

  const refresh =
    useCallback(() => {
      return fetchMechanics(false);
    }, [fetchMechanics]);

  // ======================================================
  // Load Available Mechanics
  // ======================================================

  const loadAvailable =
    useCallback(
      async (page = 0) => {
        dispatch({
          type:
            MECHANIC_ACTIONS.SET_AVAILABLE_LOADING,
          payload: true,
        });

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_AVAILABLE_ERROR,
          payload: "",
        });

        try {
          const response =
            await mechanicApi.getAvailableMechanics(
              {
                page,
                size: PAGE_SIZE,
              }
            );

          dispatch({
            type:
              MECHANIC_ACTIONS.SET_AVAILABLE,
            payload: {
              data:
                response?.content || [],
              loading: false,
              error: "",
              page:
                response?.number ?? page,
              totalPages:
                response?.totalPages ?? 1,
              totalItems:
                response?.totalElements ?? 0,
            },
          });
        } catch (err) {
          dispatch({
            type:
              MECHANIC_ACTIONS.SET_AVAILABLE,
            payload: {
              data: [],
              loading: false,
              error:
                err?.response?.data
                  ?.message ||
                "Unable to load available mechanics.",
            },
          });
        }
      },
      []
    );

  // ======================================================
  // Load Inactive Mechanics
  // ======================================================

  const loadInactive =
    useCallback(
      async (page = 0) => {
        dispatch({
          type:
            MECHANIC_ACTIONS.SET_INACTIVE_LOADING,
          payload: true,
        });

        dispatch({
          type:
            MECHANIC_ACTIONS.SET_INACTIVE_ERROR,
          payload: "",
        });

        try {
          const response =
            await mechanicApi.getInactiveMechanics(
              {
                page,
                size: PAGE_SIZE,
              }
            );

          dispatch({
            type:
              MECHANIC_ACTIONS.SET_INACTIVE,
            payload: {
              data:
                response?.content || [],
              loading: false,
              error: "",
              page:
                response?.number ?? page,
              totalPages:
                response?.totalPages ?? 1,
              totalItems:
                response?.totalElements ?? 0,
            },
          });
        } catch (err) {
          dispatch({
            type:
              MECHANIC_ACTIONS.SET_INACTIVE,
            payload: {
              data: [],
              loading: false,
              error:
                err?.response?.data
                  ?.message ||
                "Unable to load inactive mechanics.",
            },
          });
        }
      },
      []
    );

  // ======================================================
  // Initial Available / Inactive Load
  // ======================================================

  useEffect(() => {
    loadAvailable(0);
    loadInactive(0);
  }, [
    loadAvailable,
    loadInactive,
  ]);

  // ======================================================
  // Section Change
  // ======================================================

  const handleSectionChange =
    useCallback((section) => {
      dispatch({
        type:
          MECHANIC_ACTIONS.SET_ACTIVE_SECTION,
        payload: section,
      });
    }, []);

  // ======================================================
  // Refresh Current Section
  // ======================================================

  const handleRefresh =
    useCallback(async () => {
      if (
        activeSection === "all"
      ) {
        await refresh();
        return;
      }

      if (
        activeSection === "available"
      ) {
        await loadAvailable(
          available.page
        );
        return;
      }

      await loadInactive(
        inactive.page
      );
    }, [
      activeSection,
      refresh,
      loadAvailable,
      loadInactive,
      available.page,
      inactive.page,
    ]);

  // ======================================================
  // Open Add Modal
  // ======================================================

  const handleAddClick =
    useCallback(() => {
      dispatch({
        type:
          MECHANIC_ACTIONS.SET_SELECTED_MECHANIC,
        payload: null,
      });

      dispatch({
        type:
          MECHANIC_ACTIONS.SET_MECHANIC_MODAL_OPEN,
        payload: true,
      });
    }, []);

  // ======================================================
  // Open Update Modal
  // ======================================================

  const handleEdit =
    useCallback((mechanic) => {
      dispatch({
        type:
          MECHANIC_ACTIONS.SET_SELECTED_MECHANIC,
        payload: mechanic,
      });

      dispatch({
        type:
          MECHANIC_ACTIONS.SET_MECHANIC_MODAL_OPEN,
        payload: true,
      });
    }, []);

  // ======================================================
  // Save Mechanic
  // Add + Update
  // ======================================================

  const handleSaveMechanic =
    useCallback(
      async (mechanicData) => {
        try {
          dispatch({
            type:
              MECHANIC_ACTIONS.SET_SAVING,
            payload: true,
          });

          if (selectedMechanic) {
            await mechanicApi.updateMechanic(
              selectedMechanic.id,
              mechanicData
            );

            toast.success(
              "Mechanic updated successfully."
            );
          } else {
            await mechanicApi.createMechanic(
              mechanicData
            );

            toast.success(
              "Mechanic added successfully."
            );
          }

          dispatch({
            type:
              MECHANIC_ACTIONS.SET_MECHANIC_MODAL_OPEN,
            payload: false,
          });

          dispatch({
            type:
              MECHANIC_ACTIONS.SET_SELECTED_MECHANIC,
            payload: null,
          });

          await Promise.all([
            refresh(),
            loadAvailable(
              available.page
            ),
            loadInactive(
              inactive.page
            ),
          ]);
        } catch (err) {
          toast.error(
            err?.response?.data?.message ||
              (selectedMechanic
                ? "Unable to update mechanic."
                : "Unable to add mechanic.")
          );

          throw err;
        } finally {
          dispatch({
            type:
              MECHANIC_ACTIONS.SET_SAVING,
            payload: false,
          });
        }
      },
      [
        selectedMechanic,
        refresh,
        loadAvailable,
        loadInactive,
        available.page,
        inactive.page,
      ]
    );

  // ======================================================
  // Close Mechanic Modal
  // ======================================================

  const handleCloseModal =
    useCallback(() => {
      if (saving) {
        return;
      }

      dispatch({
        type:
          MECHANIC_ACTIONS.SET_MECHANIC_MODAL_OPEN,
        payload: false,
      });

      dispatch({
        type:
          MECHANIC_ACTIONS.SET_SELECTED_MECHANIC,
        payload: null,
      });
    }, [saving]);

  // ======================================================
  // Deactivate
  // ======================================================

  const handleDeactivate =
    useCallback(
      async (mechanic) => {
        if (!mechanic?.id) {
          return;
        }

        try {
          await mechanicApi.deactivateMechanic(
            mechanic.id
          );

          await Promise.all([
            refresh(),
            loadAvailable(
              available.page
            ),
            loadInactive(
              inactive.page
            ),
          ]);

          toast.success(
            "Mechanic deactivated successfully."
          );
        } catch (err) {
          toast.error(
            err?.response?.data?.message ||
              "Unable to deactivate mechanic."
          );
        }
      },
      [
        refresh,
        loadAvailable,
        loadInactive,
        available.page,
        inactive.page,
      ]
    );

  // ======================================================
  // Activate
  // ======================================================

  const handleActivate =
    useCallback(
      async (mechanic) => {
        if (!mechanic?.id) {
          return;
        }

        try {
          await mechanicApi.activateMechanic(
            mechanic.id
          );

          await Promise.all([
            refresh(),
            loadAvailable(
              available.page
            ),
            loadInactive(
              inactive.page
            ),
          ]);

          toast.success(
            "Mechanic activated successfully."
          );
        } catch (err) {
          toast.error(
            err?.response?.data?.message ||
              "Unable to activate mechanic."
          );
        }
      },
      [
        refresh,
        loadAvailable,
        loadInactive,
        available.page,
        inactive.page,
      ]
    );

  // ======================================================
  // View Mechanic Details
  // ======================================================

  const handleView =
    useCallback((mechanic) => {
      dispatch({
        type:
          MECHANIC_ACTIONS.SET_SELECTED_MECHANIC_ID,
        payload:
          mechanic?.id ?? null,
      });

      dispatch({
        type:
          MECHANIC_ACTIONS.SET_DETAILS_OPEN,
        payload: true,
      });
    }, []);

  // ======================================================
  // Close Details
  // ======================================================

  const handleCloseDetails =
    useCallback(() => {
      dispatch({
        type:
          MECHANIC_ACTIONS.SET_DETAILS_OPEN,
        payload: false,
      });

      dispatch({
        type:
          MECHANIC_ACTIONS.SET_SELECTED_MECHANIC_ID,
        payload: null,
      });
    }, []);

  // ======================================================
  // Pagination
  // ======================================================

  const handleSectionPageChange =
    useCallback(
      (page) => {
        if (
          activeSection === "all"
        ) {
          handlePageChange(page);
          return;
        }

        if (
          activeSection === "available"
        ) {
          loadAvailable(page - 1);
          return;
        }

        loadInactive(page - 1);
      },
      [
        activeSection,
        handlePageChange,
        loadAvailable,
        loadInactive,
      ]
    );

  // ======================================================
  // Reset Filters
  // ======================================================

  const handleReset =
    useCallback(() => {
      resetFilters();

      if (
        activeSection === "available"
      ) {
        loadAvailable(0);
      }

      if (
        activeSection === "inactive"
      ) {
        loadInactive(0);
      }
    }, [
      resetFilters,
      activeSection,
      loadAvailable,
      loadInactive,
    ]);

  // ======================================================
  // Retry
  // ======================================================

  const handleRetry =
    useCallback(() => {
      if (
        activeSection === "all"
      ) {
        refresh();
        return;
      }

      if (
        activeSection === "available"
      ) {
        loadAvailable(
          available.page
        );
        return;
      }

      loadInactive(
        inactive.page
      );
    }, [
      activeSection,
      refresh,
      loadAvailable,
      loadInactive,
      available.page,
      inactive.page,
    ]);

  // ======================================================
  // Current Section Data
  // ======================================================

  let sectionData;

  if (
    activeSection === "all"
  ) {
    sectionData = {
      mechanics,
      loading,
      error,
      currentPage,
      totalPages,
      totalItems,
    };
  } else if (
    activeSection === "available"
  ) {
    sectionData = {
      mechanics:
        available.data,
      loading:
        available.loading,
      error:
        available.error,
      currentPage:
        available.page + 1,
      totalPages:
        available.totalPages,
      totalItems:
        available.totalItems,
    };
  } else {
    sectionData = {
      mechanics:
        inactive.data,
      loading:
        inactive.loading,
      error:
        inactive.error,
      currentPage:
        inactive.page + 1,
      totalPages:
        inactive.totalPages,
      totalItems:
        inactive.totalItems,
    };
  }

  // ======================================================
  // Return
  // ======================================================

  return {
    // ==========================================
    // Main Mechanics
    // ==========================================

    mechanics,
    loading,
    refreshing,
    error,

    search,
    status,

    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,

    setSearch:
      handleSearchChange,

    setStatus:
      handleStatusChange,

    setPage:
      handlePageChange,

    resetFilters,
    refresh,

    // ==========================================
    // Sections
    // ==========================================

    activeSection,

    available,
    inactive,

    sectionData,

    handleSectionChange,
    handleRefresh,
    handleSectionPageChange,

    loadAvailable,
    loadInactive,

    handleRetry,
    handleReset,

    // ==========================================
    // Details
    // ==========================================

    detailsOpen,
    selectedMechanicId,

    handleView,
    handleCloseDetails,

    // ==========================================
    // Add / Update
    // ==========================================

    mechanicModalOpen,
    selectedMechanic,
    saving,

    handleAddClick,
    handleEdit,
    handleSaveMechanic,
    handleCloseModal,

    // ==========================================
    // Status Actions
    // ==========================================

    handleDeactivate,
    handleActivate,
  };
};

export default useMechanics;