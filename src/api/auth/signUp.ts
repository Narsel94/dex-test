import { post } from "../baseRequest";
import { TSignUpRequest, TSignUpResponse } from "../helpers/types/types";
import { setCookie } from "../../common/helpers/cookies";

export const signUpRequest = (data: TSignUpRequest) => {
  return post("/Auth/SignUp", JSON.stringify(data))
    .then((data: TSignUpResponse) => {
      setCookie("token", data.token);
      if (data.avatarUrl) {
        setCookie("avatarUrl", data.avatarUrl);
      }
      if (data.name) {
        setCookie("name", data.name);
      }
    })
};
