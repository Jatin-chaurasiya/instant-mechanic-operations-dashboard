import {
  CalendarCheck,
  RefreshCw,
  Plus,
} from "lucide-react";

import BookingSearch from "../components/bookings/BookingSearch";
import BookingFilters from "../components/bookings/BookingFilters";
import BookingSort from "../components/bookings/BookingSort";
import BookingsTable from "../components/bookings/BookingsTable";
import AddBookingModal from "../components/bookings/AddBookingModal";
import AssignBookingModal from "../components/bookings/AssignBookingModal";

import ConfirmModal from "../components/ui/ConfirmModal";
import Button from "../components/ui/Button";

import useBookings from "../hooks/bookings/useBookings";

// ======================================================
// Bookings Page
// ======================================================

const BookingsPage = () => {
  const {
    // ==================================================
    // All Bookings
    // ==================================================

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

    // ==================================================
    // Categories
    // ==================================================

    categories,

    // ==================================================
    // Existing All Booking Handlers
    // ==================================================

    setSearch,
    setStatus,
    setCategory,
    setSort,
    setPage,
    resetFilters,

    // ==================================================
    // Sections
    // ==================================================

    activeSection,

    pendingCount,
    activeCount,

    sectionBookings,
    sectionCurrentPage,
    sectionTotalPages,
    sectionTotalItems,
    sectionIsLoading,
    sectionErrorMessage,

    handleSectionChange,
    handleCurrentSectionPageChange,

    // ==================================================
    // Refresh
    // ==================================================

    refreshCurrentSection,

    // ==================================================
    // Add Booking
    // ==================================================

    isAddBookingOpen,
    openAddBooking,
    closeAddBooking,
    handleAddBooking,

    // ==================================================
    // Assign Booking
    // ==================================================

    isAssignBookingOpen,
    selectedBooking,
    handleAssignClick,
    handleAssigned,
    handleCloseAssignModal,

    // ==================================================
    // Delete Booking
    // ==================================================

    deleteBookingTarget,
    deletingBooking,

    handleDeleteBooking,
    handleConfirmDeleteBooking,
    handleCloseDeleteModal,
  } = useBookings();

  return (
    <div>
      {/* ==========================================
          Page Header
      ========================================== */}

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
            <h1
              className="
                text-2xl font-bold tracking-tight
                text-slate-900
                dark:text-white
                sm:text-3xl
              "
            >
              Bookings
            </h1>

            <span
              className="
                rounded-full
                bg-slate-100
                px-2.5 py-1
                text-xs font-semibold
                text-slate-600
                dark:bg-slate-800
                dark:text-slate-300
              "
            >
              {sectionTotalItems}
            </span>
          </div>

          <p
            className="
              mt-1.5 text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Manage and monitor all vehicle
            service bookings.
          </p>
        </div>

        {/* Header Actions */}

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={RefreshCw}
            loading={refreshing}
            onClick={refreshCurrentSection}
          >
            Refresh
          </Button>

          <Button
            variant="primary"
            icon={Plus}
            onClick={openAddBooking}
          >
            Add Booking
          </Button>
        </div>
      </div>

      {/* ==========================================
          Search & Controls
          Only for All Bookings
      ========================================== */}

      {activeSection === "all" && (
        <div
          className="
            mt-6
            rounded-2xl
            border border-slate-200
            bg-white
            p-4
            shadow-sm
            dark:border-slate-700
            dark:bg-slate-900
            sm:p-5
          "
        >
          <div
            className="
              flex flex-col gap-4
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >
            <BookingSearch
              value={search}
              onChange={setSearch}
              placeholder="
                Search by booking, customer, vehicle...
              "
            />

            <BookingSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={setSort}
            />
          </div>

          <div
            className="
              mt-4
              border-t border-slate-100
              pt-4
              dark:border-slate-800
            "
          >
            <BookingFilters
              status={status}
              category={category}
              onStatusChange={setStatus}
              onCategoryChange={setCategory}
              onReset={resetFilters}
              categories={categories}
            />
          </div>
        </div>
      )}

      {/* ==========================================
          Booking Sections
      ========================================== */}

      <div
        className="
          mt-6
          flex
          overflow-x-auto
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-1.5
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* All */}

        <button
          type="button"
          onClick={() =>
            handleSectionChange("all")
          }
          className={`
            whitespace-nowrap
            rounded-xl
            px-5 py-2.5
            text-sm
            font-semibold
            transition

            ${
              activeSection === "all"
                ? `
                  bg-slate-900
                  text-white
                  dark:bg-white
                  dark:text-slate-900
                `
                : `
                  text-slate-500
                  hover:bg-slate-100
                  dark:text-slate-400
                  dark:hover:bg-slate-800
                `
            }
          `}
        >
          All Bookings

          <span className="ml-2 opacity-70">
            ({totalItems})
          </span>
        </button>

        {/* Pending */}

        <button
          type="button"
          onClick={() =>
            handleSectionChange("pending")
          }
          className={`
            whitespace-nowrap
            rounded-xl
            px-5 py-2.5
            text-sm
            font-semibold
            transition

            ${
              activeSection === "pending"
                ? `
                  bg-slate-900
                  text-white
                  dark:bg-white
                  dark:text-slate-900
                `
                : `
                  text-slate-500
                  hover:bg-slate-100
                  dark:text-slate-400
                  dark:hover:bg-slate-800
                `
            }
          `}
        >
          Pending Assignments

          <span className="ml-2 opacity-70">
            ({pendingCount})
          </span>
        </button>

        {/* Active */}

        <button
          type="button"
          onClick={() =>
            handleSectionChange("active")
          }
          className={`
            whitespace-nowrap
            rounded-xl
            px-5 py-2.5
            text-sm
            font-semibold
            transition

            ${
              activeSection === "active"
                ? `
                  bg-slate-900
                  text-white
                  dark:bg-white
                  dark:text-slate-900
                `
                : `
                  text-slate-500
                  hover:bg-slate-100
                  dark:text-slate-400
                  dark:hover:bg-slate-800
                `
            }
          `}
        >
          Active Bookings

          <span className="ml-2 opacity-70">
            ({activeCount})
          </span>
        </button>
      </div>

      {/* ==========================================
          Current Section
      ========================================== */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {activeSection === "all" &&
              "All Bookings"}

            {activeSection === "pending" &&
              "Pending Assignments"}

            {activeSection === "active" &&
              "Active Bookings"}
          </h2>

          <p
            className="
              mt-0.5
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            {activeSection === "all" &&
              "View and manage all service bookings."}

            {activeSection === "pending" &&
              "Bookings waiting for mechanic assignment."}

            {activeSection === "active" &&
              "Bookings currently assigned or in service."}
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-slate-100
            px-3 py-1
            text-xs font-semibold
            text-slate-600
            dark:bg-slate-800
            dark:text-slate-300
          "
        >
          {sectionTotalItems} bookings
        </span>
      </div>

      {/* ==========================================
          Bookings Table
      ========================================== */}

      <div className="mt-4">
        <BookingsTable
          bookings={sectionBookings}
          loading={sectionIsLoading}
          error={sectionErrorMessage}
          currentPage={sectionCurrentPage}
          totalPages={sectionTotalPages}
          totalItems={sectionTotalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={
            handleCurrentSectionPageChange
          }
          onRetry={refreshCurrentSection}
          section={activeSection}
          onAssign={handleAssignClick}
          onDelete={handleDeleteBooking}
        />
      </div>

      {/* ==========================================
          Live Status
      ========================================== */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-end
          gap-2
          text-xs
          text-slate-400
          dark:text-slate-500
        "
      >
        <CalendarCheck size={14} />

        <span>
          Bookings automatically refresh every
          30 seconds
        </span>

        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-emerald-500
          "
        />
      </div>

      {/* ==========================================
          Add Booking Modal
      ========================================== */}

      <AddBookingModal
        isOpen={isAddBookingOpen}
        onClose={closeAddBooking}
        onSubmit={handleAddBooking}
      />

      {/* ==========================================
          Assign Booking Modal
      ========================================== */}

      <AssignBookingModal
        isOpen={isAssignBookingOpen}
        onClose={handleCloseAssignModal}
        booking={selectedBooking}
        onAssigned={handleAssigned}
      />

      {/* ==========================================
          Delete Booking Confirmation
      ========================================== */}

      <ConfirmModal
        isOpen={Boolean(deleteBookingTarget)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteBooking}
        title="Delete Booking"
        description={
          deleteBookingTarget
            ? `Are you sure you want to delete booking #${
                deleteBookingTarget.bookingCode ||
                deleteBookingTarget.id
              }? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Booking"
        cancelText="Cancel"
        loading={deletingBooking}
      />
    </div>
  );
};

export default BookingsPage;