import { useCallback, useEffect, useState } from "react";

import usePolling from "./usePolling";
import dashboardApi from "../api/dashboardApi";

const useDashboardData = ({
  autoRefresh = true,
  refreshInterval = 30000,
} = {}) => {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState(null);

  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardData = useCallback(
    async (isInitialLoad = false) => {

      try {

        if (isInitialLoad) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        setError(null);

        const data =
          await dashboardApi.getDashboard();

        setStats(data);

        setLastUpdated(new Date());

      } catch (err) {

        console.error(
          "Dashboard data error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load dashboard data."
        );

      } finally {

        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchDashboardData(true);
  }, [fetchDashboardData]);

  const { execute: refresh } = usePolling(
    () => fetchDashboardData(false),
    refreshInterval,
    autoRefresh
  );

  const handleRefresh = useCallback(() => {
    return fetchDashboardData(false);
  }, [fetchDashboardData]);

  const formattedLastUpdated = lastUpdated
    ? lastUpdated.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Just now";

  return {
    stats,
    loading,
    refreshing,
    error,
    lastUpdated: formattedLastUpdated,
    refresh: handleRefresh,
    pollNow: refresh,
  };
};

export default useDashboardData;