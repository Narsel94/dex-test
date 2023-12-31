import { useEffect, useState } from "react";
import {
  TGetPlayersResponse,
  TPlayerOfTeam,
} from "../../../api/players/TPlayers";
import { getCookie } from "../../../common/helpers/cookies";
import { getAge } from "../../players/helpers/getAge";

const base = process.env.REACT_APP_API;

export const usePlayersOfTeam = (teamId: number | null) => {
  const [players, setPlayers] = useState<TPlayerOfTeam[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
      if (token) {
        fetch(`${base}/Player/GetPlayers?TeamIds=${teamId}`, {
          headers: {
            "Content-Type": `application/json; charset=utf-8`,
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data: TGetPlayersResponse) => {
            const players: TPlayerOfTeam[] = data.data.map((player) => {
              return {
                ...player,
                age: getAge(player.birthday),
              };
            });
            setPlayers(players);
          })
          .catch((error) => {
            console.log(`Sorry! Can't fetch players. Error: ${error}`);
          });
      }
    };

    teamId !== null && fetchData();
  }, []);

  return players;
};
