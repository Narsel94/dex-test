import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getCurrentPlayersRequest } from "../../api/players/playersRequests";
import { getQueries } from "../../common/helpers/getQueries";
import {
  TGetPlayersRequest,
  TGetPlayersResponse,
} from "../../api/players/TPlayers";

export const getCurrentPlayersThunk = createAsyncThunk<
  TGetPlayersResponse,
  TGetPlayersRequest
>("players/getCurrentPlayers", async (params?: TGetPlayersRequest) => {
  let queries;
  if (params) {
    queries = getQueries(params);
  }
  const response = await getCurrentPlayersRequest(queries ? queries : "");
  return response;
});
