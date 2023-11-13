import { post } from "../base-request";
import { TSignInRequest, TSignInResponse } from "../helpers/types/types";
import { setCookie } from "../../common/helpers/cookies";

export const signInRequest = (data: TSignInRequest, ) =>
  post("/Auth/SignIn", JSON.stringify(data))
    .then((data: TSignInResponse) => {
      setCookie("token", data.token);
      if (data.avatarUrl) {
        setCookie("avatarUrl", data.avatarUrl);
      }
      if (data.name) {
        setCookie("name", data.name);
      }
    })
    // .catch((error) => {
    //   cb && cb(error)
    //   console.error("An error occurred:", error);
    // } cb?:(e?: any) =>void
    
    // );
