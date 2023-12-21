import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialState } from "./types";
import { TGetTeamsResponse } from "../../api/teams/TTeams";

const initialState: TInitialState = {
  teams: [],
  pageData: {
    count: 1,
    page: 0,
    size: 6,
  },
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeamsRequest: (state, action: PayloadAction<TGetTeamsResponse>) => {
      state.teams = action.payload.data;
      state.pageData.size = action.payload.size;
      state.pageData.page = action.payload.page;
      state.pageData.count = action.payload.count;
    },
    setSize: (state, action) => {
      state.pageData.size = action.payload;
    },
    setPage: (state, action) => {
      state.pageData.page = action.payload;
    },
  },
});

export const { setTeamsRequest, setPage, setSize } = teamsSlice.actions;
export default teamsSlice.reducer;
