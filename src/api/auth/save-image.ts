import { getCookie } from "../../common/helpers/cookies";
import { post } from "../base-request";


export const saveImageRequest = (data:any)=> {
  const token = getCookie('token')
  try {
  return post('/Image/SaveImage', data, token)
  }
  catch (error) {
    console.log(error)
  } 
 
}