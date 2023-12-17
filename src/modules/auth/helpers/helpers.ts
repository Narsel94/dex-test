export const getToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split("; " + "token" + "=");
  if (parts.length === 2) {
    const token = parts.pop();
    return token;
  }
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

export const setCookie = (name: string, cookie: string) => {
  const now = new Date();
  now.setTime(now.getTime() + 6 * 60 * 60 * 1000);
  const expires = now.toUTCString();
  document.cookie = `${name}=${cookie}; expires= + ${expires} + ; path=/`;
};

