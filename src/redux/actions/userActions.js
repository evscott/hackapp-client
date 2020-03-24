import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE } from "./actionTypes";
import { showError, showNotification } from "./notificationActions";
import fetch from "../fetchWithTimeout";

/** The path for authenticating a user */
const AUTH_PATH = `${process.env.REACT_APP_API_ADDRESS}/auth/`;

/** Action for adding user data to the state */
const addUserToState = (user, token) => ({
  type: ADD_USER_TO_STATE,
  user,
  token
});

/** Action for removing user data from the state */
const removeUserFromState = () => ({
  type: REMOVE_USER_FROM_STATE
});

/** Action for signing a user into the application */
export const signIn = user => dispatch => {
  return fetch(AUTH_PATH, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.token && res.user) {
        dispatch(showNotification(`Welcome back, ${res.user.firstName}!`));
        dispatch(addUserToState(res.user, res.token));
      } else {
        dispatch(showError("Sign in failed. Shucks."));
      }
    })
    .catch(() => {
      dispatch(showError("Sign in failed. Tragic."));
    });
};

/** Action for signing a user up for the application */
export const signUp = user => dispatch => {
  return fetch(AUTH_PATH, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.token && res.user) {
        dispatch(showNotification(`Let's get hacking, ${res.user.firstName}!`));
        dispatch(addUserToState(res.user, res.token));
      } else {
        dispatch(showError("Sign up failed. Somebody messed up big time."));
      }
    })
    .catch(() => {
      dispatch(showError("Sign up failed. That sucks."));
    });
};

/** Action for signing a user out of the application */
export const signOut = () => dispatch => {
  dispatch(removeUserFromState());
  dispatch(showNotification("You've signed out. See ya later!"));
};
