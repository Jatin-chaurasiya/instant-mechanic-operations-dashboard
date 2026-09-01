import {
  BarChart3,
  TrendingUp,
  CalendarRange,
} from "lucide-react";

import BookingsOverTimeChart from "../components/analytics/BookingsOverTimeChart";
import RevenueChart from "../components/analytics/RevenueChart";
import StatusPieChart from "../components/analytics/StatusPieChart";
import CategoryBarChart from "../components/analytics/CategoryBarChart";

const AnalyticsPage = () => {
  const bookingsData = [
    { date: "Aug 01", bookings: 42 },
    { date: "Aug 03", bookings: 55 },
    { date: "Aug 05", bookings: 48 },
    { date: "Aug 07", bookings: 67 },
    { date: "Aug 09", bookings: 61 },
    { date: "Aug 11", bookings: 74 },
    { date: "Aug 13", bookings: 69 },
    { date: "Aug 15", bookings: 82 },
    { date: "Aug 17", bookings: 77 },
    { date: "Aug 19", bookings: 91 },
    { date: "Aug 21", bookings: 86 },
    { date: "Aug 23", bookings: 96 },
    { date: "Aug 25", bookings: 88 },
    { date: "Aug 27", bookings: 103 },
    { date: "Aug 29", bookings: 98 },
    { date: "Aug 31", bookings: 112 },
  ];

  const revenueData = [
    { date: "Aug 01", revenue: 18500 },
    { date: "Aug 03", revenue: 22400 },
    { date: "Aug 05", revenue: 19800 },
    { date: "Aug 07", revenue: 27600 },
    { date: "Aug 09", revenue: 25100 },
    { date: "Aug 11", revenue: 31200 },
    { date: "Aug 13", revenue: 28900 },
    { date: "Aug 15", revenue: 34600 },
    { date: "Aug 17", revenue: 32100 },
    { date: "Aug 19", revenue: 38900 },
    { date: "Aug 21", revenue: 36100 },
    { date: "Aug 23", revenue: 42700 },
    { date: "Aug 25", revenue: 39800 },
    { date: "Aug 27", revenue: 46100 },
    { date: "Aug 29", revenue: 43800 },
    { date: "Aug 31", revenue: 49200 },
  ];

  const statusData = [
    { name: "Completed", value: 620 },
    { name: "Pending", value: 145 },
    { name: "Assigned", value: 98 },
    { name: "On The Way", value: 72 },
    { name: "Cancelled", value: 43 },
  ];

  const categoryData = [
    { category: "Oil Change", bookings: 245 },
    { category: "AC Service", bookings: 188 },
    { category: "Battery", bookings: 156 },
    { category: "Tyre", bookings: 134 },
    { category: "Engine", bookings: 112 },
    { category: "General Repair", bookings: 96 },
  ];

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
              Analytics
            </h1>

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
              Live
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
            Understand booking trends, revenue
            and service performance.
          </p>
        </div>

        {/* Period */}
        <div
          className="
            flex items-center gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4 py-2.5
            shadow-sm

            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <CalendarRange
            size={17}
            className="
              text-slate-400
              dark:text-slate-500
            "
          />

          <span
            className="
              text-sm
              font-medium
              text-slate-600
              dark:text-slate-300
            "
          >
            August 2026
          </span>
        </div>
      </div>

      {/* Quick Summary */}
      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-3
        "
      >
        {/* Total Bookings */}
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm

            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <div className="flex items-center gap-2">
            <BarChart3
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
                text-slate-500
                dark:text-slate-400
              "
            >
              Total Bookings
            </span>
          </div>

          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            978
          </p>

          <p
            className="
              mt-1
              text-xs
              font-medium
              text-emerald-600
              dark:text-emerald-400
            "
          >
            +12.5% this month
          </p>
        </div>

        {/* Revenue */}
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm

            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <div className="flex items-center gap-2">
            <TrendingUp
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
                text-slate-500
                dark:text-slate-400
              "
            >
              Revenue
            </span>
          </div>

          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            ₹5.42L
          </p>

          <p
            className="
              mt-1
              text-xs
              font-medium
              text-emerald-600
              dark:text-emerald-400
            "
          >
            +15.8% this month
          </p>
        </div>

        {/* Completion Rate */}
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm

            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <div className="flex items-center gap-2">
            <BarChart3
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
                text-slate-500
                dark:text-slate-400
              "
            >
              Completion Rate
            </span>
          </div>

          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            63.4%
          </p>

          <p
            className="
              mt-1
              text-xs
              font-medium
              text-emerald-600
              dark:text-emerald-400
            "
          >
            +4.2% this month
          </p>
        </div>
      </div>

      {/* Charts */}
      <div
        className="
          mt-6
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
    </div>
  );
};

export default AnalyticsPage;