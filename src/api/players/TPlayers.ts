export type TAddPlayerRequest = {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl?: string;
};

export type TUpdatePlayerRequest = Omit<
  Partial<TAddPlayerRequest>,
  "name" | "position"
> & {
  name: string;
  position: string;
};

export type TPlayerData = TAddPlayerRequest & {
  id: number;
};

export type TGetPlayersRequest =
  | {
      count?: number;
      page?: number;
      size?: number;
      teams?: number[];
    }
  | undefined;

export type TGetPlayersResponse = {
  data: TPlayerData[];
  count: number;
  page: number;
  size: number;
};
