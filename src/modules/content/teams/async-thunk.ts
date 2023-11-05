import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../common/helpers/helpers";
import {
  TAddTeamRequest,
  TAddTeamResponse,
  TGetTeamsRequest,
  TGetTeamsResponse,
} from "./types";
import { getQueries } from "./helpers/get-queries";

// import { addTeamRequest, getTeamsRequest } from "../api";

import { post, get } from "../../../api/base-request";

const postTeamRequest = (data: TAddTeamRequest) =>
  post("/Team/Add", JSON.stringify(data), getCookie("token"));

const getTeamsRequest = (search?: string) =>
  get(`/Team/GetTeams${search}`, getCookie("token"));

export const addTeamThunk = createAsyncThunk<TAddTeamResponse, TAddTeamRequest>(
  "teams/addTeam",
  async (data) => {
    const response = await postTeamRequest(data);
    return response;
  }
);

export const getTeamsThunk = createAsyncThunk<
  TGetTeamsResponse,
  TGetTeamsRequest
>(
  "teams/getTeam",

  async (params?:TGetTeamsRequest) => {
    const queries = getQueries(params);
    const response: TGetTeamsResponse = await getTeamsRequest(queries? queries: '');
    return response;
  }
);
