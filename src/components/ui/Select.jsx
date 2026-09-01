import { ChevronDown } from "lucide-react";

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          className="
            mb-1.5
            block
            text-xs
            font-medium
            text-slate-600
            dark:text-slate-300
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`
            h-10
            w-full
            appearance-none
            rounded-xl
            border
            bg-white
            px-3 pr-9
            text-sm
            text-slate-700
            outline-none
            transition
            focus:ring-4

            dark:bg-slate-900
            dark:text-slate-200

            ${
              error
                ? `
                  border-red-300
                  focus:border-red-400
                  focus:ring-red-50

                  dark:border-red-700
                  dark:focus:border-red-600
                  dark:focus:ring-red-950
                `
                : `
                  border-slate-200
                  focus:border-slate-400
                  focus:ring-slate-100

                  dark:border-slate-700
                  dark:focus:border-slate-600
                  dark:focus:ring-slate-800
                `
            }
          `}
          {...props}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}

          {options.map((option) => {
            const optionValue =
              typeof option === "object"
                ? option.value
                : option;

            const optionLabel =
              typeof option === "object"
                ? option.label
                : option;

            return (
              <option
                key={optionValue}
                value={optionValue}
              >
                {optionLabel}
              </option>
            );
          })}
        </select>

        <ChevronDown
          size={16}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
            dark:text-slate-500
          "
        />
      </div>

      {error && (
        <p
          className="
            mt-1.5
            text-xs
            text-red-500
            dark:text-red-400
          "
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;