import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
}) => {
  if (totalPages <= 0) {
    return null;
  }

  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(
      2,
      currentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    if (
      currentPage <
      totalPages - 2
    ) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-t
        border-slate-200
        px-5 py-4

        dark:border-slate-700

        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-6
      "
    >
      {/* Information */}
      <p
        className="
          text-xs
          text-slate-500
          dark:text-slate-400
          sm:text-sm
        "
      >
        Showing{" "}
        <span
          className="
            font-semibold
            text-slate-700
            dark:text-slate-200
          "
        >
          {startItem}
        </span>{" "}
        to{" "}
        <span
          className="
            font-semibold
            text-slate-700
            dark:text-slate-200
          "
        >
          {endItem}
        </span>{" "}
        of{" "}
        <span
          className="
            font-semibold
            text-slate-700
            dark:text-slate-200
          "
        >
          {totalItems}
        </span>{" "}
        bookings
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange?.(
              currentPage - 1
            )
          }
          className="
            flex
            h-9 w-9
            items-center
            justify-center
            rounded-lg
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

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          aria-label="Previous page"
        >
          <ChevronLeft size={17} />
        </button>

        {/* Pages */}
        {getPageNumbers().map(
          (page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="
                    flex
                    h-9 w-8
                    items-center
                    justify-center
                    text-sm
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  ...
                </span>
              );
            }

            const isActive =
              page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() =>
                  onPageChange?.(page)
                }
                className={`
                  flex
                  h-9 min-w-9
                  items-center
                  justify-center
                  rounded-lg
                  px-2
                  text-sm
                  font-medium
                  transition

                  ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }
                `}
              >
                {page}
              </button>
            );
          }
        )}

        {/* Next */}
        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange?.(
              currentPage + 1
            )
          }
          className="
            flex
            h-9 w-9
            items-center
            justify-center
            rounded-lg
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

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          aria-label="Next page"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;