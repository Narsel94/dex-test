import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getTeamsRequest, postTeamRequest } from "../../api/teams/teamsRequests";
import { getQueries } from "../../common/helpers/getQueries";
import {
  TAddTeamResponse,
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
