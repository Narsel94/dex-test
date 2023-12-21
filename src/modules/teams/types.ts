import { TTeamData } from "../../api/teams/TTeams";

export type TInitialState = {
  teams: TTeamData[];
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
