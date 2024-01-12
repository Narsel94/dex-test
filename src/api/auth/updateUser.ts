import { getCookie } from "../../common/helpers/cookies";
import { post } from "../baseRequest";
import { TUpdateUser, TUpdateUserRequest } from "../helpers/types/types";
import { saveImageRequest } from "./saveImage";

const imagesUrl = process.env.REACT_APP_IMAGES;

const changeUserRequest = (data: TUpdateUserRequest, token: string) => {
  return post("/Auth/Change", JSON.stringify(data), token)
    .then(() => {
      return {
        ok: true,
        data: data,
        error: undefined,
      };
    })
    .catch((error) => {
      return {
        ok: false,
        data: undefined,
        error: error,
      };
    });
};


export const updateUserRequest = async (data: TUpdateUser) => {
  const token = getCookie("token");
  if (token) {
    if (data.avatarUrl instanceof File) {
      return saveImageRequest(data.avatarUrl).then(async (res: string) => {
        const response = await changeUserRequest(
          {
            userName: data.userName,
            avatarUrl: `${imagesUrl}${res}`,
          },
          token
        );
        return response
      })
    } else if (typeof data.avatarUrl === 'string') {
      const response = await changeUserRequest(
        {
          userName: data.userName,
          avatarUrl: data.avatarUrl,
        },
        token
      );
      return response
    } else {
      return {
        ok: false, 
        data: undefined,
        error: 'Wrong params'
      }
    }
  } else {
    return { ok: false, error: "No authorization", data: undefined };
  }
};
