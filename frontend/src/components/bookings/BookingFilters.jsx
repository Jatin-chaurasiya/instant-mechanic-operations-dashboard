import { Filter, RotateCcw } from "lucide-react";

import Select from "../ui/Select";
import Button from "../ui/Button";

const statusOptions = [
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "ASSIGNED",
    label: "Assigned",
  },
  {
    value: "ON_THE_WAY",
    label: "On The Way",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

const BookingFilters = ({
  status,
  category,
  onStatusChange,
  onCategoryChange,
  onReset,
  categories = [],
}) => {

  const categoryOptions =
    categories.map((item) => {

      if (
        typeof item === "object" &&
        item !== null
      ) {
        return {
          value:
            item.value ??
            item.category ??
            "",
          label:
            item.label ??
            item.category ??
            "",
        };
      }

      return {
        value: item,
        label: item,
      };
    }).filter(
      (item) => item.value
    );

  return (
    <div
      className="
        flex
        flex-col
        gap-3
        xl:flex-row
        xl:items-end
      "
    >
      {/* Filter Label */}

      <div
        className="
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-600
          dark:text-slate-300
        "
      >
        <Filter size={16} />
        <span>Filters</span>
      </div>

      {/* Filter Selects */}

      <div
        className="
          grid
          flex-1
          grid-cols-1
          gap-3
          sm:grid-cols-2
          xl:max-w-xl
        "
      >
        <Select
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target.value
            )
          }
          options={statusOptions}
          placeholder="All statuses"
        />

        <Select
          value={category}
          onChange={(event) =>
            onCategoryChange(
              event.target.value
            )
          }
          options={categoryOptions}
          placeholder="All services"
        />
      </div>

      {/* Reset */}

      <Button
        variant="ghost"
        size="md"
        icon={RotateCcw}
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
};

export default BookingFilters;