import {
  CalendarCheck,
  Activity,
} from "lucide-react";

import DashboardSummary from "../components/overview/DashboardSummary";
import StatsGrid from "../components/overview/StatsGrid";

import BookingsOverTimeChart from "../components/analytics/BookingsOverTimeChart";
import RevenueChart from "../components/analytics/RevenueChart";
import StatusPieChart from "../components/analytics/StatusPieChart";
import CategoryBarChart from "../components/analytics/CategoryBarChart";

import ErrorState from "../components/ui/ErrorState";

import useDashboardData from "../hooks/useDashboardData";
import useAnalytics from "../hooks/useAnalytics";

const OverviewPage = () => {

  // ==============================
  // Dashboard data
  // ==============================

  const {
  stats,
  loading,
  refreshing,
  error: dashboardError,
  lastUpdated,
  refresh,
} = useDashboardData();

  // ==============================
  // Analytics data
  // ==============================

  const {
  loading: analyticsLoading,
  error: analyticsError,
  bookingsOverTime,
  revenueOverTime,
  statusDistribution,
  categoryBreakdown,
} = useAnalytics();

  // ==============================
  // Chart data from backend
  // ==============================

  const bookingsData =
  bookingsOverTime || [];

const revenueData =
  revenueOverTime || [];

  // Backend mein abhi ye dono available nahi hain.
  // Isliye fake/hardcoded data nahi rakhenge.
  const statusData =
  statusDistribution || [];

const categoryData =
  categoryBreakdown || [];

  const error =
    dashboardError || analyticsError;

  const pageLoading =
    loading || analyticsLoading;

  return (
    <div>

      {/* Page Summary */}

      <DashboardSummary
        onRefresh={refresh}
        refreshing={refreshing}
        lastUpdated={lastUpdated}
      />

      {/* Error */}

      {error && !pageLoading && (
        <div className="mb-6">
          <ErrorState
            title="Unable to load dashboard"
            description={error}
            onRetry={refresh}
          />
        </div>
      )}

      {/* Statistics */}

      <StatsGrid
        stats={stats}
        loading={loading}
      />

      {/* Live Information */}

      <div className="mt-6">

        <div
          className="
            flex flex-col gap-3
            rounded-2xl
            border border-slate-200
            bg-white
            p-4
            shadow-sm
            dark:border-slate-700
            dark:bg-slate-900
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-5
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-emerald-50
                dark:bg-emerald-950/50
              "
            >
              <Activity
                size={19}
                className="
                  text-emerald-600
                  dark:text-emerald-400
                "
              />
            </div>

            <div>

              <p
                className="
                  text-sm font-semibold
                  text-slate-800
                  dark:text-slate-100
                "
              >
                Operations are running normally
              </p>

              <p
                className="
                  mt-0.5 text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Dashboard data is being refreshed automatically.
              </p>

            </div>
          </div>

          <div
            className="
              flex items-center gap-2
              text-xs font-medium
              text-emerald-600
              dark:text-emerald-400
            "
          >
            <span
              className="
                h-2 w-2
                rounded-full
                bg-emerald-500
              "
            />

            System Live
          </div>

        </div>

      </div>

      {/* Main Analytics */}

      <section className="mt-6">

        <div className="mb-4 flex items-center gap-2">

          <CalendarCheck
            size={18}
            className="
              text-slate-500
              dark:text-slate-400
            "
          />

          <h2
            className="
              text-base font-semibold
              text-slate-900
              dark:text-white
            "
          >
            Performance Overview
          </h2>

        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-2
          "
        >

          <BookingsOverTimeChart
            data={bookingsData}
          />

          <RevenueChart
            data={revenueData}
          />

          <StatusPieChart
            data={statusData}
          />

          <CategoryBarChart
            data={categoryData}
          />

        </div>

      </section>

    </div>
  );
};

export default OverviewPage;