import { post } from "../baseRequest";
import { TSignUpRequest } from "../helpers/types/types";

export const signUpRequest = (data: TSignUpRequest) => {
  return post("/Auth/SignUp", JSON.stringify(data));
};
