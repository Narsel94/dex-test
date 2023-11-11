import { get, post, remove, put } from "../base-request";
import { getCookie } from "../../common/helpers/helpers";
import { TAddPlayerRequest, TPlayerData, TUpdatePlayerRequest } from "./types";
import { TGetPlayersResponse } from "./types";
import { Params, json } from "react-router-dom";

export const addPlayerRequest = (data: TAddPlayerRequest) => {
  return post("/Player/Add", JSON.stringify(data), getCookie("token"));
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
  const token = getCookie("token")
  if (token) {
    return put("/Player/Update", JSON.stringify(data), token);
  }
  
};