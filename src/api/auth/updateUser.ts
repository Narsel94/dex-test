import { getCookie } from "../../common/helpers/cookies";
import { post } from "../baseRequest";
import { TUpdateUser } from "../helpers/types/types";

export const updateUserRequest = (data: TUpdateUser) => {
  const token = getCookie("token");
  if (token) {
    return post("/Auth/Change", JSON.stringify(data), token)
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }
};
