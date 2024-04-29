export const ironSessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  cookieOptions: {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
};
