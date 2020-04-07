import {
  ADD_USER_TO_STATE,
  UPDATE_USER_IN_STATE,
  REMOVE_USER_FROM_STATE
} from "./actionTypes";
import { AUTH_PATH, UPDATE_USER_PATH } from "../apiPaths";
import { showError, showNotification } from "./notificationActions";
import fetch from "../fetchWithTimeout";

/** Action for adding user data to the state */
const addUserToState = (user, token) => ({
  type: ADD_USER_TO_STATE,
  user,
  token
});

/** Action for updating a user's data in the state */
const updateUserInState = user => ({
  type: UPDATE_USER_IN_STATE,
  user
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
        dispatch(showNotification(`Let's get hacking, ${res.firstName}!`));
        dispatch(addUserToState(res, res.token));
      } else throw new Error("Unexpected server response");
    })
    .catch(err => {
      dispatch(showError(`Sign up failed: ${err.message}`));
    });
};

/**
 * Action for updating a user in the application. It involves
 * changing the username, password, etc.
 *
 * @param user {Object} The new user object to update
 */
export const updateUser = user => (dispatch, getState) => {
  const state = getState();
  return fetch(UPDATE_USER_PATH, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      dispatch(updateUserInState(user));
      dispatch(showNotification("User updated. Woot woot!"));
    })
    .catch(err => {
      dispatch(showError(`Failed to update user: ${err.message}`));
    });
};

/** Action for signing a user out of the application */
export const signOut = () => dispatch => {
  dispatch(removeUserFromState());
  dispatch(showNotification("You've signed out. See ya later!"));
};
