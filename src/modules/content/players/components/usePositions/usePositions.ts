import React, { useEffect, useState } from "react";
import { getCookie } from "../../../../../common/helpers/helpers";
import { get } from "../../../../../api/base-request";

type TPosititon = {
  label: string;
  value: string;
};

export const usePositions = () => {
  const [positions, setPositions] = useState<TPosititon[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      setPositions([]);
      setError(true);
      setLoading(false);
      setErrorMessage("Not authorized");
    }

    const fetchPositions = async () => {
      setLoading(true);
      setError(false);
      try {
        await get("/Player/GetPositions", token)
          .then((res: string[]) => {
            setLoading(false);
            const result = res.map((position) => {
              return { label: position, value: position };
            });
            return result;
          })
          .then((result) => {
            setPositions([...new Set(result)]);
          });
      } catch (error) {
        setLoading(false);
        setError(true);
        if (error instanceof Error) {
          setErrorMessage(error?.message);
        }
        setErrorMessage("Something went wrong");
      }
    };

    fetchPositions();
  }, []);
  return { positions, error, errorMessage, isLoading };
};
