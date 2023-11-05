import { TGetTeamsRequest } from "../types";

export const getQueries = (obj?: TGetTeamsRequest) => {
  if (obj) {
    let result = "";
    if (obj.name) {
      result += `Name=${obj.name}&`;
    }
    if (obj.page) {
      result += `Page=${obj.page}&`;
    }
    if (obj.size) {
      result += `PageSize=${obj.size}&`;
    }
    return `?${result.slice(0, -1)}`;
  }
};
