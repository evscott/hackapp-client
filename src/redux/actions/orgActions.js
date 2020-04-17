import {
  UPDATE_ORG_IN_STATE,
  FAILURE_GET_ORG,
  GETTING_ORG
} from "./actionTypes";
import { CREATE_ORG_PATH, GET_ORG_PATH } from "../apiPaths";
import { showError } from "./notificationActions";
import fetch from "../fetchWithTimeout";

/** Action for setting the organization in the state */
const updateOrgInState = name => ({
  type: UPDATE_ORG_IN_STATE,
  name
});

/** Action for when we're in the process of getting org */
const gettingOrg = () => ({ type: GETTING_ORG });

/** Action for when fail to get an org (because not created) */
const failGetOrg = () => ({ type: FAILURE_GET_ORG });

/**
 * Action for creating an organization.
 *
 * @param name {String} The name of the organization
 */
export const createOrg = name => (dispatch, getState) => {
  const state = getState();
  dispatch(gettingOrg());
  return fetch(CREATE_ORG_PATH, {
    method: "POST",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      dispatch(updateOrgInState(res.name));
    })
    .catch(err => {
      dispatch(failGetOrg());
      dispatch(showError(`Failed to create organization: ${err.message}`));
    });
};

/** Action for getting the organization */
export const getOrg = () => dispatch => {
  dispatch(gettingOrg());
  return fetch(GET_ORG_PATH, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        if (res.status === 404) dispatch(failGetOrg());
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(updateOrgInState(res.name));
    })
    .catch(err => {
      dispatch(showError(`Failed to get organization: ${err.message}`));
    });
};
