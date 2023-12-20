import { useEffect } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { getTeamsThunk } from "../asyncThunk";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../common/hooks/useAppSelector";
import {
  teamsErrorDataSelector,
  teamsLoadingSelector,
  teamsSelector,
} from "../selectors";
import { TAddTeamResponse } from "../../../api/teams/TTeams";
import { useDebounce } from "../../../common/hooks/useDebounce";

type TUseTeamList = {
  teamsList: TAddTeamResponse[];
  isLoading: boolean;
  error: SerializedError | undefined;
  
};

export const useTeamsList = (
  page: number,
  size: number,
  search: string,
  func?: (e?: any) => void,
  funcArg?: any | any[],
  delay: number = 600
): TUseTeamList => {
  const isLoading = useAppSelector(teamsLoadingSelector);
  const error = useAppSelector(teamsErrorDataSelector);
  const teamsList = useAppSelector(teamsSelector);
  const dispatch = useAppDispatch();
  const name = useDebounce(search, delay, func, funcArg)

  useEffect(() => {
    dispatch(
      getTeamsThunk({
        page,
        size,
        name,
      })
    );
  }, [page, size, name]);

  return { isLoading, error, teamsList };
};
