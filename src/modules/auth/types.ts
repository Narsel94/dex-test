import { SerializedError } from "@reduxjs/toolkit"

export type TUserData = {
  name: string,
  avatarUrl: string
}

export type TAuthSlice = {
  isLoading: boolean, 
  error: undefined | Error | SerializedError | string
}