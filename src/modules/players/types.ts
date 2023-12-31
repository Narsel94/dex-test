import { TPlayerData } from "../../api/players/TPlayers";

export type TInitialPlayersState = {
  players: TPlayerData[];
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
  avatarUrl: File;
};

export type TUpdatePlayerForm = TAddNewPlayerForm & {
  id: number
} 
