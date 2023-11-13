import { useEffect, useState } from "react";
import {
  TGetPlayersResponse,
  TPlayerData,
} from "../../../../api/players/types";
import { get } from "react-hook-form";
import { getCookie } from "../../../../common/helpers/cookies";

export const usePlayersOfTeam = (teamId: number) => {
  const [players, setPlayers] = useState<TPlayerData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: TGetPlayersResponse = await get(
          `/Player/GetPlayers?TeamIds=${teamId}`,
          getCookie("token")
        );

        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching team options:", error);
      }
    };

    fetchData();
  }, []);

  return players;
};
