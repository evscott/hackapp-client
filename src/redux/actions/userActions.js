import { SIGNIN_USER, SIGNOUT_USER } from "./actionTypes";

/** Action for signing a user into the application */
export const signIn = user => ({
  type: SIGNIN_USER,
  user
});

/** Action for signing a user out of the application */
export const signOut = () => ({
  type: SIGNOUT_USER
});
