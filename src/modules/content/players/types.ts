import { SerializedError } from "@reduxjs/toolkit";
import { TPlayerData } from "../../../api/players/types";

export type TInitialPlayersState = {
  allPlayers: TPlayerData[],
  players: TPlayerData[];
  error: boolean;
  errorData: SerializedError | undefined;
  loading: boolean;
  pageData: {
    count?: number;
    page?: number;
    size?: number;
  };
};
