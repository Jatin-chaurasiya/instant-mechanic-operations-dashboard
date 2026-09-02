import { useCallback, useEffect, useRef, useState } from "react";
import searchApi from "../api/searchApi";

const useGlobalSearch = (delay = 300) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const timerRef = useRef(null);

  const search = useCallback(async (value) => {
    const trimmedQuery = value.trim();

    if (!trimmedQuery) {
      setResults([]);
      setLoading(false);
      setError(null);
      setIsOpen(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsOpen(true);

      const data = await searchApi.globalSearch(trimmedQuery);

      setResults(data?.results || []);
    } catch (err) {
      console.error("Global search error:", err);

      setResults([]);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to perform search."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQueryChange = useCallback(
    (value) => {
      setQuery(value);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (!value.trim()) {
        setResults([]);
        setLoading(false);
        setError(null);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      setIsOpen(true);

      timerRef.current = setTimeout(() => {
        search(value);
      }, delay);
    },
    [delay, search]
  );

  const clearSearch = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setQuery("");
    setResults([]);
    setLoading(false);
    setError(null);
    setIsOpen(false);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    query,
    results,
    loading,
    error,
    isOpen,
    setQuery: handleQueryChange,
    setIsOpen,
    clearSearch,
    closeSearch,
  };
};

export default useGlobalSearch;