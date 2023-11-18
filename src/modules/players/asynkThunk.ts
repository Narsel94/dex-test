import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPlayersRequest, getCurrentPlayersRequest } from "../../api/players/players-api";
import { getQueries } from "../../common/helpers/getQueries";
import {
  TGetPlayersRequest,
  TGetPlayersResponse,
} from "../../api/players/types";

export const getAllPlayersThunk = createAsyncThunk<
  TGetPlayersResponse,
  TGetPlayersRequest
>("players/getAllPlayers", async (_, {dispatch}) => {
  const response = await getAllPlayersRequest();
  return response;
});

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
