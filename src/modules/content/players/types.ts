import { SerializedError } from "@reduxjs/toolkit";
import { TPlayerData } from "../../../api/players/types";

export type TInitialPlayersState = {
  allPlayers: TPlayerData[],
  players: TPlayerData[];
  error: boolean;
  errorData: SerializedError | undefined;
  loading: boolean;
  pageData: {
    count: number;
    page: number;
    size: number;
  };
};

export type TAddNewPlayerForm = {
  name: string;
  number: number;
  position: {
    label: string;
    value: string;
  };
  team: {
    label: string;
    value: number;
  };
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
};

export type TUpdatePlayerForm = Omit<Partial<TAddNewPlayerForm>, 'name' | 'position'> & {
  name: string,
  position: {
    label: string;
    value: string;
  },
  id: number
} 
