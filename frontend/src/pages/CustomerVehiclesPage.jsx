import { Plus } from "lucide-react";

import useCustomerVehicles from "../hooks/vehicles/useCustomerVehicles";

import CustomerVehicleCard from "../components/vehicles/CustomerVehicleCard";
import CustomerVehicleModal from "../components/vehicles/CustomerVehicleModal";


const CustomerVehiclesPage = () => {

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

    // Add / Edit Modal
    isModalOpen,
    editingVehicle,
    savingVehicle,
    saveError,

    // Delete
    deleteVehicleTarget,
    deletingVehicle,

    // Actions
    setSearch,
    setPage,
    resetFilters,
    refresh,

    handleOpenAddVehicle,
    handleOpenEditVehicle,
    handleCloseModal,

    handleAddVehicle,
    handleUpdateVehicle,

    handleDeleteVehicle,
    handleConfirmDeleteVehicle,
    handleCloseDeleteVehicle,

    // Errors
    clearError,
    clearSaveError,

  } = useCustomerVehicles();


  // ==========================================
  // Add / Update Vehicle
  // ==========================================

  const handleSubmitVehicle = async (vehicleData) => {

    try {

      if (editingVehicle) {

        await handleUpdateVehicle(
          editingVehicle.id,
          vehicleData
        );

      } else {

        await handleAddVehicle(
          vehicleData
        );

      }

    } catch {
      // Error is already handled inside hook.
    }
  };


  return (
    <div className="min-h-screen px-6 py-8">

      {/* ==========================================
          Page Header
      ========================================== */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div>

          <h1 className="text-3xl font-bold text-white">
            My Vehicles
          </h1>

          <p className="mt-2 text-slate-400">
            Manage the vehicles you use for your
            service bookings.
          </p>

        </div>


        <button
          onClick={handleOpenAddVehicle}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-5
            py-3
            font-medium
            text-slate-900
            transition
            hover:bg-slate-100
          "
        >
          <Plus size={18} />
          Add Vehicle
        </button>

      </div>


      {/* ==========================================
          Search
      ========================================== */}

      <div className="mb-6 flex gap-3">

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search your vehicles..."
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
            py-3
            text-white
            outline-none
            placeholder:text-slate-500
            focus:border-slate-500
          "
        />

        {search && (
          <button
            onClick={resetFilters}
            className="
              rounded-xl
              border
              border-slate-700
              px-4
              py-3
              text-slate-300
              transition
              hover:bg-slate-800
            "
          >
            Reset
          </button>
        )}

      </div>


      {/* ==========================================
          Vehicle Count
      ========================================== */}

      <div className="mb-6">

        <div className="flex items-center gap-3">

          <h2 className="text-2xl font-semibold text-white">
            Your Vehicles
          </h2>

          <span
            className="
              rounded-full
              bg-slate-800
              px-3
              py-1
              text-sm
              text-slate-300
            "
          >
            {totalItems}
          </span>

        </div>

        <p className="mt-2 text-slate-400">
          These vehicles will be available when
          you create a service booking.
        </p>

      </div>


      {/* ==========================================
          Error
      ========================================== */}

      {error && (
        <div
          className="
            mb-6
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            px-5
            py-4
            text-red-300
          "
        >

          <span>{error}</span>

          <button
            onClick={clearError}
            className="text-sm hover:text-white"
          >
            Dismiss
          </button>

        </div>
      )}


      {/* ==========================================
          Save Error
      ========================================== */}

      {saveError && (
        <div
          className="
            mb-6
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            px-5
            py-4
            text-red-300
          "
        >

          <span>{saveError}</span>

          <button
            onClick={clearSaveError}
            className="text-sm hover:text-white"
          >
            Dismiss
          </button>

        </div>
      )}


      {/* ==========================================
          Loading
      ========================================== */}

      {loading && vehicles.length === 0 && (
        <div className="flex justify-center py-20">

          <p className="text-slate-400">
            Loading vehicles...
          </p>

        </div>
      )}


      {/* ==========================================
          Empty State
      ========================================== */}

      {!loading &&
        vehicles.length === 0 &&
        !error && (

          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-900/60
              py-20
              text-center
            "
          >

            <h3 className="text-xl font-semibold text-white">
              {search
                ? "No vehicles found"
                : "No vehicles added"}
            </h3>

            <p className="mt-2 text-slate-400">

              {search
                ? "Try a different search."
                : "Add your first vehicle to use it while booking a service."}

            </p>

            {!search && (
              <button
                onClick={handleOpenAddVehicle}
                className="
                  mt-5
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  font-medium
                  text-slate-900
                  transition
                  hover:bg-slate-100
                "
              >
                + Add Vehicle
              </button>
            )}

          </div>
        )}


      {/* ==========================================
          Vehicles Grid
      ========================================== */}

      {vehicles.length > 0 && (

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {vehicles.map((vehicle) => (

            <CustomerVehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onEdit={handleOpenEditVehicle}
              onDelete={handleDeleteVehicle}
            />

          ))}

        </div>

      )}


      {/* ==========================================
          Pagination
      ========================================== */}

      {totalPages > 1 && (

        <div className="mt-8 flex justify-center gap-2">

          <button
            disabled={currentPage <= 1}
            onClick={() =>
              setPage(currentPage - 1)
            }
            className="
              rounded-lg
              border
              border-slate-700
              px-4
              py-2
              text-slate-300
              disabled:cursor-not-allowed
              disabled:opacity-40
              hover:bg-slate-800
            "
          >
            Previous
          </button>


          <span
            className="
              flex
              items-center
              rounded-lg
              bg-slate-800
              px-4
              py-2
              text-slate-300
            "
          >
            {currentPage} / {totalPages}
          </span>


          <button
            disabled={currentPage >= totalPages}
            onClick={() =>
              setPage(currentPage + 1)
            }
            className="
              rounded-lg
              border
              border-slate-700
              px-4
              py-2
              text-slate-300
              disabled:cursor-not-allowed
              disabled:opacity-40
              hover:bg-slate-800
            "
          >
            Next
          </button>

        </div>

      )}


      {/* ==========================================
          Refresh
      ========================================== */}

      <div className="mt-6 flex justify-center">

        <button
          onClick={refresh}
          disabled={loading}
          className="
            rounded-xl
            border
            border-slate-700
            px-5
            py-2
            text-sm
            text-slate-300
            transition
            hover:bg-slate-800
            disabled:opacity-50
          "
        >
          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>

      </div>


      {/* ==========================================
          Add / Update Modal
      ========================================== */}

      <CustomerVehicleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitVehicle}
        vehicle={editingVehicle}
        loading={savingVehicle}
      />


      {/* ==========================================
          Delete Confirmation
      ========================================== */}

      {deleteVehicleTarget && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            px-4
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              p-6
            "
          >

            <h3 className="text-xl font-semibold text-white">
              Delete Vehicle
            </h3>

            <p className="mt-3 text-slate-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">
                {deleteVehicleTarget.vehicleNumber ||
                  deleteVehicleTarget.registrationNumber ||
                  "this vehicle"}
              </span>
              ?
            </p>


            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={handleCloseDeleteVehicle}
                disabled={deletingVehicle}
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-4
                  py-2
                  text-slate-300
                  hover:bg-slate-800
                  disabled:opacity-50
                "
              >
                Cancel
              </button>


              <button
                onClick={handleConfirmDeleteVehicle}
                disabled={deletingVehicle}
                className="
                  rounded-xl
                  bg-red-500
                  px-4
                  py-2
                  font-medium
                  text-white
                  hover:bg-red-600
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {deletingVehicle
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default CustomerVehiclesPage;