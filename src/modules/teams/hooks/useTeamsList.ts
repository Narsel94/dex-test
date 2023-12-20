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

type TUseTeamList = {
  teamsList: TAddTeamResponse[];
  isLoading: boolean;
  error: SerializedError | undefined;
  
};

export const useTeamsList = (
  page: number,
  size: number,
  search: string,
): TUseTeamList => {
  const isLoading = useAppSelector(teamsLoadingSelector);
  const error = useAppSelector(teamsErrorDataSelector);
  const teamsList = useAppSelector(teamsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getTeamsThunk({
        page,
        size,
        name: search,
      })
    );
  }, [page, size, search]);

  return { isLoading, error, teamsList };
};
