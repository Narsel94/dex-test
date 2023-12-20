import React, { useEffect, useState } from "react";
import { TPlayerData } from "../../../api/players/TPlayers";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../common/hooks/useAppSelector";
import { SerializedError } from "@reduxjs/toolkit";
import {
  playersErrorDataSelector,
  playersLoadingSelector,
  playersSelector,
} from "../selectors";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { getCurrentPlayersThunk } from "../asynkThunk";

type TUsePlayersList = {
  playersList: TPlayerData[];
  isLoading: boolean;
  error: SerializedError | undefined;
};

export const usePlayersList = (
  page: number,
  size: number,
  search: string,
  teams: number[],
  func?: (e?: any) => void,
  funcArg?: any | any[],
  delay: number = 600
): TUsePlayersList => {
  const isLoading = useAppSelector(playersLoadingSelector);
  const error = useAppSelector(playersErrorDataSelector);
  const playersList = useAppSelector(playersSelector);
  const dispatch = useAppDispatch();
  const name = useDebounce(search, delay, func, funcArg)

  useEffect(() => {
    dispatch(
      getCurrentPlayersThunk({
        page,
        name,
        size,
        teams,
      })
    );
  }, [page, size, name, teams]);

  return { isLoading, error, playersList };
};
