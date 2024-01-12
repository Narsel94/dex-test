import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from '../../modules/teams/teamsSlice'
import playersReducer from '../../modules/players/playersSlice'
import authReducer from '../../modules/auth/authSlice'

const store = configureStore({
  reducer:{
    teams: teamsReducer,
    players: playersReducer,
    auth: authReducer
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;