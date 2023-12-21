import { RootState } from "../../core/redux/store"

export const playersSelector = (state: RootState)=> state.players.players;
export const playersPageDataSelector = (state:RootState) => state.players.pageData