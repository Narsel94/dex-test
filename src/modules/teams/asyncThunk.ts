import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTeamsRequest } from "../../api/teams/teamsRequests";
import { TGetTeamsResponse, TGetTeamsRequest } from "../../api/teams/TTeams";

export const getTeamsThunk = createAsyncThunk<
  TGetTeamsResponse,
  TGetTeamsRequest
>(
  "teams/getTeam",

  async (params?: TGetTeamsRequest) => {
    const response: TGetTeamsResponse = await getTeamsRequest(params);
    return response;
  }
);
