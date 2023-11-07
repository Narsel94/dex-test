import React from "react";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { teamsSelector } from "../../teams/selectors";

type TTeamOption = {
  value: number;
  label: string;
};

export const useTeamsOptions = () => {
  const teams = useAppSelector(teamsSelector);

  const result: TTeamOption[] = [];

  if (teams.length > 0) {
    teams.map((team) => {
      result.push({ label: team.name, value: team.id });
    });
  }

  return result;
};
