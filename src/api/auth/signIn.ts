import { post } from "../baseRequest";
import { TSignInRequest, TSignInResponse } from "../helpers/types/types";

export const signInRequest = (data: TSignInRequest) => {
  return post("/Auth/SignIn", JSON.stringify(data));
};
