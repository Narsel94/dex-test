import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getTeamsRequest } from "../../api/teams/teamsRequests";
import { getQueries } from "../../common/helpers/getQueries";
import {
  TGetTeamsResponse,
  TGetTeamsRequest,
} from "../../api/teams/TTeams";

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
