import {get, post } from '../base-request'
import { getCookie } from '../../common/helpers/helpers'
import { TAddPlayerRequest, TAddPlayerResponse } from '../helpers/types/types'


export const addPlayerRequest = (data:TAddPlayerRequest) => {
    return post('/Player/Add', JSON.stringify(data), getCookie('token'))
}
