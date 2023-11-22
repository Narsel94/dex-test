export type TAddTeamRequest = {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl?: string;
};

export type TAddTeamForm = {
  name: string;
  foundationYear?: number;
  division: string;
  conference: string;
  imageUrl: File;
};

export type TUpdateTeamRequest = Omit<TAddTeamForm, 'imageUrl'> & {
  imageUrl: File | string, 
  id: number;
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
