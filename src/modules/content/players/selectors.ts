import { RootState } from "../../../core/redux/store"

export const playersSelector = (state: RootState)=> state.players.players;
export const playersLoadingSelector = (state:RootState) => state.players.loading
export const playersErrorSelector = (state:RootState) => state.players.error
export const playersErrorDataSelector = (state:RootState) => state.players.errorData
export const playersPageDataSelector = (state:RootState) => state.players.pageData