import { useTheme } from "../../context/ThemeContext";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

const statusColors = {
  COMPLETED: "#10b981",
  PENDING: "#f59e0b",
  ASSIGNED: "#3b82f6",
  ON_THE_WAY: "#8b5cf6",
  CANCELLED: "#ef4444",
};

const normalizeStatus = (status) => {
  if (!status) {
    return "";
  }

  return status
    .toString()
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
};

const formatStatusName = (status) => {
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedStatus) {
    return "";
  }

  return normalizedStatus
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const CustomTooltip = ({
  active,
  payload,
}) => {
  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  const item = payload[0];

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
          text-xs
          font-medium
          text-slate-500
          dark:text-slate-400
        "
      >
        {formatStatusName(item.name)}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-semibold
          text-slate-900
          dark:text-white
        "
      >
        {item.value} bookings
      </p>
    </div>
  );
};

const StatusPieChart = ({
  data = [],
}) => {
  const { isDark } = useTheme();

  const safeData = Array.isArray(data)
    ? data
    : [];

  const total = safeData.reduce(
    (sum, item) =>
      sum + Number(item.value || 0),
    0
  );

  const fallbackColor = isDark
    ? "#94a3b8"
    : "#64748b";

  return (
    <ChartCard
      title="Booking Status"
      description="Current booking distribution"
    >
      <div
        className="
          flex
          h-[300px]
          flex-col
          items-center
          justify-center
          gap-5
          sm:flex-row
        "
      >
        {/* Chart */}
        <div
          className="
            h-[220px]
            w-[220px]
            shrink-0
          "
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={safeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={90}
                paddingAngle={3}
                strokeWidth={0}
              >
                {safeData.map((entry) => {
                  const normalizedStatus =
                    normalizeStatus(entry.name);

                  const color =
                    statusColors[
                      normalizedStatus
                    ] || fallbackColor;

                  return (
                    <Cell
                      key={entry.name}
                      fill={color}
                    />
                  );
                })}
              </Pie>

              <Tooltip
                content={<CustomTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div
            className="
              pointer-events-none
              relative
              -mt-[142px]
              flex
              flex-col
              items-center
            "
          >
            <span
              className="
                text-2xl
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              {total.toLocaleString()}
            </span>

            <span
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div
          className="
            w-full
            space-y-2.5
            sm:max-w-[160px]
          "
        >
          {safeData.map((item) => {
            const value =
              Number(item.value || 0);

            const percentage =
              total > 0
                ? Math.round(
                    (value / total) * 100
                  )
                : 0;

            const normalizedStatus =
              normalizeStatus(item.name);

            const color =
              statusColors[
                normalizedStatus
              ] || fallbackColor;

            return (
              <div
                key={item.name}
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-2.5
                      w-2.5
                      shrink-0
                      rounded-full
                    "
                    style={{
                      backgroundColor: color,
                    }}
                  />

                  <span
                    className="
                      truncate
                      text-xs
                      font-medium
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {formatStatusName(
                      item.name
                    )}
                  </span>
                </div>

                <span
                  className="
                    text-xs
                    font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </ChartCard>
  );
};

export default StatusPieChart;