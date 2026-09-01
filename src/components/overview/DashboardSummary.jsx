import {
  CalendarDays,
  RefreshCw,
  Activity,
} from "lucide-react";

import Button from "../ui/Button";

const DashboardSummary = ({
  onRefresh,
  refreshing = false,
  lastUpdated = "Just now",
}) => {

  const today = new Date();

  const formattedDate =
    today.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return (
    <section className="mb-6">

      <div
        className="
          flex flex-col gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* Heading */}

        <div>

          <div className="flex items-center gap-2">

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
              Overview
            </h1>

            {/* Live Indicator */}

            <span
              className="
                hidden
                items-center
                gap-1.5
                rounded-full
                bg-emerald-50
                px-2.5 py-1
                text-xs
                font-medium
                text-emerald-700
                dark:bg-emerald-950/50
                dark:text-emerald-400
                sm:inline-flex
              "
            >

              <span className="relative flex h-1.5 w-1.5">

                <span
                  className="
                    absolute
                    inline-flex
                    h-full w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-75
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-1.5 w-1.5
                    rounded-full
                    bg-emerald-500
                  "
                />

              </span>

              Live

            </span>

          </div>

          <p
            className="
              mt-1.5
              max-w-2xl
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Get a real-time view of bookings,
            revenue, customers and mechanic activity.
          </p>

        </div>

        {/* Right Controls */}

        <div className="flex flex-wrap items-center gap-3">

          {/* Date */}

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-3.5 py-2.5
              shadow-sm
              dark:border-slate-700
              dark:bg-slate-900
              dark:shadow-slate-950/20
            "
          >

            <CalendarDays
              size={17}
              className="
                text-slate-400
                dark:text-slate-500
              "
            />

            <span
              className="
                text-xs
                font-medium
                text-slate-600
                dark:text-slate-300
                sm:text-sm
              "
            >
              {formattedDate}
            </span>

          </div>

          {/* Refresh */}

          <Button
            variant="secondary"
            size="md"
            icon={RefreshCw}
            loading={refreshing}
            onClick={onRefresh}
          >
            <span className="hidden sm:inline">
              Refresh
            </span>
          </Button>

        </div>

      </div>

      {/* Last Updated */}

      <div
        className="
          mt-4
          flex
          items-center
          gap-2
          text-xs
          text-slate-400
          dark:text-slate-500
        "
      >

        <Activity size={14} />

        <span>
          Last updated:{" "}
          <span
            className="
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {lastUpdated}
          </span>
        </span>

        <span
          className="
            h-1 w-1
            rounded-full
            bg-slate-300
            dark:bg-slate-600
          "
        />

        <span>
          Data refreshes automatically
        </span>

      </div>

    </section>
  );
};

export default DashboardSummary;