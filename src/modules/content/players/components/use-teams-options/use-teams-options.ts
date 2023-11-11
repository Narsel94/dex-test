import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../common/hooks/useAppSelector";
import { teamsSelector } from "../../../teams/selectors";
import { getAllTeamsRequest } from "../../../../../api/teams/teams-api";

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

export const useTeamOptions1 =  () => {
  const [teamOptions, setTeamsOptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTeamsRequest();
        const data = response.data.map((team) => ({
          label: team.name,
          value: team.id,
        }));
        setTeamsOptions(data);
      } catch (error) {
        console.error('Error fetching team options:', error);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект будет выполняться только при монтировании компонента

  return teamOptions;
};
