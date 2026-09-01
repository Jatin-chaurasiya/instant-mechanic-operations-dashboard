import {
  useCallback,
  useEffect,
  useState,
} from "react";

import analyticsApi from "../api/analyticsApi";

// Returns date in YYYY-MM-DD format
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Default range: last 30 days
const getDefaultDateRange = () => {

  const today = new Date();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(
    today.getDate() - 30
  );

  return {
    from: formatDate(thirtyDaysAgo),
    to: formatDate(today),
  };
};

const useAnalytics = ({
  initialFrom,
  initialTo,
} = {}) => {

  const defaultRange =
    getDefaultDateRange();

  // ==============================
  // Date range
  // ==============================

  const [from, setFrom] = useState(
    initialFrom || defaultRange.from
  );

  const [to, setTo] = useState(
    initialTo || defaultRange.to
  );

  // ==============================
  // Analytics data
  // ==============================

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  // ==============================
  // Fetch analytics
  // ==============================

  const fetchAnalytics = useCallback(
    async (customFrom, customTo) => {

      try {

        setLoading(true);

        setError(null);

        const data =
          await analyticsApi.getAnalytics({
            from: customFrom || undefined,
            to: customTo || undefined,
          });

        setAnalytics(data);

      } catch (err) {

        console.error(
          "Analytics error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load analytics."
        );

      } finally {

        setLoading(false);
      }
    },
    []
  );

  // ==============================
  // Initial API call
  // ==============================

  useEffect(() => {

    fetchAnalytics(
      initialFrom || defaultRange.from,
      initialTo || defaultRange.to
    );

    // Initial load only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==============================
  // Date change
  // ==============================

  const handleFromChange = useCallback(
    (value) => {

      setFrom(value);

    },
    []
  );

  const handleToChange = useCallback(
    (value) => {

      setTo(value);

    },
    []
  );

  // ==============================
  // Apply date range
  // ==============================

  const applyDateRange = useCallback(
    () => {

      return fetchAnalytics(
        from,
        to
      );

    },
    [
      from,
      to,
      fetchAnalytics,
    ]
  );

  // ==============================
  // Reset date range
  // ==============================

  const resetDateRange = useCallback(() => {

    const range =
      getDefaultDateRange();

    setFrom(range.from);

    setTo(range.to);

    return fetchAnalytics(
      range.from,
      range.to
    );

  }, [fetchAnalytics]);

  // ==============================
  // Manual refresh
  // ==============================

  const refresh = useCallback(() => {

    return fetchAnalytics(
      from,
      to
    );

  }, [
    from,
    to,
    fetchAnalytics,
  ]);

  // ==============================
  // Derived chart data
  // ==============================

  const bookingsOverTime =
    analytics?.bookingsOverTime || [];

  const revenueOverTime =
    analytics?.revenueOverTime || [];

  const statusDistribution =
    analytics?.statusDistribution || [];

  const categoryBreakdown =
    analytics?.categoryBreakdown || [];

  // ==============================
  // Return
  // ==============================

  return {

    analytics,

    loading,

    error,

    from,

    to,

    // Main metrics
    totalBookings:
      analytics?.totalBookings || 0,

    revenue:
      analytics?.revenue || 0,

    completionRate:
      analytics?.completionRate || 0,

    // Chart data
    bookingsOverTime,

    revenueOverTime,

    statusDistribution,

    categoryBreakdown,

    // Date controls
    setFrom: handleFromChange,

    setTo: handleToChange,

    applyDateRange,

    resetDateRange,

    refresh,
  };
};

export default useAnalytics;