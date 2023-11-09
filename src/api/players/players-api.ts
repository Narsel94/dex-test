import {get, post, remove } from '../base-request'
import { getCookie } from '../../common/helpers/helpers'
import { TAddPlayerRequest } from './types'
import { TGetPlayersResponse } from './types'

export const addPlayerRequest = (data:TAddPlayerRequest) => {
    return post('/Player/Add', JSON.stringify(data), getCookie('token'))
}

export const getPlayerLoader = (id?: string) => {
  const token = getCookie("token");
  if (token) {
    return get(`/Player/Get?id=${id}`, token);
  }
};

export const getAllPlayersRequest = ():Promise<TGetPlayersResponse> =>
  get(`/Player/GetPlayers`, getCookie("token"));

export const getCurrentPlayersRequest = (search: string):Promise<TGetPlayersResponse> =>
get(`/Player/GetPlayers${search}`, getCookie("token"));


  export const removePlayerRequest = (id: number) => {
    const token = getCookie("token");
    if (token && id) {
      return remove(`/Player/Delete?id=${id}`, token);
    }
  };
