import {
  useCallback,
  useEffect,
  useState,
} from "react";

import usePolling from "./usePolling";
import bookingApi from "../api/bookingApi";

const useBookings = ({
  autoRefresh = true,
  refreshInterval = 30000,
  initialPage = 1,
  initialItemsPerPage = 10,
} = {}) => {

  // ==========================================
  // Backend data
  // ==========================================

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);
  const [error, setError] = useState(null);

  // ==========================================
  // Filters
  // ==========================================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  // ==========================================
  // Sorting
  // ==========================================

  const [sortBy, setSortBy] =
    useState("date");

  const [sortOrder, setSortOrder] =
    useState("desc");

  // ==========================================
  // Pagination
  // ==========================================

  const [currentPage, setCurrentPage] =
    useState(initialPage);

  const [itemsPerPage] =
    useState(initialItemsPerPage);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalItems, setTotalItems] =
    useState(0);

  // ==========================================
  // Fetch bookings
  // ==========================================

  const fetchBookings = useCallback(
    async (isInitialLoad = false) => {

      try {

        if (isInitialLoad) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        setError(null);

        const response =
          await bookingApi.getBookings({
            page: currentPage - 1,
            size: itemsPerPage,

            keyword:
              search.trim() || undefined,

            status:
              status || undefined,

            category:
              category || undefined,

            sortBy,
            sortOrder,
          });

        // =====================================
        // Backend response
        // =====================================

        setBookings(
          Array.isArray(response?.bookings)
            ? response.bookings
            : []
        );

        setTotalItems(
          Number(response?.totalElements || 0)
        );

        setTotalPages(
          Number(response?.totalPages || 1)
        );

        // =====================================
        // Keep frontend page in valid range
        // =====================================

        const backendTotalPages =
          Number(response?.totalPages || 0);

        if (
          backendTotalPages > 0 &&
          currentPage > backendTotalPages
        ) {
          setCurrentPage(
            backendTotalPages
          );
        }

      } catch (err) {

        console.error(
          "Bookings error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load bookings."
        );

        setBookings([]);
        setTotalItems(0);
        setTotalPages(1);

      } finally {

        setLoading(false);
        setRefreshing(false);
      }
    },
    [
      currentPage,
      itemsPerPage,
      search,
      status,
      category,
      sortBy,
      sortOrder,
    ]
  );

  // ==========================================
  // Initial load + filters + sorting + page
  // ==========================================

  useEffect(() => {
    fetchBookings(true);
  }, [fetchBookings]);

  // ==========================================
  // Automatic polling
  // ==========================================

  usePolling(
    () => fetchBookings(false),
    refreshInterval,
    autoRefresh
  );

  // ==========================================
  // Search
  // ==========================================

  const handleSearchChange = useCallback(
    (value) => {

      setSearch(value);
      setCurrentPage(1);

    },
    []
  );

  // ==========================================
  // Status filter
  // ==========================================

  const handleStatusChange = useCallback(
    (value) => {

      setStatus(value);
      setCurrentPage(1);

    },
    []
  );

  // ==========================================
  // Category filter
  // ==========================================

  const handleCategoryChange = useCallback(
    (value) => {

      setCategory(value);
      setCurrentPage(1);

    },
    []
  );

  // ==========================================
  // Sorting
  // ==========================================

  const handleSortChange = useCallback(
    (field, order) => {

      setSortBy(field);
      setSortOrder(order || "desc");
      setCurrentPage(1);

    },
    []
  );

  // ==========================================
  // Pagination
  // ==========================================

  const handlePageChange = useCallback(
    (page) => {

      if (
        page < 1 ||
        page > totalPages
      ) {
        return;
      }

      setCurrentPage(page);

    },
    [totalPages]
  );

  // ==========================================
  // Reset filters
  // ==========================================

  const resetFilters = useCallback(() => {

    setSearch("");
    setStatus("");
    setCategory("");

    setSortBy("date");
    setSortOrder("desc");

    setCurrentPage(1);

  }, []);

  // ==========================================
  // Manual refresh
  // ==========================================

  const refresh = useCallback(() => {
    return fetchBookings(false);
  }, [fetchBookings]);

  // ==========================================
  // Return
  // ==========================================

  return {
    bookings,

    // Kept for compatibility
    allBookings: bookings,

    loading,
    refreshing,
    error,

    search,
    status,
    category,

    sortBy,
    sortOrder,

    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,

    setSearch: handleSearchChange,
    setStatus: handleStatusChange,
    setCategory: handleCategoryChange,
    setSort: handleSortChange,
    setPage: handlePageChange,

    resetFilters,
    refresh,
  };
};

export default useBookings;