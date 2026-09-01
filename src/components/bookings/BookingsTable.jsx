import { useState } from "react";

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
        {TABLE_HEADINGS.map(
          (heading) => (
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
          )
        )}
      </tr>
    </thead>
  );
};

const BookingsTable = ({
  bookings = [],
  loading = false,
  error = null,
  currentPage = 1,
  totalPages = 1,
  totalItems = bookings.length,
  itemsPerPage = 10,
  onPageChange,
  onRetry,
}) => {
  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

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
            Recent Bookings
          </h3>

          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
              sm:text-sm
            "
          >
            Monitor and manage vehicle
            service bookings.
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
                title="No bookings found"
                description="
                  There are no bookings matching your
                  current search or filters.
                "
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
                    {bookings.map(
                      (booking) => (
                        <BookingRow
                          key={booking.id}
                          booking={booking}
                          onView={
                            handleViewBooking
                          }
                        />
                      )
                    )}
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

      {/* Detail Modal */}

      <BookingDetailModal
        isOpen={Boolean(selectedBooking)}
        onClose={handleCloseModal}
        booking={selectedBooking}
      />
    </>
  );
};

export default BookingsTable;