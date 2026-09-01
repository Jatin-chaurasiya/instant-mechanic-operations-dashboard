import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType = "neutral",
  comparison,
  description,
  iconClassName = "",
  iconBgClassName = "",
}) => {
  const trendStyles = {
    positive:
      "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50",

    negative:
      "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50",

    neutral:
      "text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-800",
  };

  const TrendIcon =
    trendType === "positive"
      ? ArrowUpRight
      : trendType === "negative"
        ? ArrowDownRight
        : Minus;

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-slate-950/20
        dark:hover:border-slate-600
        dark:hover:shadow-lg
      "
    >
      {/* Top Section */}

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <p
            className="
              truncate
              text-sm
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-bold
              tracking-tight
              text-slate-900
              dark:text-white
              sm:text-3xl
            "
          >
            {value}
          </h3>

        </div>

        <div
          className={`
            flex h-11 w-11
            shrink-0
            items-center justify-center
            rounded-xl
            ${iconBgClassName || "bg-slate-100"}
          `}
        >
          {Icon && (
            <Icon
              size={21}
              strokeWidth={2}
              className={
                iconClassName ||
                "text-slate-700 dark:text-slate-300"
              }
            />
          )}
        </div>

      </div>

      {/* Bottom Section */}

      {(trend !== null &&
        trend !== undefined) ||
      comparison ? (
        <div className="mt-5 flex flex-wrap items-center gap-2">

          {trend !== null &&
            trend !== undefined && (
              <span
                className={`
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  px-2 py-1
                  text-xs
                  font-semibold
                  ${trendStyles[trendType]}
                `}
              >
                <TrendIcon
                  size={13}
                  strokeWidth={2.5}
                />

                {trend}
              </span>
            )}

          {comparison && (
            <span
              className="
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              {comparison}
            </span>
          )}

        </div>
      ) : null}

      {/* Description */}

      {description && (
        <p
          className="
            mt-2
            text-xs
            text-slate-400
            dark:text-slate-500
          "
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;