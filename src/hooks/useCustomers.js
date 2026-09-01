import {
  useCallback,
  useEffect,
  useState,
} from "react";

import usePolling from "./usePolling";
import customerApi from "../api/customerApi";

const useCustomers = ({
  autoRefresh = true,
  refreshInterval = 30000,
  initialPage = 1,
  initialItemsPerPage = 10,
} = {}) => {

  // ==============================
  // Backend data
  // ==============================

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState(null);

  // ==============================
  // Search
  // ==============================

  const [search, setSearch] = useState("");

  // ==============================
  // Pagination
  // ==============================

  const [currentPage, setCurrentPage] =
    useState(initialPage);

  const [itemsPerPage] =
    useState(initialItemsPerPage);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalItems, setTotalItems] =
    useState(0);

  // ==============================
  // Fetch customers
  // ==============================

  const fetchCustomers = useCallback(
    async (isInitialLoad = false) => {

      try {

        if (isInitialLoad) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        setError(null);

        const response =
          await customerApi.getCustomers({
            page: currentPage - 1,
            size: itemsPerPage,
            keyword: search.trim(),
          });

        // Spring Page response
        setCustomers(
          response.content || []
        );

        setTotalItems(
          response.totalElements || 0
        );

        setTotalPages(
          response.totalPages || 1
        );

        // Frontend uses 1-based pages
        if (
          response.totalPages > 0 &&
          currentPage > response.totalPages
        ) {
          setCurrentPage(response.totalPages);
        }

      } catch (err) {

        console.error(
          "Customers error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load customers."
        );

        setCustomers([]);

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
    ]
  );

  // ==============================
  // Initial load / search / page
  // ==============================

  useEffect(() => {

    fetchCustomers(true);

  }, [fetchCustomers]);

  // ==============================
  // Automatic polling
  // ==============================

  usePolling(
    () => fetchCustomers(false),
    refreshInterval,
    autoRefresh
  );

  // ==============================
  // Search
  // ==============================

  const handleSearchChange = useCallback(
    (value) => {

      setSearch(value);

      setCurrentPage(1);
    },
    []
  );

  // ==============================
  // Pagination
  // ==============================

  const handlePageChange = useCallback(
    (page) => {

      if (
        page >= 1 &&
        page <= totalPages
      ) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  // ==============================
  // Reset
  // ==============================

  const resetFilters = useCallback(() => {

    setSearch("");

    setCurrentPage(1);

  }, []);

  // ==============================
  // Manual refresh
  // ==============================

  const refresh = useCallback(() => {

    return fetchCustomers(false);

  }, [fetchCustomers]);

  // ==============================
  // Return
  // ==============================

  return {

    customers,

    loading,

    refreshing,

    error,

    search,

    currentPage,

    totalPages,

    totalItems,

    itemsPerPage,

    setSearch: handleSearchChange,

    setPage: handlePageChange,

    resetFilters,

    refresh,
  };
};

export default useCustomers;