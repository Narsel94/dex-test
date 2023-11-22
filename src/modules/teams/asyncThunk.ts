import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getTeamsRequest, postTeamRequest } from "../../api/teams/teamsRequests";
import { getQueries } from "../../common/helpers/getQueries";
import {
  TAddTeamResponse,
  TAddTeamRequest,
  TGetTeamsResponse,
  TGetTeamsRequest,
} from "../../api/teams/TTeams";


type TAddForm = {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: File;
};


export const addTeamThunk = createAsyncThunk<TAddTeamResponse, TAddForm>(
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

  async (params?: TGetTeamsRequest) => {
    const queries = getQueries(params);
    const response: TGetTeamsResponse = await getTeamsRequest(
      queries ? queries : ""
    );
    return response;
  }
);
