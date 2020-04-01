import { UPDATE_HACKATHON_DETAILS_ARRAY_IN_STATE } from "./actionTypes";
import { CREATE_HACK_DETAILS_PATH, getGetHackDetailsPath } from "../apiPaths";
import { showError } from "./notificationActions";
import fetch from "../fetchWithTimeout";
import {
  convertDetailsFromServerToRedux,
  convertDetailsFromUIToServer
} from "../util/detailsAdapter";

/** Action for loading an array of details into the app */
const updateHackathonDetailsArrayInState = (details, hid) => ({
  type: UPDATE_HACKATHON_DETAILS_ARRAY_IN_STATE,
  details,
  hid
});

/**
 * Action for creating an array of hackathon detail objects.
 *
 * @param details {Array} The detail objects to create
 * @param hid {String} The id of the hackathon to add details to
 */
export const createHackathonDetails = (details, hid) => (
  dispatch,
  getState
) => {
  const state = getState();
  details = convertDetailsFromUIToServer(details);
  return fetch(CREATE_HACK_DETAILS_PATH, {
    method: "POST",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ details, hid })
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      const newDetails = convertDetailsFromServerToRedux(
        res,
        state.hackathons.byHID[hid].details
      );
      dispatch(updateHackathonDetailsArrayInState(newDetails, hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to update details: ${err.message}`));
    });
};

/**
 * Action for getting the array of details for a hackathon from
 * the server.
 *
 * @param hid {String} The id of the hackathon to get details for
 */
export const getHackathonDetails = hid => dispatch => {
  return fetch(getGetHackDetailsPath(hid), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      const newDetails = convertDetailsFromServerToRedux(res);
      dispatch(updateHackathonDetailsArrayInState(newDetails, hid));
    })
    .catch(err => {
      console.log(err);
      dispatch(showError(`Failed to get details: ${err.message}`));
    });
};
