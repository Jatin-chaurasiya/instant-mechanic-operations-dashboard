import {
  CarFront,
  Plus,
  RefreshCw,
} from "lucide-react";

import VehiclesGrid from "../components/vehicles/VehiclesGrid";
import AddVehicleModal from "../components/vehicles/AddVehicleModal";
import VehicleDetailsModal from "../components/vehicles/VehicleDetailsModal";

import ConfirmModal from "../components/ui/ConfirmModal";
import Button from "../components/ui/Button";

import useVehicles from "../hooks/vehicles/useVehicles";


const VehiclesPage = () => {

  const {
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
    setSearch,
    setPage,
    resetFilters,
    refresh,

    handleOpenAddVehicle,
    handleCloseAddVehicle,
    handleCreateVehicle,

    handleDeleteVehicle,
    handleConfirmDeleteVehicle,
    handleCloseDeleteVehicle,

    handleViewVehicle,
    handleCloseDetails,
  } = useVehicles();


  return (
    <div
      className="
        min-h-full
        px-5 py-6
        sm:px-6
        lg:px-8
      "
    >

      {/* =====================================
          Page Header
      ====================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >

        {/* Page Title */}

        <div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-slate-900
                dark:bg-white
              "
            >

              <CarFront
                size={22}
                className="
                  text-white
                  dark:text-slate-900
                "
              />

            </div>


            <div>

              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                Vehicles
              </h1>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Manage and monitor
                registered vehicles.
              </p>

            </div>

          </div>

        </div>


        {/* Header Actions */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Button
            variant="primary"
            size="md"
            onClick={
              handleOpenAddVehicle
            }
          >

            <Plus size={17} />

            Add Vehicle

          </Button>


          <Button
            variant="secondary"
            size="md"
            onClick={
              refresh
            }
            disabled={
              loading ||
              deletingVehicle
            }
          >

            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </Button>

        </div>

      </div>


      {/* =====================================
          Vehicles Grid
      ====================================== */}

      <div className="mt-8">

        <VehiclesGrid

          vehicles={vehicles}

          loading={loading}

          error={error}

          onRetry={() =>
            loadVehicles(
              currentPage,
              search
            )
          }

          search={search}

          onSearchChange={
            setSearch
          }

          onReset={
            resetFilters
          }

          currentPage={
            currentPage
          }

          totalPages={
            totalPages
          }

          totalItems={
            totalItems
          }

          onPageChange={
            setPage
          }

          onView={
            handleViewVehicle
          }

          onDelete={
            handleDeleteVehicle
          }

        />

      </div>


      {/* =====================================
          Add Vehicle Modal
      ====================================== */}

      <AddVehicleModal

        isOpen={
          isAddModalOpen
        }

        onClose={
          handleCloseAddVehicle
        }

        onSubmit={
          handleCreateVehicle
        }

        loading={
          addLoading
        }

        error={
          addError
        }

      />


      {/* =====================================
          Vehicle Details Modal
      ====================================== */}

      <VehicleDetailsModal

        vehicle={
          selectedVehicle
        }

        onClose={
          handleCloseDetails
        }

      />


      {/* =====================================
          Delete Vehicle Confirmation
      ====================================== */}

      <ConfirmModal

        isOpen={
          Boolean(deleteVehicleTarget)
        }

        onClose={
          handleCloseDeleteVehicle
        }

        onConfirm={
          handleConfirmDeleteVehicle
        }

        title="Delete Vehicle"

        description={
          deleteVehicleTarget
            ? `Are you sure you want to delete vehicle ${deleteVehicleTarget.vehicleNumber}? This action cannot be undone.`
            : ""
        }

        confirmText="Delete Vehicle"

        cancelText="Cancel"

        loading={
          deletingVehicle
        }

      />

    </div>
  );
};


export default VehiclesPage;