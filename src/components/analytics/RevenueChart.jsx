import { useTheme } from "../../context/ThemeContext";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

const formatRevenue = (value) => {
  const numericValue = Number(value || 0);

  if (numericValue >= 100000) {
    return `₹${(numericValue / 100000).toFixed(1)}L`;
  }

  if (numericValue >= 1000) {
    return `₹${(numericValue / 1000).toFixed(0)}K`;
  }

  return `₹${numericValue}`;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}) => {
  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  const value = Number(
    payload[0]?.value || 0
  );

  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
        shadow-lg
        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-slate-950/40
      "
    >
      <p
        className="
          mb-1
          text-xs
          font-medium
          text-slate-500
          dark:text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          text-sm
          font-semibold
          text-slate-900
          dark:text-white
        "
      >
        ₹{value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const RevenueChart = ({
  data = [],
}) => {
  const { isDark } = useTheme();

  const safeData = Array.isArray(data)
    ? data
    : [];

  const gridColor = isDark
    ? "#334155"
    : "#e2e8f0";

  const axisColor = isDark
    ? "#94a3b8"
    : "#64748b";

  const cursorColor = isDark
    ? "#475569"
    : "#cbd5e1";

  const chartColor = isDark
    ? "#ffffff"
    : "#0f172a";

  return (
    <ChartCard
      title="Revenue Over Time"
      description="Revenue generated from bookings"
    >
      <div className="h-[300px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={safeData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >

            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={chartColor}
                  stopOpacity={0.18}
                />

                <stop
                  offset="100%"
                  stopColor={chartColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            {/* Grid */}

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={gridColor}
            />

            {/* X Axis */}

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: axisColor,
              }}
              tickMargin={10}
              minTickGap={25}
            />

            {/* Y Axis */}

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: axisColor,
              }}
              tickFormatter={formatRevenue}
              width={48}
            />

            {/* Tooltip */}

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: cursorColor,
                strokeDasharray: "4 4",
              }}
            />

            {/* Area */}

            <Area
              type="monotone"
              dataKey="revenue"
              stroke={chartColor}
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 3,
                stroke: isDark
                  ? "#0f172a"
                  : "#ffffff",
                fill: chartColor,
              }}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>
    </ChartCard>
  );
};

export default RevenueChart;