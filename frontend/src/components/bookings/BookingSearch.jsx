import { Search, X } from "lucide-react";

const BookingSearch = ({
  value = "",
  onChange,
  placeholder = "Search bookings...",
}) => {
  const handleClear = () => {
    onChange?.("");
  };

  return (
    <div className="relative w-full md:max-w-sm">
      <Search
        size={18}
        className="
          pointer-events-none
          absolute
          left-3.5
          top-1/2
          -translate-y-1/2
          text-slate-400
          dark:text-slate-500
        "
      />

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange?.(event.target.value)
        }
        placeholder={placeholder}
        autoComplete="off"
        className="
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          pl-10
          pr-10
          text-sm
          text-slate-700
          outline-none
          transition
          placeholder:text-slate-400

          focus:border-slate-400
          focus:ring-4
          focus:ring-slate-100

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-200
          dark:focus:border-slate-600
          dark:focus:ring-slate-800
        "
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-md
            p-1
            text-slate-400
            transition

            hover:bg-slate-100
            hover:text-slate-700

            dark:hover:bg-slate-800
            dark:hover:text-slate-200
          "
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default BookingSearch;