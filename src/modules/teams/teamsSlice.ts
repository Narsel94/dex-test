import { createSlice } from "@reduxjs/toolkit";
import { TInitialState } from "./types";
import { addTeamThunk, getTeamsThunk } from "./asyncThunk";

const initialState: TInitialState = {
  teams: [],
  error: false,
  errorData: undefined,
  loading: false,
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
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setSize: (state, action) => {
      state.pageData.size = action.payload;
    },
    setPage: (state, action) => {
      state.pageData.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addTeamThunk.pending, (state) => {
        state.error = false;
        state.errorData = undefined;
        state.loading = true;
      })
      .addCase(addTeamThunk.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(addTeamThunk.rejected, (state, action) => {
        state.error = true;
        state.errorData = action.error;
        state.loading = false;
      })
      .addCase(getTeamsThunk.pending, (state) => {
        state.error = false;
        state.errorData = undefined;
        state.loading = true;
      })
      .addCase(getTeamsThunk.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.teams = action.payload.data;
        state.pageData.count = action.payload.count;
        state.pageData.page = action.payload.page;
        state.pageData.size = action.payload.size;
      })
      .addCase(getTeamsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData = action.error;
      });
  },
});

export const { setTeams, setPage, setSize } = teamsSlice.actions;
export default teamsSlice.reducer;
