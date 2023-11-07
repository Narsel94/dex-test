import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPlayersRequest } from "../../../api/players/players-api";
import { getQueries } from "../teams/helpers/get-queries";
import {
  TGetPlayersRequest,
  TGetPlayersResponse,
} from "../../../api/players/types";

export const getPlayersThunk = createAsyncThunk<
  TGetPlayersResponse,
  TGetPlayersRequest
>("players/getPlayers", async (params?: TGetPlayersRequest) => {
  let queries;
  if (params) {
    queries = getQueries(params);
  }
  const response = await getPlayersRequest(queries ? queries : "");
  return response;
});
