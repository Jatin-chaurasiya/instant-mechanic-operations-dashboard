import { Wrench, RefreshCw, Plus } from "lucide-react";

import MechanicsGrid from "../components/mechanics/MechanicsGrid";
import AddMechanicModal from "../components/mechanics/AddMechanicModal";
import Button from "../components/ui/Button";
import MechanicDetailsModal from "../components/mechanics/MechanicDetailsModal";

import useMechanics from "../hooks/mechanics/useMechanics";

const MechanicsPage = () => {
  const {
    search,
    status,
    totalItems,

    activeSection,
    sectionData,

    available,
    inactive,

    detailsOpen,
    selectedMechanicId,

    mechanicModalOpen,
    selectedMechanic,
    saving,

    setSearch,
    setStatus,

    handleSectionChange,
    handleRefresh,
    handleSectionPageChange,
    handleRetry,
    handleReset,

    handleAddClick,
    handleSaveMechanic,
    handleCloseModal,

    handleView,
    handleCloseDetails,

    handleEdit,
    handleDeactivate,
    handleActivate,
  } = useMechanics();

  return (
    <div>
      {/* =====================================================
          Header
      ====================================================== */}

      <div
        className="
          flex flex-col gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-xl
                bg-slate-900
                dark:bg-white
              "
            >
              <Wrench
                size={18}
                className="
                  text-white
                  dark:text-slate-900
                "
              />
            </div>

            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                dark:text-white
                sm:text-3xl
              "
            >
              Mechanics
            </h1>

            <span
              className="
                rounded-full
                bg-slate-100
                px-2.5 py-1
                text-xs
                font-semibold
                text-slate-600
                dark:bg-slate-800
                dark:text-slate-300
              "
            >
              {sectionData.totalItems}
            </span>
          </div>

          <p
            className="
              mt-1.5
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Manage mechanics and monitor their availability.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={RefreshCw}
            loading={
              activeSection === "all"
                ? sectionData.refreshing
                : sectionData.loading
            }
            onClick={handleRefresh}
          >
            Refresh
          </Button>

          <Button
            variant="primary"
            icon={Plus}
            onClick={handleAddClick}
          >
            Add Mechanic
          </Button>
        </div>
      </div>

      {/* =====================================================
          Sections
      ====================================================== */}

      <div
        className="
          mt-6
          flex flex-wrap
          gap-2
          rounded-2xl
          border border-slate-200
          bg-white
          p-2
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* All */}
        <button
          type="button"
          onClick={() => handleSectionChange("all")}
          className={`
            rounded-xl
            px-4 py-2.5
            text-sm font-semibold
            transition
            ${
              activeSection === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            }
          `}
        >
          All Mechanics

          <span className="ml-2 opacity-70">
            {totalItems}
          </span>
        </button>

        {/* Available */}
        <button
          type="button"
          onClick={() =>
            handleSectionChange("available")
          }
          className={`
            rounded-xl
            px-4 py-2.5
            text-sm font-semibold
            transition
            ${
              activeSection === "available"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            }
          `}
        >
          Available Mechanics

          <span className="ml-2 opacity-70">
            {available.totalItems}
          </span>
        </button>

        {/* Inactive */}
        <button
          type="button"
          onClick={() =>
            handleSectionChange("inactive")
          }
          className={`
            rounded-xl
            px-4 py-2.5
            text-sm font-semibold
            transition
            ${
              activeSection === "inactive"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            }
          `}
        >
          Inactive Mechanics

          <span className="ml-2 opacity-70">
            {inactive.totalItems}
          </span>
        </button>
      </div>

      {/* =====================================================
          Mechanics Grid
      ====================================================== */}

      <div className="mt-6">
        <MechanicsGrid
          mechanics={sectionData.mechanics}
          loading={sectionData.loading}
          error={sectionData.error}
          onRetry={handleRetry}
          search={
            activeSection === "all"
              ? search
              : ""
          }
          status={
            activeSection === "all"
              ? status
              : ""
          }
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onReset={handleReset}
          currentPage={sectionData.currentPage}
          totalPages={sectionData.totalPages}
          totalItems={sectionData.totalItems}
          onPageChange={handleSectionPageChange}
          onView={handleView}
          onEdit={handleEdit}
          onDeactivate={handleDeactivate}
          onActivate={handleActivate}
        />
      </div>

      {/* =====================================================
          Mechanic Details Modal
      ====================================================== */}

      <MechanicDetailsModal
        isOpen={detailsOpen}
        onClose={handleCloseDetails}
        mechanicId={selectedMechanicId}
      />

      {/* =====================================================
          Add / Update Mechanic Modal
      ====================================================== */}

      <AddMechanicModal
        isOpen={mechanicModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveMechanic}
        mechanic={selectedMechanic}
        loading={saving}
      />

      {/* =====================================================
          Live Status
      ====================================================== */}

      <div
        className="
          mt-5
          flex items-center
          justify-end
          gap-2
          text-xs
          text-slate-400
          dark:text-slate-500
        "
      >
        <span
          className="
            h-1.5 w-1.5
            rounded-full
            bg-emerald-500
          "
        />

        <span>
          Mechanic status refreshes automatically
        </span>
      </div>
    </div>
  );
};

export default MechanicsPage;