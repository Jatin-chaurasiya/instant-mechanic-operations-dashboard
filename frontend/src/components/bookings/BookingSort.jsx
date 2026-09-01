import {
  ArrowDownAZ,
  ArrowUpAZ,
} from "lucide-react";

const BookingSort = ({
  sortBy = "bookingDate",
  sortOrder = "desc",
  onSortChange,
}) => {
  const options = [
    {
      value: "bookingDate",
      label: "Date",
    },
    {
      value: "amount",
      label: "Amount",
    },
    {
      value: "status",
      label: "Status",
    },
    {
      value: "customer",
      label: "Customer",
    },
  ];

  const handleFieldChange = (event) => {
    onSortChange?.(
      event.target.value,
      sortOrder
    );
  };

  const handleOrderChange = () => {
    const nextOrder =
      sortOrder === "asc"
        ? "desc"
        : "asc";

    onSortChange?.(
      sortBy,
      nextOrder
    );
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={sortBy}
        onChange={handleFieldChange}
        className="
          h-10
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          text-sm
          font-medium
          text-slate-600
          outline-none
          transition

          focus:border-slate-400
          focus:ring-4
          focus:ring-slate-100

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-300
          dark:focus:border-slate-600
          dark:focus:ring-slate-800
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            Sort by {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleOrderChange}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-500
          transition

          hover:bg-slate-50
          hover:text-slate-900

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-400
          dark:hover:bg-slate-800
          dark:hover:text-white
        "
        aria-label={
          sortOrder === "asc"
            ? "Sort descending"
            : "Sort ascending"
        }
        title={
          sortOrder === "asc"
            ? "Sort descending"
            : "Sort ascending"
        }
      >
        {sortOrder === "asc" ? (
          <ArrowUpAZ size={17} />
        ) : (
          <ArrowDownAZ size={17} />
        )}
      </button>
    </div>
  );
};

export default BookingSort;