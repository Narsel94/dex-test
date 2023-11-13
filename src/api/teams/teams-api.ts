import { remove, get, post, put } from "../base-request";

import { getCookie } from "../../common/helpers/cookies";
import {
  TAddTeamRequest,
  TGetTeamsResponse,
  TUpdateTeamRequest,
} from "./types";

export const removeTeam = (id: number) => {
  const token = getCookie("token");
  if (token && id) {
    return remove(`/Team/Delete?id=${id}`, token);
  }
};

export const getTeamLoader = (id?: string) => {
  const token = getCookie("token");
  if (token) {
    return get(`/Team/Get?id=${id}`, token);
  }
};

export const postTeamRequest = (data: TAddTeamRequest) =>
  post("/Team/Add", JSON.stringify(data), getCookie("token"));

export const getTeamsRequest = (search?: string) =>
  get(`/Team/GetTeams${search}`, getCookie("token"));

export const getAllTeamsRequest = (): Promise<TGetTeamsResponse> =>
  get(`/Team/GetTeams`, getCookie("token"));

export const updateTeamRequest = (data: TUpdateTeamRequest) => {
  const token = getCookie("token");
  if (token) {
    return put("/Team/Update", JSON.stringify(data), token);
  }
};
