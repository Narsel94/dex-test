import { getCookie } from "../../common/helpers/cookies";
import { post } from "../baseRequest";

export const saveImageRequest = (data: FormData) => {
  const token = getCookie("token");
  try {
    return post("/Image/SaveImage", data, token);
  } catch (error) {
    console.log(error);
  }
};
