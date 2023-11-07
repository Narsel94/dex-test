import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from '../../modules/content/teams/teams-slice'
import playersReducer from '../../modules/content/players/players-slice'

const store = configureStore({
  reducer:{
    teams: teamsReducer,
    players: playersReducer
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;