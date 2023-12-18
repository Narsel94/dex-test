import { get, post, remove, put } from "../baseRequest";
import { getCookie } from "../../common/helpers/cookies";
import {
  TPlayerData,
  TUpdatePlayerRequest,
  TAddNewPlayerForm,
} from "./TPlayers";
import { TGetPlayersResponse } from "./TPlayers";
import { Params, json } from "react-router-dom";
import { saveImageRequest } from "../auth/saveImage";
const imagesUrl = process.env.REACT_APP_IMAGES;

export const addPlayerRequest = (data: TAddNewPlayerForm) => {
  const token = getCookie("token");

  return saveImageRequest(data.avatarUrl)
    .then((res:string) => {
      const newData = {
        ...data,
        team: data.team.value,
        position: data.position.value,
        avatarUrl: `${imagesUrl}${res}`,
      };
      return post("/Player/Add", JSON.stringify(newData), token);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const getPlayerLoader = async (
  params: Params<string>
): Promise<TPlayerData> => {
  const token = getCookie("token");
  if (!token) {
    throw new Error("No authorization");
  }
  const playerData = await get(`/Player/Get?id=${params.playerId}`, token);
  if (!playerData) {
    throw new Response('', {status: playerData.status}) 
  }
  return playerData;
};

export const getCurrentPlayersRequest = (
  search: string
): Promise<TGetPlayersResponse> =>
  get(`/Player/GetPlayers${search}`, getCookie("token")).catch((error)=> {
    throw new Error(error.status)
  });

export const removePlayerRequest = (id: number) => {
  const token = getCookie("token");
  if (token && id) {
    return remove(`/Player/Delete?id=${id}`, token);
  }
};

export const updatePlayerRequest = (data: TUpdatePlayerRequest) => {
  const token = getCookie("token");
  if (token) {
    if (data.avatarUrl instanceof File) {
      return saveImageRequest(data.avatarUrl)
        .then((res:string) => {
          const newData = {
            ...data,
            avatarUrl: `${imagesUrl}${res}`,
          };
          return put("/Player/Update", JSON.stringify(newData), token);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
    if (typeof data.avatarUrl === "string") {
      const newData = {
        ...data,
      };
      return put("/Player/Update", JSON.stringify(newData), token).catch(
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  } else {
    return Promise.reject("No authorization");
  }
};
