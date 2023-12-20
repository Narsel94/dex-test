import React, { useEffect, useState } from "react";

type DebouncedFunction = (e?: any) => void;

export const useDebounce = (
  value: string | undefined,
  delay: number = 600,
  func?: DebouncedFunction,
  funcArg?: any | any[]
) => {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(
    value
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
      if (func && typeof func === "function") {
        funcArg ? func(funcArg) : func();
      }
    }, delay);

    return () => clearTimeout(debounce);
  }, [value, delay]);

  return debouncedValue;
};
