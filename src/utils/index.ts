import { Cookie } from "next-cookie";

const EXPIRES = 24 * 60 * 60 * 1000; // 1 day
const PATH = "/";

interface ICookieInfo {
  id: number;
  nickname: string;
  avatar: string;
  [key: string]: any;
}

export const setCookies = (cookies: Cookie, info: ICookieInfo) => {
  const expires = new Date(Date.now() + EXPIRES);
  for (const k in info) {
    cookies.set(k, info[k], {
      expires,
      path: PATH,
    });
  }
};

export const clearCookies = (cookies: Cookie) => {
  const allCookies = cookies.getAll() || {};
  const expires = new Date(Date.now() + EXPIRES);
  for (const k in allCookies) {
    cookies.set(k, "", { expires, path: PATH });
  }
};
