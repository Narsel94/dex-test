export type TUpdateTeamRequest = {
  id: number;
  name: string;
  foundationYear?: number;
  division?: string;
  conference?: string;
  imageUrl?: string;
};

export type TAddTeamRequest = {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl?: string;
};

export type TAddTeamResponse = TAddTeamRequest & { id: number };

export type TTeamData = TAddTeamResponse;

export type TGetTeamsRequest = {
  name?: string;
  page?: number;
  size?: number;
};

export type TGetTeamsResponse = {
  data: TTeamData[];
  size: number;
  page: number;
  count: number;
};
