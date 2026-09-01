import { MoreHorizontal } from "lucide-react";

const ChartCard = ({
  title,
  description,
  children,
  action,
  className = "",
}) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-colors
        duration-200
        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-slate-950/20
        ${className}
      `}
    >
      {/* Header */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          border-b
          border-slate-100
          px-5
          py-4
          dark:border-slate-700
          sm:px-6
        "
      >
        <div className="min-w-0">

          <h3
            className="
              text-sm
              font-semibold
              text-slate-900
              dark:text-white
              sm:text-base
            "
          >
            {title}
          </h3>

          {description && (
            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
                sm:text-sm
              "
            >
              {description}
            </p>
          )}

        </div>

        {/* Action */}

        {action ? (
          action
        ) : (
          <button
            type="button"
            className="
              shrink-0
              rounded-lg
              p-1.5
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              dark:text-slate-500
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            aria-label={`${title} options`}
          >
            <MoreHorizontal size={19} />
          </button>
        )}

      </div>

      {/* Chart */}

      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;