import { useLoaderData } from "react-router";
import { getAge } from "../helpers/getAge";

type TGetPlayerData = {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string | null;
  id: number,
  teamName: string | null
}

const isPlayerData = (data: unknown): data is TGetPlayerData => {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    typeof data.id === "number" &&
    "name" in data &&
    typeof data.name === "string" &&
    "number" in data &&
    typeof data.number === "number" &&
    "position" in data &&
    typeof data.position === "string" &&
    "team" in data &&
    typeof data.team === "number" &&
    "birthday" in data &&
    typeof data.birthday === "string" &&
    "height" in data &&
    typeof data.height === "number" &&
    "weight" in data &&
    typeof data.weight === "number" &&
    "avatarUrl" in data &&
    typeof data.avatarUrl === "string" && 
    "teamName" in data && typeof data.teamName === 'string'
  );
};

export const usePlayerInfo = () => {
  const data = useLoaderData();

  if (isPlayerData(data)) {
    const age = getAge(data.birthday);
    return {
      player: {
        ...data,
        age: age,
      },
      isPlayer: true,
    };
  } else {
    return {
      player: null,
      isPlayer: false,
    };
  }
};
