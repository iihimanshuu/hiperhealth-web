import { useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing AbortController for API requests
 * Automatically cleans up controller on unmount or when requesting new abort
 */
export function useAbortController() {
  const controllerRef = useRef(null);

  /**
   * Create a new AbortController and return its signal
   */
  const getSignal = useCallback(() => {
    // Clean up previous controller
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create new controller
    controllerRef.current = new AbortController();
    return controllerRef.current.signal;
  }, []);

  /**
   * Abort the current request
   */
  const abort = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
  }, []);

  /**
   * Check if the request has been aborted
   */
  const isAborted = useCallback(() => {
    return controllerRef.current?.signal.aborted ?? false;
  }, []);

  /**
   * Clean up on unmount
   */
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return { getSignal, abort, isAborted };
}
