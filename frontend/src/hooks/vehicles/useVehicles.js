import {
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { toast } from "react-toastify";

import vehicleApi from "../../api/vehicleApi";

import {
  vehiclesReducer,
  initialVehicleState,
  VEHICLE_ACTIONS,
} from "../../reducers/vehicles/vehiclesReducer";


const PAGE_SIZE = 6;


const useVehicles = () => {

  const [state, dispatch] = useReducer(
    vehiclesReducer,
    initialVehicleState
  );


  const {
    vehicles,
    loading,
    error,

    search,
    currentPage,
    totalPages,
    totalItems,

    isAddModalOpen,
    addLoading,
    addError,

    deleteVehicleTarget,
    deletingVehicle,

    selectedVehicle,
  } = state;


  // ==========================================
  // Load Vehicles
  // ==========================================

  const loadVehicles = useCallback(
    async (page = 1, keyword = "") => {

      try {

        dispatch({
          type: VEHICLE_ACTIONS.SET_LOADING,
          payload: true,
        });

        dispatch({
          type: VEHICLE_ACTIONS.SET_ERROR,
          payload: "",
        });


        const response =
          await vehicleApi.getVehicles({
            page: page - 1,
            size: PAGE_SIZE,
            keyword: keyword.trim(),
          });


        dispatch({
          type: VEHICLE_ACTIONS.SET_VEHICLES,
          payload: response?.content || [],
        });


        dispatch({
          type: VEHICLE_ACTIONS.SET_TOTAL_PAGES,
          payload: response?.totalPages || 1,
        });


        dispatch({
          type: VEHICLE_ACTIONS.SET_TOTAL_ITEMS,
          payload: response?.totalElements || 0,
        });


        dispatch({
          type: VEHICLE_ACTIONS.SET_CURRENT_PAGE,
          payload: (response?.number ?? page - 1) + 1,
        });

      } catch (err) {

        console.error(
          "Failed to load vehicles:",
          err
        );


        const message =
          err?.response?.data?.message ||
          "Unable to load vehicles.";


        dispatch({
          type: VEHICLE_ACTIONS.SET_VEHICLES,
          payload: [],
        });


        dispatch({
          type: VEHICLE_ACTIONS.SET_TOTAL_PAGES,
          payload: 1,
        });


        dispatch({
          type: VEHICLE_ACTIONS.SET_TOTAL_ITEMS,
          payload: 0,
        });


        dispatch({
          type: VEHICLE_ACTIONS.SET_ERROR,
          payload: message,
        });

      } finally {

        dispatch({
          type: VEHICLE_ACTIONS.SET_LOADING,
          payload: false,
        });

      }

    },
    []
  );


  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {

    loadVehicles(1, "");

  }, [loadVehicles]);


  // ==========================================
  // Search
  // ==========================================

  const handleSearchChange = useCallback(
    (value) => {

      dispatch({
        type: VEHICLE_ACTIONS.SET_SEARCH,
        payload: value,
      });


      loadVehicles(
        1,
        value
      );

    },
    [loadVehicles]
  );


  // ==========================================
  // Reset Search
  // ==========================================

  const handleReset = useCallback(() => {

    dispatch({
      type: VEHICLE_ACTIONS.RESET_FILTERS,
    });


    loadVehicles(
      1,
      ""
    );

  }, [loadVehicles]);


  // ==========================================
  // Pagination
  // ==========================================

  const handlePageChange = useCallback(
    (page) => {

      if (
        page < 1 ||
        page > totalPages
      ) {
        return;
      }


      dispatch({
        type: VEHICLE_ACTIONS.SET_CURRENT_PAGE,
        payload: page,
      });


      loadVehicles(
        page,
        search
      );

    },
    [
      totalPages,
      search,
      loadVehicles,
    ]
  );


  // ==========================================
  // Refresh
  // ==========================================

  const handleRefresh = useCallback(() => {

    loadVehicles(
      currentPage,
      search
    );

  }, [
    currentPage,
    search,
    loadVehicles,
  ]);


  // ==========================================
  // Open Add Vehicle
  // ==========================================

  const handleOpenAddVehicle = useCallback(() => {

    dispatch({
      type: VEHICLE_ACTIONS.SET_ADD_ERROR,
      payload: "",
    });


    dispatch({
      type: VEHICLE_ACTIONS.SET_ADD_MODAL_OPEN,
      payload: true,
    });

  }, []);


  // ==========================================
  // Close Add Vehicle
  // ==========================================

  const handleCloseAddVehicle = useCallback(() => {

    if (addLoading) {
      return;
    }


    dispatch({
      type: VEHICLE_ACTIONS.SET_ADD_ERROR,
      payload: "",
    });


    dispatch({
      type: VEHICLE_ACTIONS.SET_ADD_MODAL_OPEN,
      payload: false,
    });

  }, [addLoading]);


  // ==========================================
  // Create Vehicle
  // ==========================================

  const handleCreateVehicle = useCallback(
    async (vehicleData) => {

      try {

        dispatch({
          type: VEHICLE_ACTIONS.SET_ADD_LOADING,
          payload: true,
        });


        dispatch({
          type: VEHICLE_ACTIONS.SET_ADD_ERROR,
          payload: "",
        });


        await vehicleApi.createVehicle(
          vehicleData
        );


        dispatch({
          type: VEHICLE_ACTIONS.SET_ADD_MODAL_OPEN,
          payload: false,
        });


        dispatch({
          type: VEHICLE_ACTIONS.SET_ADD_ERROR,
          payload: "",
        });


        toast.success(
          "Vehicle added successfully!"
        );


        // Reload current page

        await loadVehicles(
          currentPage,
          search
        );

      } catch (err) {

        console.error(
          "Failed to create vehicle:",
          err
        );


        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Unable to add vehicle.";


        dispatch({
          type: VEHICLE_ACTIONS.SET_ADD_ERROR,
          payload: message,
        });


        toast.error(message);

      } finally {

        dispatch({
          type: VEHICLE_ACTIONS.SET_ADD_LOADING,
          payload: false,
        });

      }

    },
    [
      currentPage,
      search,
      loadVehicles,
    ]
  );


  // ==========================================
  // Open Delete Confirmation
  // ==========================================

  const handleDeleteVehicle = useCallback(
    (vehicle) => {

      if (!vehicle?.id) {
        return;
      }


      dispatch({
        type:
          VEHICLE_ACTIONS.SET_DELETE_VEHICLE_TARGET,
        payload: vehicle,
      });

    },
    []
  );


  // ==========================================
  // Confirm Delete Vehicle
  // ==========================================

  const handleConfirmDeleteVehicle =
    useCallback(
      async () => {

        if (!deleteVehicleTarget?.id) {
          return;
        }


        try {

          dispatch({
            type:
              VEHICLE_ACTIONS.SET_DELETING_VEHICLE,
            payload: true,
          });


          await vehicleApi.deleteVehicle(
            deleteVehicleTarget.id
          );


          toast.success(
            "Vehicle deleted successfully!"
          );


          // Close confirmation modal

          dispatch({
            type:
              VEHICLE_ACTIONS.SET_DELETE_VEHICLE_TARGET,
            payload: null,
          });


          // If the last vehicle of the current
          // page was deleted, move to previous page.

          const nextPage =
            vehicles.length === 1 &&
            currentPage > 1
              ? currentPage - 1
              : currentPage;


          dispatch({
            type:
              VEHICLE_ACTIONS.SET_CURRENT_PAGE,
            payload: nextPage,
          });


          await loadVehicles(
            nextPage,
            search
          );

        } catch (err) {

          console.error(
            "Failed to delete vehicle:",
            err
          );


          const message =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Unable to delete vehicle.";


          toast.error(message);

        } finally {

          dispatch({
            type:
              VEHICLE_ACTIONS.SET_DELETING_VEHICLE,
            payload: false,
          });

        }

      },
      [
        deleteVehicleTarget,
        vehicles.length,
        currentPage,
        search,
        loadVehicles,
      ]
    );


  // ==========================================
  // Close Delete Confirmation
  // ==========================================

  const handleCloseDeleteVehicle = useCallback(
    () => {

      if (deletingVehicle) {
        return;
      }


      dispatch({
        type:
          VEHICLE_ACTIONS.SET_DELETE_VEHICLE_TARGET,
        payload: null,
      });

    },
    [deletingVehicle]
  );


  // ==========================================
  // View Vehicle
  // ==========================================

  const handleViewVehicle = useCallback(
    (vehicle) => {

      dispatch({
        type:
          VEHICLE_ACTIONS.SET_SELECTED_VEHICLE,
        payload: vehicle,
      });

    },
    []
  );


  // ==========================================
  // Close Vehicle Details
  // ==========================================

  const handleCloseDetails = useCallback(() => {

    dispatch({
      type:
        VEHICLE_ACTIONS.SET_SELECTED_VEHICLE,
      payload: null,
    });

  }, []);


  // ==========================================
  // Return
  // ==========================================

  return {

    // Vehicles
    vehicles,
    loading,
    error,

    // Search + Pagination
    search,
    currentPage,
    totalPages,
    totalItems,

    // Add Vehicle
    isAddModalOpen,
    addLoading,
    addError,

    // Delete Vehicle
    deleteVehicleTarget,
    deletingVehicle,

    // Vehicle Details
    selectedVehicle,

    // Actions
    loadVehicles,
    setSearch: handleSearchChange,
    setPage: handlePageChange,
    resetFilters: handleReset,
    refresh: handleRefresh,

    handleOpenAddVehicle,
    handleCloseAddVehicle,
    handleCreateVehicle,

    handleDeleteVehicle,
    handleConfirmDeleteVehicle,
    handleCloseDeleteVehicle,

    handleViewVehicle,
    handleCloseDetails,
  };
};


export default useVehicles;