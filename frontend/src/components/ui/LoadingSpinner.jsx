import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  size = 20,
  text = "",
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        items-center
        justify-center
        gap-2
        ${className}
      `}
    >
      <Loader2
        size={size}
        className="
          animate-spin
          text-slate-600
          dark:text-slate-300
        "
      />

      {text && (
        <span
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;