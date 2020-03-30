import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE } from "./actionTypes";
import { AUTH_PATH } from "../apiPaths";
import { showError, showNotification } from "./notificationActions";
import fetch from "../fetchWithTimeout";

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
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      if (res.token) {
        dispatch(showNotification(`Welcome back, ${res.firstName}!`));
        dispatch(addUserToState(res, res.token));
      } else throw new Error("Unexpected server response");
    })
    .catch(err => {
      dispatch(showError(`Sign in failed: ${err.message}`));
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
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      console.log(res);
      if (res.token) {
        dispatch(showNotification(`Let's get hacking, ${res.user.firstName}!`));
        dispatch(addUserToState(res, res.token));
      } else throw new Error("Unexpected server response");
    })
    .catch(err => {
      dispatch(showError(`Sign up failed: ${err.message}`));
    });
};

/** Action for signing a user out of the application */
export const signOut = () => dispatch => {
  dispatch(removeUserFromState());
  dispatch(showNotification("You've signed out. See ya later!"));
};
