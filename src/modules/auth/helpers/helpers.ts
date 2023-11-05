export const getToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split("; " + "token" + "=");
  if (parts.length === 2) {
    const token = parts.pop();
    // ?.split(";").shift()
    return token;
  }
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

export const setCookie = (name: string, cookie: string) => {
  const now = new Date();
  now.setTime(now.getTime() + 6 * 60 * 60 * 1000);
  const expires = now.toUTCString();
  document.cookie = `${name}=${cookie}; expires= + ${expires} + ; path=/`;
};

export const removeToken = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
};
