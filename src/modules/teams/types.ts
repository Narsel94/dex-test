import { SerializedError } from "@reduxjs/toolkit";
import { TTeamData } from "../../api/teams/types";

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

export type TSelectedValue = {
  label: number;
  value: number;
};
