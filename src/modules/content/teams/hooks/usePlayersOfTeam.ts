import { useEffect, useState } from "react";
import {
  TGetPlayersResponse,
  TPlayerData,
} from "../../../../api/players/types";
import { get } from "react-hook-form";
import { getCookie } from "../../../../common/helpers/cookies";

// http://dev.trainee.dex-it.ru/api/Player/GetPlayers?TeamIds=
const base = process.env.REACT_APP_API;

export const usePlayersOfTeam = (teamId: number) => {
  const [players, setPlayers] = useState<TPlayerData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response: TGetPlayersResponse = await get(
  //         `/Player/GetPlayers?TeamIds=${teamId}`,
  //         getCookie("token")
  //       );
  //       console.log(response);
  //       setPlayers(response.data);
  //     } catch (error) {
  //       console.error("Error fetching players:", error);
  //     }
  //   };

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
        }).then(({data}) => setPlayers(data)).catch((error) => {
          console.log(`Sorry! Can't fetch players. Error: ${error}`)
        }) 
        }
      
    
      };

    fetchData();
  }, []);

  return players;
};
