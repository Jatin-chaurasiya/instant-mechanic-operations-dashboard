import {
  Search,
  User,
  Wrench,
  Car,
  ClipboardList,
  BriefcaseBusiness,
  Loader2,
  X,
} from "lucide-react";

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalSearch from "../../hooks/useGlobalSearch";

const GlobalSearch = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const {
    query,
    results,
    loading,
    error,
    isOpen,
    setQuery,
    clearSearch,
    closeSearch,
  } = useGlobalSearch();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [closeSearch]);

  const getIcon = (type) => {
    switch (type) {
      case "CUSTOMER":
        return <User size={17} />;

      case "MECHANIC":
        return <Wrench size={17} />;

      case "VEHICLE":
        return <Car size={17} />;

      case "BOOKING":
        return <ClipboardList size={17} />;

      case "SERVICE":
        return <BriefcaseBusiness size={17} />;

      default:
        return <Search size={17} />;
    }
  };

  const getNavigationPath = (type) => {
    switch (type) {
      case "BOOKING":
        return "/bookings";

      case "MECHANIC":
        return "/mechanics";

      case "CUSTOMER":
        return "/customers";

      case "VEHICLE":
        return "/customers";

      case "SERVICE":
        return "/bookings";

      default:
        return "/overview";
    }
  };

  const handleResultClick = (result) => {
    const path = getNavigationPath(result.type);

    clearSearch();
    navigate(path);
  };

  return (
    <div
      ref={searchRef}
      className="relative w-full"
    >
      {/* Search Input */}
      <Search
        size={18}
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-400
          dark:text-slate-500
        "
      />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="
          h-10
          w-48
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          pl-10
          pr-10
          text-sm
          text-slate-700
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-slate-400
          focus:bg-white
          focus:ring-2
          focus:ring-slate-100
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-200
          dark:placeholder:text-slate-500
          dark:focus:border-slate-600
          dark:focus:bg-slate-900
          dark:focus:ring-slate-800
          lg:w-64
        "
      />

      {/* Clear / Loading */}
      {query && !loading && (
        <button
          type="button"
          onClick={clearSearch}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
            transition
            hover:text-slate-700
            dark:text-slate-500
            dark:hover:text-slate-200
          "
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}

      {loading && (
        <Loader2
          size={16}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            animate-spin
            text-slate-400
          "
        />
      )}

      {/* Search Results */}
      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-full
            z-50
            mt-2
            w-80
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-xl
            dark:border-slate-700
            dark:bg-slate-900
            lg:w-96
          "
        >
          {/* Error */}
          {error && (
            <div className="px-4 py-4 text-sm text-red-500">
              {error}
            </div>
          )}

          {/* No Results */}
          {!loading &&
            !error &&
            query.trim() &&
            results.length === 0 && (
              <div
                className="
                  px-4
                  py-5
                  text-center
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                No results found.
              </div>
            )}

          {/* Results */}
          {!loading &&
            !error &&
            results.length > 0 && (
              <div className="max-h-96 overflow-y-auto py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.type}-${result.id}-${index}`}
                    type="button"
                    onClick={() => handleResultClick(result)}
                    className="
                      flex
                      w-full
                      items-start
                      gap-3
                      px-4
                      py-3
                      text-left
                      transition
                      hover:bg-slate-50
                      dark:hover:bg-slate-800
                    "
                  >
                    {/* Icon */}
                    <div
                      className="
                        mt-0.5
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-100
                        text-slate-600
                        dark:bg-slate-800
                        dark:text-slate-300
                      "
                    >
                      {getIcon(result.type)}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className="
                            truncate
                            text-sm
                            font-medium
                            text-slate-800
                            dark:text-white
                          "
                        >
                          {result.title}
                        </p>

                        <span
                          className="
                            shrink-0
                            rounded-full
                            bg-slate-100
                            px-2
                            py-0.5
                            text-[10px]
                            font-medium
                            text-slate-500
                            dark:bg-slate-800
                            dark:text-slate-400
                          "
                        >
                          {result.type}
                        </span>
                      </div>

                      <p
                        className="
                          mt-0.5
                          truncate
                          text-xs
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        {result.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;