import { createSlice } from "@reduxjs/toolkit";
import { TInitialPlayersState } from "./types";
import { getPlayersThunk } from "./asynk-thunk";

const initialState: TInitialPlayersState = {
  allPlayers: [],
  players: [],
  error: false,
  errorData: undefined,
  loading: false,
  pageData: {
    count: 1,
    page: 0,
    size: 6,
  },
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setSize: (state, action) => {
      state.pageData.size = action.payload;
    },
    setPage: (state, action) => {
      state.pageData.page = action.payload;
    },
    setAllPlayers: (state, action) => {
      state.allPlayers = action.payload.data
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPlayersThunk.pending, (state) => {
        state.error = false;
        state.errorData = undefined;
        state.loading = true;
      })
      .addCase(getPlayersThunk.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.players = action.payload.data;
        state.pageData.count = action.payload.count;
        state.pageData.page = action.payload.page;
        state.pageData.size = action.payload.size;
      })
      .addCase(getPlayersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData = action.error;
      });
  },
});

export const { setPlayers, setPage, setSize, setAllPlayers } = playersSlice.actions;
export default playersSlice.reducer;
