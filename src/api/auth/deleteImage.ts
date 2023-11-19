import { remove } from "../baseRequest";
import { getCookie } from "../../common/helpers/cookies";

export const removeImageRequest = (fileName: string) => {
  const token = getCookie("token");
  if (token) {
      return remove(`/Image/DeleteImage?fileName=${fileName}`, token);
  } else {
    throw new Error("No authorization");
  }
};
