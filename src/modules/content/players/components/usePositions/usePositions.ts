import React, { useEffect, useState } from "react";
import { getCookie } from "../../../../../common/helpers/helpers";
import { get } from "../../../../../api/base-request";

type TPosititon = {
  label: string;
  value: string;
};

export const usePositions = () => {
  const [positions, setPositions] = useState<any[]>([]);
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
      try {
        setLoading(true);
        const response = await get('/Player/GetPositions', token) 
        
        console.log(typeof response)
        // const data = response.map((item) => {
        //   return { label: item, value: item };
        // });
        // setPositions([...new Set(result)]);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("An error occurred");
        }
      }
    };
    {
      token && fetchPositions();
    }
  }, []);
  return { positions, error, errorMessage, isLoading };
};
