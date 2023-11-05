import { Params } from "react-router";
import { remove, get } from "../base-request";

import { getCookie } from "../../common/helpers/helpers";

export const removeTeam = (id: number) => {
  const token = getCookie("token");
  if (token && id) {
    return remove(`Team/Delete?id=${id}`, token);
  }
};

export const getTeamLoader = async (id: any) => {
  const token = getCookie("token");
  if (token) {
    return get(`/Team/Get?id=${id}`, token);
  }
};
