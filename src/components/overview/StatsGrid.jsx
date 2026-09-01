import {
  CalendarCheck,
  Clock3,
  CheckCircle2,
  CircleAlert,
  XCircle,
  IndianRupee,
  Wrench,
  Users,
} from "lucide-react";

import StatCard from "./StatCard";
import { SkeletonCard } from "../ui/Skeleton";

const defaultStats = {
  totalBookings: 0,
  todayBookings: 0,
  completedBookings: 0,
  pendingBookings: 0,
  cancelledBookings: 0,
  totalRevenue: 0,
  activeMechanics: 0,
  newCustomers: 0,

  totalBookingsTrend: null,
  todayBookingsTrend: null,
  completedBookingsTrend: null,
  pendingBookingsTrend: null,
  cancelledBookingsTrend: null,
  totalRevenueTrend: null,
  activeMechanicsTrend: null,
  newCustomersTrend: null,
};

const formatTrend = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return null;
  }

  return `${numericValue >= 0 ? "+" : ""}${numericValue.toFixed(1)}%`;
};

const getTrendType = (value, lowerIsBetter = false) => {
  if (value === null || value === undefined) {
    return "neutral";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue) || numericValue === 0) {
    return "neutral";
  }

  if (lowerIsBetter) {
    return numericValue < 0 ? "positive" : "negative";
  }

  return numericValue > 0 ? "positive" : "negative";
};

const StatsGrid = ({
  stats = defaultStats,
  loading = false,
}) => {
  const data = {
    ...defaultStats,
    ...(stats || {}),
  };

  if (loading) {
    return (
      <section
        aria-label="Loading dashboard statistics"
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {Array.from({ length: 8 }).map(
          (_, index) => (
            <SkeletonCard key={index} />
          )
        )}
      </section>
    );
  }

  const statCards = [
    {
      title: "Total Bookings",
      value: Number(data.totalBookings).toLocaleString(),
      icon: CalendarCheck,
      trend: formatTrend(data.totalBookingsTrend),
      trendType: getTrendType(
        data.totalBookingsTrend
      ),
      comparison: "vs. last month",
      iconBgClassName:
        "bg-blue-50 dark:bg-blue-950/50",
      iconClassName:
        "text-blue-600 dark:text-blue-400",
    },

    {
      title: "Today's Bookings",
      value: Number(data.todayBookings).toLocaleString(),
      icon: Clock3,
      trend: formatTrend(data.todayBookingsTrend),
      trendType: getTrendType(
        data.todayBookingsTrend
      ),
      comparison: "vs. yesterday",
      iconBgClassName:
        "bg-violet-50 dark:bg-violet-950/50",
      iconClassName:
        "text-violet-600 dark:text-violet-400",
    },

    {
      title: "Completed Bookings",
      value: Number(
        data.completedBookings
      ).toLocaleString(),
      icon: CheckCircle2,
      trend: formatTrend(
        data.completedBookingsTrend
      ),
      trendType: getTrendType(
        data.completedBookingsTrend
      ),
      comparison: "vs. last month",
      iconBgClassName:
        "bg-emerald-50 dark:bg-emerald-950/50",
      iconClassName:
        "text-emerald-600 dark:text-emerald-400",
    },

    {
      title: "Pending Bookings",
      value: Number(
        data.pendingBookings
      ).toLocaleString(),
      icon: CircleAlert,
      trend: formatTrend(
        data.pendingBookingsTrend
      ),
      trendType: getTrendType(
        data.pendingBookingsTrend,
        true
      ),
      comparison: "vs. last month",
      iconBgClassName:
        "bg-amber-50 dark:bg-amber-950/50",
      iconClassName:
        "text-amber-600 dark:text-amber-400",
    },

    {
      title: "Cancelled Bookings",
      value: Number(
        data.cancelledBookings
      ).toLocaleString(),
      icon: XCircle,
      trend: formatTrend(
        data.cancelledBookingsTrend
      ),
      trendType: getTrendType(
        data.cancelledBookingsTrend,
        true
      ),
      comparison: "vs. last month",
      iconBgClassName:
        "bg-red-50 dark:bg-red-950/50",
      iconClassName:
        "text-red-600 dark:text-red-400",
    },

    {
      title: "Total Revenue",
      value: `₹${Number(
        data.totalRevenue
      ).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      trend: formatTrend(
        data.totalRevenueTrend
      ),
      trendType: getTrendType(
        data.totalRevenueTrend
      ),
      comparison: "vs. last month",
      iconBgClassName:
        "bg-emerald-50 dark:bg-emerald-950/50",
      iconClassName:
        "text-emerald-600 dark:text-emerald-400",
    },

    {
      title: "Active Mechanics",
      value: Number(
        data.activeMechanics
      ).toLocaleString(),
      icon: Wrench,
      trend: null,
      trendType: "neutral",
      comparison: "",
      iconBgClassName:
        "bg-slate-100 dark:bg-slate-800",
      iconClassName:
        "text-slate-700 dark:text-slate-300",
    },

    {
      title: "New Customers",
      value: Number(
        data.newCustomers
      ).toLocaleString(),
      icon: Users,
      trend: formatTrend(
        data.newCustomersTrend
      ),
      trendType: getTrendType(
        data.newCustomersTrend
      ),
      comparison: "vs. last month",
      iconBgClassName:
        "bg-blue-50 dark:bg-blue-950/50",
      iconClassName:
        "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <section aria-label="Dashboard statistics">
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            trendType={card.trendType}
            comparison={card.comparison}
            iconBgClassName={
              card.iconBgClassName
            }
            iconClassName={
              card.iconClassName
            }
          />
        ))}
      </div>
    </section>
  );
};

export default StatsGrid;