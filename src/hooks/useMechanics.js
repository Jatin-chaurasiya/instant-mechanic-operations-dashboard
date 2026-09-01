import {
  useCallback,
  useEffect,
  useState,
} from "react";

import usePolling from "./usePolling";
import mechanicApi from "../api/mechanicApi";

const useMechanics = ({
  autoRefresh = true,
  refreshInterval = 30000,
  initialPage = 1,
  initialItemsPerPage = 12,
} = {}) => {

  // ==============================
  // Backend data
  // ==============================

  const [mechanics, setMechanics] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState(null);

  // ==============================
  // Search / Filter
  // ==============================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

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
  // Fetch mechanics
  // ==============================

  const fetchMechanics = useCallback(
    async (isInitialLoad = false) => {

      try {

        if (isInitialLoad) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        setError(null);

        const response =
          await mechanicApi.getMechanics({
            page: currentPage - 1,
            size: itemsPerPage,
            keyword: search.trim(),
            status,
          });

        // Spring Page response
        setMechanics(response.content || []);

        setTotalItems(
          response.totalElements || 0
        );

        setTotalPages(
          response.totalPages || 1
        );

        // Keep frontend page 1-based
        if (
          response.totalPages > 0 &&
          currentPage > response.totalPages
        ) {
          setCurrentPage(response.totalPages);
        }

      } catch (err) {

        console.error(
          "Mechanics error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load mechanics."
        );

        setMechanics([]);

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
    ]
  );

  // ==============================
  // Initial load / filter / page
  // ==============================

  useEffect(() => {
    fetchMechanics(true);
  }, [fetchMechanics]);

  // ==============================
  // Automatic polling
  // ==============================

  usePolling(
    () => fetchMechanics(false),
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
  // Status filter
  // ==============================

  const handleStatusChange = useCallback(
    (value) => {

      setStatus(value);

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
  // Reset filters
  // ==============================

  const resetFilters = useCallback(() => {

    setSearch("");

    setStatus("");

    setCurrentPage(1);

  }, []);

  // ==============================
  // Manual refresh
  // ==============================

  const refresh = useCallback(() => {
    return fetchMechanics(false);
  }, [fetchMechanics]);

  // ==============================
  // Return
  // ==============================

  return {

    mechanics,

    loading,

    refreshing,

    error,

    search,

    status,

    currentPage,

    totalPages,

    totalItems,

    itemsPerPage,

    setSearch: handleSearchChange,

    setStatus: handleStatusChange,

    setPage: handlePageChange,

    resetFilters,

    refresh,
  };
};

export default useMechanics;