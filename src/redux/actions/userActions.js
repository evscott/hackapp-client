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
    .then(res => {
      if (!res.ok) throw new Error(`Sign up failed: ${res.statusText}`);
      return res.json();
    })
    .then(res => {
      if (res.token && res.user) {
        dispatch(showNotification(`Let's get hacking, ${res.user.firstName}!`));
        dispatch(addUserToState(res.user, res.token));
      } else {
        throw new Error(
          "Sign up failed: The server's response got scrambled like my eggs."
        );
      }
    })
    .catch(err => {
      dispatch(showError(err.message));
    });
};

/** Action for signing a user out of the application */
export const signOut = () => dispatch => {
  dispatch(removeUserFromState());
  dispatch(showNotification("You've signed out. See ya later!"));
};
