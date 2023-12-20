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

): TUsePlayersList => {
  const isLoading = useAppSelector(playersLoadingSelector);
  const error = useAppSelector(playersErrorDataSelector);
  const playersList = useAppSelector(playersSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getCurrentPlayersThunk({
        name: search,
        page,
        size,
        teams,
      })
    );
  }, [page, size, search, teams]);

  return { isLoading, error, playersList };
};
