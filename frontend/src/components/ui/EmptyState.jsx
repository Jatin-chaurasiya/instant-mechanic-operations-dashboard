import { Inbox } from "lucide-react";

import Button from "./Button";

const EmptyState = ({
  title = "No data found",
  description =
    "There is no information available to display right now.",
  icon: Icon = Inbox,
  actionLabel,
  onAction,
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
        border-dashed
        border-slate-300
        bg-white
        px-6
        text-center

        dark:border-slate-700
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
          bg-slate-100

          dark:bg-slate-800
        "
      >
        <Icon
          size={26}
          className="
            text-slate-500
            dark:text-slate-400
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

      {actionLabel && onAction && (
        <Button
          variant="secondary"
          size="sm"
          className="mt-5"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;