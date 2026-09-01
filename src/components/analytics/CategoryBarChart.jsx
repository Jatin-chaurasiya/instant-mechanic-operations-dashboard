import { useTheme } from "../../context/ThemeContext";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
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

const CategoryBarChart = ({
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

  const categoryColor = isDark
    ? "#cbd5e1"
    : "#475569";

  const barColor = isDark
    ? "#ffffff"
    : "#0f172a";

  const cursorColor = isDark
    ? "#1e293b"
    : "#f8fafc";

  return (
    <ChartCard
      title="Service Category Breakdown"
      description="Bookings by service category"
    >
      <div className="h-[300px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={safeData}
            layout="vertical"
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            {/* Grid */}

            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke={gridColor}
            />

            {/* X Axis */}

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: axisColor,
              }}
              allowDecimals={false}
            />

            {/* Y Axis */}

            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: categoryColor,
              }}
              width={85}
            />

            {/* Tooltip */}

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: cursorColor,
              }}
            />

            {/* Bars */}

            <Bar
              dataKey="bookings"
              fill={barColor}
              radius={[0, 6, 6, 0]}
              barSize={22}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>
    </ChartCard>
  );
};

export default CategoryBarChart;