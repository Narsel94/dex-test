import { getCookie } from "../../common/helpers/cookies";
import { post } from "../baseRequest";

export const saveImageRequest = (data?: File) => {
  const token = getCookie("token");
  if (data) {
    const formData = new FormData();
    formData.append("file", data);
    try {
      return post("/Image/SaveImage", formData, token);

    } catch (error) {
      console.log(12)
      return  Promise.reject(error)

    }
  } else {
    throw new Error("Файл не выбран");
  }
};
