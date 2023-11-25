import { IRequestBaseBody } from "./helpers/interfaces/interfaces";
import { RequestGenericType } from "./helpers/types/types";

const base = process.env.REACT_APP_API;

const request = async (
  url: string,
  data: IRequestBaseBody<RequestGenericType>,
  token: string | undefined
) => {
  const headersForToken = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
  const headerForMultiPart =
    typeof data.body === "string"
      ? {
          "Content-Type": "application/json;charset=utf-8",
        }
      : {};
  const response = await fetch(url, {
    ...data,
    // @ts-ignore
    headers: {
      ...headersForToken,
      ...headerForMultiPart,
    },
  });
  if (response.ok) {
    if (response.headers.get("Content-Length") === "0") {
      return true;
    }
    const typeResponse = response.headers.get("Content-Type");
    let result;
    if (typeResponse === "application/text") {
      result = await response.text();
      return result;
    }
    result = await response.json();
    return result;
  }
  throw { isCustomError: true, status: response.status };
};

export const get = (url: string, token?: string) =>
  request(`${base}${url}`, { method: "GET" }, token);

export function post<T extends RequestGenericType>(
  url: string,
  body: T,
  token?: string
) {
  return request(`${base}${url}`, { method: "POST", body }, token);
}

export const remove = (url: string, token: string) =>
  request(`${base}${url}`, { method: "DELETE" }, token);

export function put<T extends RequestGenericType>(
  url: string,
  body: T,
  token: string
) {
  return request(`${base}${url}`, { method: "PUT", body }, token);
}
