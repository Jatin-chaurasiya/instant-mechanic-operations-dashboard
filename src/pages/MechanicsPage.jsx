import {
  Wrench,
  RefreshCw,
} from "lucide-react";

import MechanicsGrid from "../components/mechanics/MechanicsGrid";
import Button from "../components/ui/Button";
import useMechanics from "../hooks/useMechanics";

const MechanicsPage = () => {
  const {
    mechanics,
    loading,
    refreshing,
    error,
    search,
    status,
    currentPage,
    totalPages,
    totalItems,
    refresh,
    setSearch,
    setStatus,
    setPage,
    resetFilters,
  } = useMechanics();

  return (
    <div>
      {/* Header */}
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

      {/* Mechanics */}
      <div className="mt-6">
        <MechanicsGrid
          mechanics={mechanics}
          loading={loading}
          error={error}
          onRetry={refresh}
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onReset={resetFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={setPage}
        />
      </div>

      {/* Live Status */}
      <div
        className="
          mt-5
          flex
          items-center
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