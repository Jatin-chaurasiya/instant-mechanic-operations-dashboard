import { useTheme } from "../../context/ThemeContext";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

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

  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4 py-3
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
        {payload[0].value} bookings
      </p>
    </div>
  );
};

const BookingsOverTimeChart = ({
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

  const lineColor = isDark
    ? "#ffffff"
    : "#0f172a";

  return (
    <ChartCard
      title="Bookings Over Time"
      description="Daily booking activity"
    >
      <div className="h-[300px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={safeData}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 0,
            }}
          >

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
              tickMargin={10}
              allowDecimals={false}
            />

            {/* Tooltip */}

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: cursorColor,
                strokeDasharray: "4 4",
              }}
            />

            {/* Line */}

            <Line
              type="monotone"
              dataKey="bookings"
              stroke={lineColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 3,
                stroke: isDark
                  ? "#0f172a"
                  : "#ffffff",
                fill: lineColor,
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>
    </ChartCard>
  );
};

export default BookingsOverTimeChart;