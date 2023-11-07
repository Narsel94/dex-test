import { Params } from "react-router";
import {
  TAddTeamRequest,
  TAddTeamResponse,
} from "../../modules/content/teams/types";
import { remove, get, post } from "../base-request";

import { getCookie } from "../../common/helpers/helpers";

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
