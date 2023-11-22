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
    .then((res) => {
      const newData = {
        ...data,
        team: data.team.value,
        position: data.position.value,
        imageUrl: `${imagesUrl}${res}`,
      };
      return post("/Team/Add", JSON.stringify(newData), token);
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
    throw json({ message: "Not Found", reason: "Wrong Url" }, { status: 404 });
  }
  return playerData;
};

export const getAllPlayersRequest = (): Promise<TGetPlayersResponse> =>
  get(`/Player/GetPlayers`, getCookie("token"));

export const getCurrentPlayersRequest = (
  search: string
): Promise<TGetPlayersResponse> =>
  get(`/Player/GetPlayers${search}`, getCookie("token"));

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
        .then((res) => {
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
