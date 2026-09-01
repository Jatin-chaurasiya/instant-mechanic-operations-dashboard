import {
  Search,
  UsersRound,
  SlidersHorizontal,
  X,
} from "lucide-react";

import MechanicCard from "./MechanicCard";

import Select from "../ui/Select";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";

const MechanicCardSkeleton = () => {
  return (
    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton
            variant="circle"
            className="h-12 w-12"
          />

          <div className="space-y-2">
            <Skeleton
              variant="text"
              className="h-4 w-28"
            />

            <Skeleton
              variant="text"
              className="h-3 w-20"
            />
          </div>
        </div>

        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div
        className="
          my-5
          h-px
          bg-slate-100
          dark:bg-slate-700
        "
      />

      <Skeleton className="h-10 w-full" />

      <Skeleton className="mt-5 h-20 w-full" />

      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
};

const MechanicsGrid = ({
  mechanics = [],
  loading = false,
  error = null,
  onRetry,

  search = "",
  status = "",
  onSearchChange,
  onStatusChange,
  onReset,

  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,

  onView,
}) => {
  const hasFilters = Boolean(search || status);

  return (
    <section>
      {/* =================================
          Header
      ================================== */}

      <div
        className="
          flex flex-col gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Title */}
        <div>
          <div className="flex items-center gap-2">
            <h2
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
            </h2>

            <span
              className="
                inline-flex
                items-center
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
              {totalItems}
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
            Monitor mechanic availability and current service activity.
          </p>
        </div>
      </div>

      {/* =================================
          Filters
      ================================== */}

      <div
        className="
          mt-6
          flex flex-col gap-3
          rounded-2xl
          border border-slate-200
          bg-white
          p-4
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-900
          sm:p-5
          md:flex-row
          md:items-center
        "
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="
              pointer-events-none
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
              dark:text-slate-500
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Search mechanics..."
            className="
              h-11 w-full
              rounded-xl
              border border-slate-200
              bg-slate-50
              pl-10 pr-10
              text-sm
              text-slate-700
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-slate-400
              focus:bg-white
              focus:ring-4
              focus:ring-slate-100
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
              dark:placeholder:text-slate-500
              dark:focus:border-slate-600
              dark:focus:bg-slate-800
              dark:focus:ring-slate-700/50
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange?.("")}
              className="
                absolute right-3 top-1/2
                -translate-y-1/2
                rounded-md
                p-1
                text-slate-400
                hover:bg-slate-200
                hover:text-slate-700
                dark:hover:bg-slate-700
                dark:hover:text-slate-200
              "
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={16}
            className="
              hidden
              text-slate-400
              dark:text-slate-500
              sm:block
            "
          />

          <Select
            value={status}
            onChange={(event) =>
              onStatusChange?.(event.target.value)
            }
            placeholder="All statuses"
            options={[
              {
                value: "AVAILABLE",
                label: "Available",
              },
              {
                value: "BUSY",
                label: "Busy",
              },
              {
                value: "ON_THE_WAY",
                label: "On The Way",
              },
              {
                value: "OFFLINE",
                label: "Offline",
              },
            ]}
            className="w-full sm:w-48"
          />
        </div>

        {/* Reset */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="md"
            onClick={onReset}
          >
            Reset
          </Button>
        )}
      </div>

      {/* =================================
          Error
      ================================== */}

      {error && !loading && (
        <div className="mt-6">
          <ErrorState
            title="Unable to load mechanics"
            description={
              error ||
              "Something went wrong while fetching mechanics."
            }
            onRetry={onRetry}
          />
        </div>
      )}

      {/* =================================
          Loading
      ================================== */}

      {loading && (
        <div
          className="
            mt-6
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <MechanicCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* =================================
          Empty
      ================================== */}

      {!loading &&
        !error &&
        mechanics.length === 0 && (
          <div className="mt-6">
            <EmptyState
              icon={UsersRound}
              title={
                hasFilters
                  ? "No mechanics found"
                  : "No mechanics available"
              }
              description={
                hasFilters
                  ? "Try changing your search or status filter."
                  : "Mechanic information will appear here once data is available."
              }
              actionLabel={hasFilters ? "Clear Filters" : undefined}
              onAction={hasFilters ? onReset : undefined}
            />
          </div>
        )}

      {/* =================================
          Grid
      ================================== */}

      {!loading &&
        !error &&
        mechanics.length > 0 && (
          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-4
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {mechanics.map((mechanic) => (
              <MechanicCard
                key={mechanic.id}
                mechanic={mechanic}
                onView={onView}
              />
            ))}
          </div>
        )}

      {/* =================================
          Result Count
      ================================== */}

      {!loading &&
        !error &&
        mechanics.length > 0 && (
          <div
            className="
              mt-5
              flex
              flex-col
              items-center
              justify-between
              gap-3
              sm:flex-row
            "
          >
            <p
              className="
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              Showing{" "}
              <span
                className="
                  font-semibold
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {mechanics.length}
              </span>{" "}
              of{" "}
              <span
                className="
                  font-semibold
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {totalItems}
              </span>{" "}
              mechanics
            </p>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() =>
                    onPageChange?.(currentPage - 1)
                  }
                >
                  Previous
                </Button>

                <span
                  className="
                    min-w-[90px]
                    text-center
                    text-xs
                    font-medium
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    onPageChange?.(currentPage + 1)
                  }
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
    </section>
  );
};

export default MechanicsGrid;