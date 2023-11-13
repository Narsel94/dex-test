import { SerializedError } from "@reduxjs/toolkit";

export type TAddTeamRequest = {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl?: string;
};

export type TUpdateTeamRequest = {
  id: number;
  name: string;
  foundationYear?: number;
  division?: string;
  conference?: string;
  imageUrl?: string;
};

export type TAddTeamResponse = TAddTeamRequest & { id: number };
export type TTeamData = TAddTeamResponse;

export type TInitialState = {
  teams: TTeamData[];
  error: boolean;
  errorData: SerializedError | undefined;
  loading: boolean;
  pageData: {
    count: number;
    page: number;
    size: number;
  };
};

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

export type TSelectedValue = {
  label: number;
  value: number;
};
