import { remove, get, post, put } from "../baseRequest";

import { getCookie } from "../../common/helpers/cookies";
import {
  TGetTeamsResponse,
  TUpdateTeamRequest,
  TAddTeamForm,
  TGetTeamsRequest,
} from "./TTeams";
import { saveImageRequest } from "../auth/saveImage";
import { getQueries } from "../../common/helpers/getQueries";
const imagesUrl = process.env.REACT_APP_IMAGES;

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

export const getTeamsRequest = (params?: TGetTeamsRequest) => {
  const queries = getQueries(params);
  return get(`/Team/GetTeams${queries ? queries: ''}`, getCookie("token")).catch((error) => {
    throw new Error(error.status);
  });
};

export const getAllTeamsRequest = (): Promise<TGetTeamsResponse> =>
  get(`/Team/GetTeams`, getCookie("token"));

export const postTeamRequest = (data: TAddTeamForm) => {
  const token = getCookie("token");

  return saveImageRequest(data.imageUrl)
    .then((res: string) => {
      const newData = {
        ...data,
        imageUrl: `${imagesUrl}${res}`,
      };
      return post("/Team/Add", JSON.stringify(newData), token);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const updateTeamRequest = (data: TUpdateTeamRequest) => {
  const token = getCookie("token");
  if (token) {
    if (data.imageUrl instanceof File) {
      return saveImageRequest(data.imageUrl)
        .then((res: string) => {
          const newData = {
            ...data,
            imageUrl: `${imagesUrl}${res}`,
          };
          return put("/Team/Update", JSON.stringify(newData), token);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } else {
      return put("/Team/Update", JSON.stringify(data), token);
    }
  } else {
    return Promise.reject("No authorization");
  }
};
