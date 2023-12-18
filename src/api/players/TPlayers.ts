 type TAddPlayerRequest = {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string | null;
};

export type TUpdatePlayerRequest = Omit<
  Partial<TAddPlayerRequest>,
  "name" | 'avatarUrl'
> & {
  avatarUrl?: string | File,
  id: number
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
