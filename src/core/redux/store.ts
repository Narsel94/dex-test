import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from '../../modules/content/teams/teams-slice'

const store = configureStore({
  reducer:{
    teams: teamsReducer
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;