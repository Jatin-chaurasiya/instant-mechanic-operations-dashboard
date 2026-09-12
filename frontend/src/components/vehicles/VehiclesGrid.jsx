import { Search, CarFront, X } from "lucide-react";

import VehicleCard from "./VehicleCard";

import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";

const VehicleCardSkeleton = () => {
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

      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="h-12 w-12" />

        <div className="space-y-2">
          <Skeleton variant="text" className="h-4 w-32" />

          <Skeleton variant="text" className="h-3 w-20" />
        </div>
      </div>

      {/* Divider */}

      <div
        className="
          my-5
          h-px
          bg-slate-100
          dark:bg-slate-700
        "
      />

      {/* Vehicle Information */}

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />

        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Button */}

      <Skeleton
        className="
          mt-5
          h-10
          w-full
          rounded-xl
        "
      />
    </div>
  );
};

const VehiclesGrid = ({
  vehicles = [],

  loading = false,
  error = null,
  onRetry,

  search = "",
  onSearchChange,
  onReset,

  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,

  onView,
  onDelete,
  deletingId,
}) => {
  const hasSearch = Boolean(search?.trim());

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
              Vehicles
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
            View and manage registered vehicles.
          </p>
        </div>
      </div>

      {/* =================================
          Search
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
          sm:flex-row
          sm:items-center
        "
      >
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
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Search vehicles..."
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

          {hasSearch && (
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

        {hasSearch && (
          <Button variant="ghost" size="md" onClick={onReset}>
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
            title="Unable to load vehicles"
            description={
              error || "Something went wrong while fetching vehicles."
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
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <VehicleCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* =================================
          Empty
      ================================== */}

      {!loading && !error && vehicles.length === 0 && (
        <div className="mt-6">
          <EmptyState
            icon={CarFront}
            title={hasSearch ? "No vehicles found" : "No vehicles available"}
            description={
              hasSearch
                ? "Try changing your search."
                : "Vehicle information will appear here once vehicles are added."
            }
            actionLabel={hasSearch ? "Clear Search" : undefined}
            onAction={hasSearch ? onReset : undefined}
          />
        </div>
      )}

      {/* =================================
          Vehicle Grid
      ================================== */}

      {!loading && !error && vehicles.length > 0 && (
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
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onView={onView}
              onDelete={onDelete}
              deleting={deletingId === vehicle.id}
            />
          ))}
        </div>
      )}

      {/* =================================
          Result Count + Pagination
      ================================== */}

      {!loading && !error && vehicles.length > 0 && (
        <div
          className="
              mt-5
              flex flex-col
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
              {vehicles.length}
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
            vehicles
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange?.(currentPage - 1)}
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
                onClick={() => onPageChange?.(currentPage + 1)}
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

export default VehiclesGrid;
