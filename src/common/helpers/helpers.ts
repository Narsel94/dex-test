export const getCookie = (name: string) => {
  const value = `${document.cookie}`;
  const test = value.split("; ").filter((val) => val.includes(name));
  if (test.length > 0) {
    const cookie1 = test[0].split(`${name}=`)[1];
    return cookie1
  }
};


export const setCookie = (name: string, cookie: string) => {
  const now = new Date();
  now.setTime(now.getTime() + 6 * 60 * 60 * 1000);
  const expires = now.toUTCString();
  document.cookie = `${name}=${cookie}; expires= + ${expires} + ; path=/`;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};