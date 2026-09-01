import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import Button from "./Button";

const ErrorState = ({
  title = "Something went wrong",
  description =
    "We couldn't load the requested data. Please try again.",
  onRetry,
}) => {
  return (
    <div
      className="
        flex
        min-h-[280px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-red-100
        bg-white
        px-6
        text-center

        dark:border-red-900/50
        dark:bg-slate-900
      "
    >
      <div
        className="
          mb-4
          flex h-14 w-14
          items-center
          justify-center
          rounded-2xl
          bg-red-50

          dark:bg-red-950/50
        "
      >
        <AlertCircle
          size={26}
          className="
            text-red-500
            dark:text-red-400
          "
        />
      </div>

      <h3
        className="
          text-sm
          font-semibold
          text-slate-900
          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1.5
          max-w-sm
          text-sm
          leading-6
          text-slate-500
          dark:text-slate-400
        "
      >
        {description}
      </p>

      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          icon={RefreshCw}
          className="mt-5"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;