import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TInitialPlayersState } from "./types";
import { TGetPlayersResponse } from "../../api/players/TPlayers";

const initialState: TInitialPlayersState = {
  players: [],
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
    setPlayersRequest: (state, action: PayloadAction<TGetPlayersResponse>) => {
      state.players = action.payload.data;
      state.pageData.page = action.payload.page;
      state.pageData.count = action.payload.count;
      state.pageData.size = action.payload.size;
    },
    setSize: (state, action:PayloadAction<number>) => {
      state.pageData.size = action.payload;
    },
    setPage: (state, action:PayloadAction<number>) => {
      state.pageData.page = action.payload;
    },
  },
});

export const { setPlayersRequest, setPage, setSize } = playersSlice.actions;
export default playersSlice.reducer;
