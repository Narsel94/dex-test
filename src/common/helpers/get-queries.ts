export type TGetParams = {
  name?: string;
  page?: number;
  size?: number;
  teams?: number[];
};

export const getQueries = (params?: TGetParams) => {
  if (params) {
    let result = "";
    if (params.name) {
      result += `Name=${params.name}&`;
    }
    if (params.page) {
      result += `Page=${params.page}&`;
    }
    if (params.size) {
      result += `PageSize=${params.size}&`;
    }
    if (params.teams && params.teams.length>0) {
      const teamString = params.teams.map(encodeURIComponent).join('&TeamIds=')
      result += `${teamString}&`;
    }
    return `?${result.slice(0, -1)}`;
  }
};
