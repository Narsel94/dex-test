import React, { useEffect, useState } from "react";

export const useError = (delay?: number) => {
  const [error, setError] = useState<unknown | undefined>(undefined);
  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(undefined);
      }, delay || 7000);
  }, [error]);

  return [error, setError] as const;
};
