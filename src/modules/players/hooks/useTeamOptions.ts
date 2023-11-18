import React, { useEffect, useState } from "react";
import { getAllTeamsRequest, getTeamLoader } from "../../../api/teams/teams-api";

type TTeamOption = {
  value: number;
  label: string;
};

export const useTeamOptions =  () => {
  const [teamOptions, setTeamsOptions] = useState<TTeamOption[]>([]);

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
  }, []); 

  return teamOptions;
};

