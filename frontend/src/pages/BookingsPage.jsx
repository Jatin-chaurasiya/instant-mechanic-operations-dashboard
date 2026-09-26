<<<<<<< HEAD
import { CalendarCheck, RefreshCw, Plus } from "lucide-react";
=======
import { CalendarCheck, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
>>>>>>> 13663fd (push backend code)

import BookingSearch from "../components/bookings/BookingSearch";
import BookingFilters from "../components/bookings/BookingFilters";
import BookingSort from "../components/bookings/BookingSort";
import BookingsTable from "../components/bookings/BookingsTable";
<<<<<<< HEAD
import AddBookingModal from "../components/bookings/AddBookingModal";
import RejectBookingModal from "../components/bookings/RejectBookingModal";
import AssignBookingModal from "../components/bookings/AssignBookingModal";
=======
>>>>>>> 13663fd (push backend code)

import Button from "../components/ui/Button";

<<<<<<< HEAD
import useBookings from "../hooks/bookings/useBookings";

const BookingsPage = () => {
  const {
    // All Bookings

=======
import useBookings from "../hooks/useBookings";
import serviceApi from "../api/serviceApi";

const BookingsPage = () => {
  // ==========================================
  // Service Categories
  // Kept as local state because this is
  // page-level category data, not booking state.
  // ==========================================

  const [categories, setCategories] = useState([]);

  const {
    bookings,
    loading,
>>>>>>> 13663fd (push backend code)
    refreshing,
    error,

    search,
    status,
    category,

    sortBy,
    sortOrder,

    totalItems,
    itemsPerPage,

<<<<<<< HEAD
    // Categories

    categories,

    // Existing All Booking Handlers

=======
>>>>>>> 13663fd (push backend code)
    setSearch,
    setStatus,
    setCategory,
    setSort,
    setPage,
    resetFilters,
<<<<<<< HEAD

    // Sections

    activeSection,
    pendingCount,
    activeCount,
    unpaidCount,
    unpaidBookings,
    unpaidPage,
    unpaidTotalPages,
    loadingUnpaid,
    markingAsPaid,
    handleMarkAsPaid,

    sectionBookings,
    sectionCurrentPage,
    sectionTotalPages,
    sectionTotalItems,
    sectionIsLoading,
    sectionErrorMessage,

    handleSectionChange,
    handleCurrentSectionPageChange,

    // Refresh

    refreshCurrentSection,

    // Add Booking

    isAddBookingOpen,
    openAddBooking,
    closeAddBooking,
    handleAddBooking,

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

    handleCustomerSearch,
    handleCustomerChange,
    handleVehicleSearch,
    handleVehicleChange,
    handleServiceChange,
    handleMechanicChange,
    handleBookingDateChange,
    handleBookingTimeChange,
    handleAmountChange,

    // Assign Booking

    isAssignBookingOpen,
    selectedBooking,
    assigning,
    handleAssignClick,
    handleAssignMechanic,
    handleCloseAssignModal,

    // Booking Detail

    handleViewBooking,
    handleCloseDetail,

    // Reject Booking

    isRejectBookingOpen,
    rejectBookingTarget,
    rejectBookingReason,
    rejecting,
    handleRejectClick,
    handleRejectReasonChange,
    handleConfirmReject,
    handleCloseRejectModal,

    // Delete Booking

    deleteBookingTarget,
    deletingBooking,

    handleDeleteBooking,
    handleConfirmDeleteBooking,
    handleCloseDeleteModal,
  } = useBookings();
  return (
    <div>
=======
    refresh,
  } = useBookings();

  // ==========================================
  // Load Categories
  // ==========================================

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data =
          await serviceApi.getCategories();

        setCategories(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Unable to load service categories:",
          error
        );

        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  return (
    <div>
      {/* Page Header */}

>>>>>>> 13663fd (push backend code)
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
              {totalItems}
            </span>
          </div>

          <p
            className="
              mt-1.5 text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Manage and monitor all vehicle service bookings.
          </p>
        </div>

        {/* Refresh */}

<<<<<<< HEAD
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={RefreshCw}
            loading={refreshing}
            onClick={refreshCurrentSection}
          >
            Refresh
          </Button>

          <Button variant="primary" icon={Plus} onClick={openAddBooking}>
            Add Booking
          </Button>
        </div>
      </div>

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
=======
        <Button
          variant="secondary"
          icon={RefreshCw}
          loading={refreshing}
          onClick={refresh}
        >
          Refresh
        </Button>
      </div>

      {/* Search & Controls */}

>>>>>>> 13663fd (push backend code)
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
<<<<<<< HEAD
        {/* All */}

        <button
          type="button"
          onClick={() => handleSectionChange("all")}
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
          <span className="ml-2 opacity-70">({totalItems})</span>
        </button>

        {/* Pending */}

        <button
          type="button"
          onClick={() => handleSectionChange("pending")}
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
          <span className="ml-2 opacity-70">({pendingCount})</span>
        </button>

        {/* Active */}

        <button
          type="button"
          onClick={() => handleSectionChange("active")}
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
          <span className="ml-2 opacity-70">({activeCount})</span>
        </button>
        {/* Unpaid */}

        <button
          type="button"
          onClick={() => handleSectionChange("unpaid")}
          className={`
    whitespace-nowrap
    rounded-xl
    px-5 py-2.5
    text-sm
    font-semibold
    transition

    ${
      activeSection === "unpaid"
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
          Unpaid Bookings
          <span className="ml-2 opacity-70">({unpaidCount})</span>
        </button>
      </div>
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
            {activeSection === "all" && "All Bookings"}

            {activeSection === "pending" && "Pending Assignments"}

            {activeSection === "active" && "Active Bookings"}

            {activeSection === "unpaid" && "Unpaid Bookings"}
          </h2>

          <p
            className="
              mt-0.5
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            {activeSection === "all" && "View and manage all service bookings."}

            {activeSection === "pending" &&
              "Bookings waiting for mechanic assignment."}

            {activeSection === "active" &&
              "Bookings currently assigned or in service."}

            {activeSection === "unpaid" &&
              "Cash bookings waiting for payment confirmation."}
          </p>
        </div>

        <span
=======
        <div
>>>>>>> 13663fd (push backend code)
          className="
            flex flex-col gap-4
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >
          {/* Search */}

          <BookingSearch
            value={search}
            onChange={setSearch}
            placeholder="Search by booking, customer, vehicle..."
          />

          {/* Sort */}

          <BookingSort
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSort}
          />
        </div>

        {/* Filters */}

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
<<<<<<< HEAD
      <div className="mt-4">
=======

      {/* Active Filter Summary */}

      {(search || status || category) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className="
              text-xs font-medium
              text-slate-400
              dark:text-slate-500
            "
          >
            Active filters:
          </span>

          {search && (
            <span
              className="
                rounded-full
                bg-slate-100
                px-2.5 py-1
                text-xs font-medium
                text-slate-600
                dark:bg-slate-800
                dark:text-slate-300
              "
            >
              Search: {search}
            </span>
          )}

          {status && (
            <span
              className="
                rounded-full
                bg-slate-100
                px-2.5 py-1
                text-xs font-medium
                text-slate-600
                dark:bg-slate-800
                dark:text-slate-300
              "
            >
              Status:{" "}
              {status
                .replaceAll("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                )}
            </span>
          )}

          {category && (
            <span
              className="
                rounded-full
                bg-slate-100
                px-2.5 py-1
                text-xs font-medium
                text-slate-600
                dark:bg-slate-800
                dark:text-slate-300
              "
            >
              Service: {category}
            </span>
          )}

          <button
            type="button"
            onClick={resetFilters}
            className="
              text-xs font-medium
              text-slate-500
              underline underline-offset-2
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:text-white
            "
          >
            Clear all
          </button>
        </div>
      )}

      {/* Table */}

      <div className="mt-6">
>>>>>>> 13663fd (push backend code)
        <BookingsTable
          bookings={bookings}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
<<<<<<< HEAD
          onPageChange={handleCurrentSectionPageChange}
          onRetry={refreshCurrentSection}
          section={activeSection}
          onAssign={handleAssignClick}
          onReject={handleRejectClick}
          onDelete={handleDeleteBooking}
          selectedBooking={selectedBooking}
          onView={handleViewBooking}
          onCloseDetail={handleCloseDetail}
          onMarkAsPaid={handleMarkAsPaid}
          markingAsPaid={markingAsPaid}
        />
      </div>
=======
          onPageChange={setPage}
          onRetry={refresh}
        />
      </div>

      {/* Live Status */}

>>>>>>> 13663fd (push backend code)
      <div
        className="
          mt-4
          flex items-center justify-end gap-2
          text-xs
          text-slate-400
          dark:text-slate-500
        "
      >
        <CalendarCheck size={14} />

<<<<<<< HEAD
        <span>Bookings automatically refresh every 30 seconds</span>
=======
        <span>
          Bookings automatically refresh every 30 seconds
        </span>
>>>>>>> 13663fd (push backend code)

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </div>
<<<<<<< HEAD
      <AddBookingModal
        isOpen={isAddBookingOpen}
        onClose={closeAddBooking}
        onSubmit={handleAddBooking}
        customers={customers}
        vehicles={vehicles}
        services={services}
        mechanics={mechanics}
        customerId={customerId}
        vehicleId={vehicleId}
        serviceId={serviceId}
        mechanicId={mechanicId}
        bookingDate={bookingDate}
        bookingTime={bookingTime}
        amount={amount}
        customerSearch={customerSearch}
        vehicleSearch={vehicleSearch}
        loadingCustomers={loadingCustomers}
        loadingVehicles={loadingVehicles}
        loadingServices={loadingServices}
        loadingMechanics={loadingMechanics}
        submitting={submitting}
        error={error}
        onCustomerSearch={handleCustomerSearch}
        onCustomerChange={handleCustomerChange}
        onVehicleSearch={handleVehicleSearch}
        onVehicleChange={handleVehicleChange}
        onServiceChange={handleServiceChange}
        onMechanicChange={handleMechanicChange}
        onBookingDateChange={handleBookingDateChange}
        onBookingTimeChange={handleBookingTimeChange}
        onAmountChange={handleAmountChange}
      />
      <AssignBookingModal
        isOpen={isAssignBookingOpen}
        onClose={handleCloseAssignModal}
        booking={selectedBooking}
        mechanics={mechanics}
        selectedMechanicId={mechanicId}
        assigning={assigning}
        onMechanicSelect={handleMechanicChange}
        onAssign={(_, mechanicId) => handleAssignMechanic(mechanicId)}
      />
      <RejectBookingModal
        isOpen={isRejectBookingOpen}
        onClose={handleCloseRejectModal}
        booking={rejectBookingTarget}
        reason={rejectBookingReason}
        rejecting={rejecting}
        onReasonChange={handleRejectReasonChange}
        onReject={handleConfirmReject}
      />
      <ConfirmModal
        isOpen={Boolean(deleteBookingTarget)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteBooking}
        title="Delete Booking"
        description={
          deleteBookingTarget
            ? `Are you sure you want to delete booking #${
                deleteBookingTarget.bookingCode || deleteBookingTarget.id
              }? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Booking"
        cancelText="Cancel"
        loading={deletingBooking}
      />
=======
>>>>>>> 13663fd (push backend code)
    </div>
  );
};

export default BookingsPage;
