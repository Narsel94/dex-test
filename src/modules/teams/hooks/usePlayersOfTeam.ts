import { useEffect, useState } from "react";
import {
  TGetPlayersResponse,
  TPlayerData,
} from "../../../api/players/TPlayers";
import { getCookie } from "../../../common/helpers/cookies";

const base = process.env.REACT_APP_API;

export const usePlayersOfTeam = (teamId: number) => {
  const [players, setPlayers] = useState<TPlayerData[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const token = getCookie("token")
        if (token) {
          fetch(`${base}/Player/GetPlayers?TeamIds=${teamId}`, {
          headers: {
            'Content-Type': `application/json; charset=utf-8`,
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          if (res.ok) {
            return res.json()
          }
        }).then((data:TGetPlayersResponse) => setPlayers(data.data)).catch((error) => {
          console.log(`Sorry! Can't fetch players. Error: ${error}`)
        }) 
        }
      };

    fetchData();
  }, []);

  return players;
};
