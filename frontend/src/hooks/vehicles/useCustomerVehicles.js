import {
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { toast } from "react-toastify";

import vehicleApi from "../../api/vehicleApi";

import customerVehicleReducer, {
  initialCustomerVehicleState,
  CUSTOMER_VEHICLE_ACTIONS,
} from "../../reducers/vehicles/customerVehicleReducer";


const PAGE_SIZE = 6;


const useCustomerVehicles = () => {

  const [state, dispatch] = useReducer(
    customerVehicleReducer,
    initialCustomerVehicleState
  );


  const {
    vehicles,
    loading,
    error,

    search,
    currentPage,
    totalPages,
    totalItems,

    isModalOpen,
    editingVehicle,
    savingVehicle,
    saveError,

    deleteVehicleTarget,
    deletingVehicle,

    selectedVehicle,

  } = state;


  // ==========================================
  // Load Customer Vehicles
  // ==========================================

  const loadVehicles = useCallback(
    async (
      page = 1,
      keyword = ""
    ) => {

      dispatch({
        type: CUSTOMER_VEHICLE_ACTIONS.FETCH_START,
      });

      try {

        const response =
          await vehicleApi.getCustomerVehicles({
            page: page - 1,
            size: PAGE_SIZE,
            keyword: keyword.trim(),
          });


        // Spring Page response
        const vehicles =
          Array.isArray(response)
            ? response
            : response?.content || [];


        dispatch({
          type: CUSTOMER_VEHICLE_ACTIONS.FETCH_SUCCESS,
          payload: {
            vehicles,
            totalPages:
              response?.totalPages || 1,
            totalItems:
              response?.totalElements || vehicles.length,
          },
        });


        return vehicles;

      } catch (err) {

        console.error(
          "Failed to load customer vehicles:",
          err
        );


        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Unable to load vehicles.";


        dispatch({
          type: CUSTOMER_VEHICLE_ACTIONS.FETCH_ERROR,
          payload: message,
        });


        return [];

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
        type: CUSTOMER_VEHICLE_ACTIONS.SET_SEARCH,
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

  const handleReset = useCallback(
    () => {

      dispatch({
        type: CUSTOMER_VEHICLE_ACTIONS.RESET_FILTERS,
      });


      loadVehicles(
        1,
        ""
      );

    },
    [loadVehicles]
  );


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
        type: CUSTOMER_VEHICLE_ACTIONS.SET_CURRENT_PAGE,
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

  const handleRefresh = useCallback(
    () => {

      loadVehicles(
        currentPage,
        search
      );

    },
    [
      currentPage,
      search,
      loadVehicles,
    ]
  );


  // ==========================================
  // Open Add Vehicle Modal
  // ==========================================

  const handleOpenAddVehicle = useCallback(
    () => {

      dispatch({
        type:
          CUSTOMER_VEHICLE_ACTIONS.OPEN_ADD_MODAL,
      });

    },
    []
  );


  // ==========================================
  // Open Edit Vehicle Modal
  // ==========================================

  const handleOpenEditVehicle = useCallback(
    (vehicle) => {

      if (!vehicle?.id) {
        return;
      }


      dispatch({
        type:
          CUSTOMER_VEHICLE_ACTIONS.OPEN_EDIT_MODAL,
        payload: vehicle,
      });

    },
    []
  );


  // ==========================================
  // Close Add / Edit Modal
  // ==========================================

  const handleCloseModal = useCallback(
    () => {

      if (savingVehicle) {
        return;
      }


      dispatch({
        type:
          CUSTOMER_VEHICLE_ACTIONS.CLOSE_MODAL,
      });

    },
    [savingVehicle]
  );


  // ==========================================
  // Add Vehicle
  // ==========================================

  const handleAddVehicle = useCallback(
    async (vehicleData) => {

      dispatch({
        type:
          CUSTOMER_VEHICLE_ACTIONS.ADD_START,
      });


      try {

        const response =
          await vehicleApi.createCustomerVehicle(
            vehicleData
          );


        dispatch({
          type:
            CUSTOMER_VEHICLE_ACTIONS.ADD_SUCCESS,
          payload: response,
        });


        toast.success(
          "Vehicle added successfully!"
        );


        // Reload current page
        await loadVehicles(
          currentPage,
          search
        );


        return response;

      } catch (err) {

        console.error(
          "Failed to add customer vehicle:",
          err
        );


        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Unable to add vehicle.";


        dispatch({
          type:
            CUSTOMER_VEHICLE_ACTIONS.ADD_ERROR,
          payload: message,
        });


        toast.error(message);

        throw err;

      }
    },
    [
      currentPage,
      search,
      loadVehicles,
    ]
  );


  // ==========================================
  // Update Vehicle
  // ==========================================

  const handleUpdateVehicle = useCallback(
    async (
      vehicleId,
      vehicleData
    ) => {

      dispatch({
        type:
          CUSTOMER_VEHICLE_ACTIONS.UPDATE_START,
      });


      try {

        const response =
          await vehicleApi.updateCustomerVehicle(
            vehicleId,
            vehicleData
          );


        dispatch({
          type:
            CUSTOMER_VEHICLE_ACTIONS.UPDATE_SUCCESS,
          payload: response,
        });


        toast.success(
          "Vehicle updated successfully!"
        );


        // Reload current page
        await loadVehicles(
          currentPage,
          search
        );


        return response;

      } catch (err) {

        console.error(
          "Failed to update customer vehicle:",
          err
        );


        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Unable to update vehicle.";


        dispatch({
          type:
            CUSTOMER_VEHICLE_ACTIONS.UPDATE_ERROR,
          payload: message,
        });


        toast.error(message);

        throw err;

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
          CUSTOMER_VEHICLE_ACTIONS
            .SET_DELETE_VEHICLE_TARGET,
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
              CUSTOMER_VEHICLE_ACTIONS
                .DELETE_START,
          });


          await vehicleApi.deleteCustomerVehicle(
            deleteVehicleTarget.id
          );


          dispatch({
            type:
              CUSTOMER_VEHICLE_ACTIONS
                .DELETE_SUCCESS,
            payload: deleteVehicleTarget.id,
          });


          toast.success(
            "Vehicle deleted successfully!"
          );


          // If last vehicle on current page
          // was deleted, move to previous page.
          const nextPage =
            vehicles.length === 1 &&
            currentPage > 1
              ? currentPage - 1
              : currentPage;


          dispatch({
            type:
              CUSTOMER_VEHICLE_ACTIONS
                .SET_CURRENT_PAGE,
            payload: nextPage,
          });


          await loadVehicles(
            nextPage,
            search
          );


        } catch (err) {

          console.error(
            "Failed to delete customer vehicle:",
            err
          );


          const message =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Unable to delete vehicle.";


          dispatch({
            type:
              CUSTOMER_VEHICLE_ACTIONS
                .DELETE_ERROR,
            payload: message,
          });


          toast.error(message);

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

  const handleCloseDeleteVehicle =
    useCallback(
      () => {

        if (deletingVehicle) {
          return;
        }


        dispatch({
          type:
            CUSTOMER_VEHICLE_ACTIONS
              .RESET_DELETE,
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
          CUSTOMER_VEHICLE_ACTIONS
            .SET_SELECTED_VEHICLE,
        payload: vehicle,
      });

    },
    []
  );


  // ==========================================
  // Close Vehicle Details
  // ==========================================

  const handleCloseDetails =
    useCallback(() => {

      dispatch({
        type:
          CUSTOMER_VEHICLE_ACTIONS
            .SET_SELECTED_VEHICLE,
        payload: null,
      });

    }, []);


  // ==========================================
  // Clear Error
  // ==========================================

  const clearError = useCallback(
    () => {

      dispatch({
        type:
          CUSTOMER_VEHICLE_ACTIONS
            .CLEAR_ERROR,
      });

    },
    []
  );


  // ==========================================
  // Clear Save Error
  // ==========================================

  const clearSaveError = useCallback(
    () => {

      dispatch({
        type:
          CUSTOMER_VEHICLE_ACTIONS
            .CLEAR_SAVE_ERROR,
      });

    },
    []
  );


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

    // Add / Edit Modal
    isModalOpen,
    editingVehicle,
    savingVehicle,
    saveError,

    // Delete
    deleteVehicleTarget,
    deletingVehicle,

    // Selected Vehicle
    selectedVehicle,

    // API / Actions
    loadVehicles,

    setSearch:
      handleSearchChange,

    setPage:
      handlePageChange,

    resetFilters:
      handleReset,

    refresh:
      handleRefresh,

    // Add / Edit
    handleOpenAddVehicle,
    handleOpenEditVehicle,
    handleCloseModal,

    handleAddVehicle,
    handleUpdateVehicle,

    // Delete
    handleDeleteVehicle,
    handleConfirmDeleteVehicle,
    handleCloseDeleteVehicle,

    // Details
    handleViewVehicle,
    handleCloseDetails,

    // Errors
    clearError,
    clearSaveError,
  };
};


export default useCustomerVehicles;