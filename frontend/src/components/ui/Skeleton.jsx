const Skeleton = ({
  className = "",
  variant = "default",
}) => {
  const variants = {
    default: "rounded-xl",
    circle: "rounded-full",
    text: "rounded-md",
    card: "rounded-2xl",
  };

  return (
    <div
      className={`
        animate-pulse
        bg-slate-200
        dark:bg-slate-700
        ${variants[variant] || variants.default}
        ${className}
      `}
      aria-hidden="true"
    />
  );
};

export const SkeletonText = ({
  lines = 1,
  className = "",
}) => {
  return (
    <div
      className={`
        space-y-2
        ${className}
      `}
    >
      {Array.from({ length: lines }).map(
        (_, index) => (
          <Skeleton
            key={index}
            variant="text"
            className={`
              h-3
              ${
                index === lines - 1
                  ? "w-2/3"
                  : "w-full"
              }
            `}
          />
        )
      )}
    </div>
  );
};

export const SkeletonCard = ({
  className = "",
}) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5

        dark:border-slate-700
        dark:bg-slate-900

        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <Skeleton className="h-4 w-24" />

        <Skeleton
          variant="circle"
          className="h-10 w-10"
        />
      </div>

      <Skeleton className="mt-5 h-8 w-28" />

      <Skeleton className="mt-3 h-3 w-20" />
    </div>
  );
};

export default Skeleton;