const variants = {
  success:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-400 dark:ring-emerald-500/30",

  warning:
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/50 dark:text-amber-400 dark:ring-amber-500/30",

  danger:
    "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/50 dark:text-red-400 dark:ring-red-500/30",

  info:
    "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-500/30",

  neutral:
    "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-500/30",

  purple:
    "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-950/50 dark:text-violet-400 dark:ring-violet-500/30",
};

const Badge = ({
  children,
  variant = "neutral",
  dot = false,
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-2.5 py-1
        text-xs
        font-medium
        ring-1
        ring-inset
        ${variants[variant] || variants.neutral}
        ${className}
      `}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}

      {children}
    </span>
  );
};

export default Badge;