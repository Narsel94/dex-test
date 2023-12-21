import {
  ActionCreatorWithPayload,
  AnyAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../../core/redux/store";

type TUseFetchRequest<T extends Object, C> = {
  request: (args: T) => C | Promise<C>;
  args: T;
  actionCreator?: ActionCreatorWithPayload<any, string>;
};

export const useFetchRequest = <T extends Object, C>({
  request,
  args,
  actionCreator,
}: TUseFetchRequest<T, C>) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(false);
  const [response, setResponse] = useState<C | null>(null);
  const [cachedArgs, setCachedArgs] = useState(args);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const result = await request(args);
      if (!isLoading) {
        setResponse(result);
      }
      result && actionCreator && dispatch(actionCreator(result));
    } catch (err) {
      if (!isLoading) {
        setError(err);
      }
    } finally {
      if (!isLoading) {
        setIsLoading(false);
      }
    }
  };

  const isChange = () => {
    let hasChanged = false;

    for (const key in args) {
      if (args[key] !== cachedArgs[key]) {
        hasChanged = true;
        break;
      }
    }

    if (hasChanged) {
      setCachedArgs(args);
      return false;
    }

    return true;
  };

  useEffect(() => {
    isChange();
  }, [args]);

  useEffect(() => {
    if (!isLoading) {
      fetchData();
    }
  }, [request, actionCreator, cachedArgs]);

  return { response, isLoading, error };
};
