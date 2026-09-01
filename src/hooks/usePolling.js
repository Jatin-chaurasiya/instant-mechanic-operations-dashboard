import { useCallback, useEffect, useRef } from "react";

const usePolling = (
  callback,
  interval = 30000,
  enabled = true
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const execute = useCallback(() => {
    return callbackRef.current?.();
  }, []);

  useEffect(() => {
    if (!enabled || interval <= 0) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      callbackRef.current?.();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval, enabled]);

  return {
    execute,
  };
};

export default usePolling;