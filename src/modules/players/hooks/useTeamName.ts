import { useEffect, useState } from "react";
import { getTeamLoader } from "../../../api/teams/teamsRequests";

export const useTeamName =  (id:number) => {
  const [teamOptions, setTeamsOptions] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeamLoader(id.toString());
        const data = response.name
        setTeamsOptions(data);
      } catch (error) {
        console.error('Error fetching team options:', error);
      }
    };

    fetchData();
  }, [id]); 

  return teamOptions;
};

