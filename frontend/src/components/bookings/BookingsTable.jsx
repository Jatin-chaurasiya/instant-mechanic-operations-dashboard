import { CalendarX2 } from "lucide-react";

import BookingRow from "./BookingRow";
import BookingDetailModal from "./BookingDetailModal";
import Pagination from "./Pagination";

import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";
import Skeleton from "../ui/Skeleton";

const TABLE_HEADINGS = [
  "Booking ID",
  "Customer",
  "Vehicle",
  "Service",
  "Mechanic",
  "Status",
  "Amount",
  "Date / Time",
  "Action",
];

const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 7 }).map(
        (_, rowIndex) => (
          <tr
            key={rowIndex}
            className="
              border-b
              border-slate-100
              dark:border-slate-800
            "
          >
            {Array.from({ length: 9 }).map(
              (_, columnIndex) => (
                <td
                  key={columnIndex}
                  className="px-5 py-5 sm:px-6"
                >
                  <Skeleton
                    variant="text"
                    className="
                      h-4
                      w-full
                      max-w-[110px]
                    "
                  />
                </td>
              )
            )}
          </tr>
        )
      )}
    </>
  );
};

const TableHeader = () => {
  return (
    <thead>
      <tr
        className="
          border-b
          border-slate-200
          bg-slate-50/80
          dark:border-slate-700
          dark:bg-slate-800/70
        "
      >
        {TABLE_HEADINGS.map((heading) => (
          <th
            key={heading}
            className="
              whitespace-nowrap
              px-5 py-3.5
              text-left
              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
              dark:text-slate-400
              sm:px-6
            "
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const BookingsTable = ({
  bookings = [],
  loading = false,
  error = null,
  currentPage = 0,
  totalPages = 1,
  totalItems = bookings.length,
  itemsPerPage = 10,
  onPageChange,
  onRetry,
  section = "all",
  onAssign,
  onDelete,

  // Booking Detail Modal
  // Controlled from Hook / Page
  selectedBooking = null,
  onView,
  onCloseDetail,
}) => {
  // Assign Booking
  const handleAssignBooking = (booking) => {
    onAssign?.(booking);
  };

  // Delete Booking
  const handleDeleteBooking = (booking) => {
    // Confirmation is handled outside this component.
    onDelete?.(booking);
  };

  // Section Title
  const getSectionTitle = () => {
    if (section === "pending") {
      return "Pending Assignments";
    }

    if (section === "active") {
      return "Active Bookings";
    }

    return "Recent Bookings";
  };

  // Section Description
  const getSectionDescription = () => {
    if (section === "pending") {
      return "Assign available mechanics to pending bookings.";
    }

    if (section === "active") {
      return "Monitor currently active service bookings.";
    }

    return "Monitor and manage vehicle service bookings.";
  };

  // Empty State
  const getEmptyTitle = () => {
    if (section === "pending") {
      return "No pending assignments";
    }

    if (section === "active") {
      return "No active bookings";
    }

    return "No bookings found";
  };

  const getEmptyDescription = () => {
    if (section === "pending") {
      return "There are no bookings waiting for mechanic assignment.";
    }

    if (section === "active") {
      return "There are currently no active service bookings.";
    }

    return "There are no bookings matching your current search or filters.";
  };

  // Render
  return (
    <>
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* Table Header */}
        <div
          className="
            flex
            flex-col
            gap-1
            border-b
            border-slate-200
            px-5 py-4
            dark:border-slate-700
            sm:px-6
          "
        >
          <h3
            className="
              text-sm
              font-semibold
              text-slate-900
              dark:text-white
              sm:text-base
            "
          >
            {getSectionTitle()}
          </h3>

          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
              sm:text-sm
            "
          >
            {getSectionDescription()}
          </p>
        </div>

        {/* Error */}
        {error && !loading && (
          <div className="p-5 sm:p-6">
            <ErrorState
              title="Unable to load bookings"
              description={
                error ||
                "Something went wrong while fetching bookings."
              }
              onRetry={onRetry}
            />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <TableHeader />

              <tbody>
                <TableSkeleton />
              </tbody>
            </table>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          bookings.length === 0 && (
            <div className="p-5 sm:p-6">
              <EmptyState
                icon={CalendarX2}
                title={getEmptyTitle()}
                description={getEmptyDescription()}
              />
            </div>
          )}

        {/* Table */}
        {!loading &&
          !error &&
          bookings.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table
                  className="
                    w-full
                    min-w-[1100px]
                  "
                >
                  <TableHeader />

                  <tbody>
                    {bookings.map((booking) => (
                      <BookingRow
                        key={booking.id}
                        booking={booking}
                        onView={onView}
                        showAssign={
                          section === "pending"
                        }
                        showDelete={
                          section === "all" &&
                          booking.status === "PENDING"
                        }
                        onAssign={
                          handleAssignBooking
                        }
                        onDelete={
                          handleDeleteBooking
                        }
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
              />
            </>
          )}
      </div>

      {/* Booking Detail Modal */}
      <BookingDetailModal
        isOpen={Boolean(selectedBooking)}
        onClose={onCloseDetail}
        booking={selectedBooking}
      />
    </>
  );
};

export default BookingsTable;