import { CalendarCheck, RefreshCw } from "lucide-react";
import {useState,useEffect} from 'react';

import BookingSearch from "../components/bookings/BookingSearch";
import BookingFilters from "../components/bookings/BookingFilters";
import BookingSort from "../components/bookings/BookingSort";
import BookingsTable from "../components/bookings/BookingsTable";
import Button from "../components/ui/Button";
import useBookings from "../hooks/useBookings";
import serviceApi from "../api/serviceApi";

const BookingsPage = () => {
  const [categories, setCategories] = useState([]);
  const {
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
    setSearch,
    setStatus,
    setCategory,
    setSort,
    setPage,
    resetFilters,
    refresh,
  } = useBookings();
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await serviceApi.getCategories();

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Unable to load service categories:", error);

        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  return (
    <div>
      {/* Page Header */}
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
                .replace(/\b\w/g, (char) => char.toUpperCase())}
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
        <BookingsTable
          bookings={bookings}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          onRetry={refresh}
        />
      </div>

      {/* Live Status */}
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

        <span>Bookings automatically refresh every 30 seconds</span>

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
};

export default BookingsPage;
