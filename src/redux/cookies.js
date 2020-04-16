import Cookies from "js-cookie";

/** The name for the cookie that has the authentication token for the app */
const TOKEN_COOKIE_NAME = "hackapp-token";

/** The functionality for getting, setting, and removing the token's cookie for HackApp */
export const TokenCookie = {
  get: () => Cookies.get(TOKEN_COOKIE_NAME),
  set: token => Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 0.5 }),
  remove: () => Cookies.remove(TOKEN_COOKIE_NAME)
};
