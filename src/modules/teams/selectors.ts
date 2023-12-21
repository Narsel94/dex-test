import { RootState } from "../../core/redux/store"

export const teamsSelector = (state:RootState) => state.teams.teams
export const teamsPageDataSelector = (state:RootState) => state.teams.pageData
