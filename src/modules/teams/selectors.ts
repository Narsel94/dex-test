import { RootState } from "../../core/redux/store"

export const teamsSelector = (state:RootState) => state.teams.teams
export const teamsLoadingSelector = (state:RootState) => state.teams.loading
export const teamsErrorSelector = (state:RootState) => state.teams.error
export const teamsErrorDataSelector = (state:RootState) => state.teams.errorData
export const teamsPageDataSelector = (state:RootState) => state.teams.pageData
