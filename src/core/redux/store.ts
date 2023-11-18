import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from '../../modules/teams/teamsSlice'
import playersReducer from '../../modules/players/playersSlice'

const store = configureStore({
  reducer:{
    teams: teamsReducer,
    players: playersReducer
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;