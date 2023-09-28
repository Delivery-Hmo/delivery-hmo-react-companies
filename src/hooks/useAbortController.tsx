import { useEffect, useRef } from 'react';

const useAbortController = () => {
  const abortControllerRef = useRef<AbortController | undefined>(new AbortController());

  useEffect(() => {
    const abortController = abortControllerRef.current;

    return () => {
      if (process.env.NODE_ENV !== "development") abortController?.abort();
    };
  }, []);

  return abortControllerRef;
};

export default useAbortController;