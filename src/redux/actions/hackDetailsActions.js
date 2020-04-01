import { UPDATE_HACKATHON_DETAILS_ARRAY_IN_STATE } from "./actionTypes";
import {
  CREATE_HACK_DETAILS_PATH,
  getGetHackDetailsPath,
  UPDATE_HACK_DETAILS_PATH
} from "../apiPaths";
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
 * @param details {Array} The detail objects to create, already
 * converted for sending to the server
 * @param hid {String} The id of the hackathon to add details to
 */
export const createHackathonDetails = (details, hid) => (
  dispatch,
  getState
) => {
  const state = getState();
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
      dispatch(showError(`Failed to create details: ${err.message}`));
    });
};

/**
 * Sends a request to update all of the details provided in the details
 * array. For this request, every single detail object must already
 * exist on the server; it does not create ones that do not yet exist.
 *
 * @param details {Array} The detail objects to update
 * @param hid {String} The hackathon to update details for
 */
const updateHackathonDetails = (details, hid) => (dispatch, getState) => {
  const state = getState();
  return fetch(UPDATE_HACK_DETAILS_PATH, {
    method: "PUT",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ details })
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
 * Takes the updated hackathon details from the GUI and sends update,
 * create, and delete requests to the server to do so.
 *
 * @param details {Array} The details from the GUI
 * @param hid {String} The hackathon to update details for
 * @returns {Function}
 */
export const updateAllHackathonDetails = (details, hid) => (
  dispatch,
  getState
) => {
  const state = getState();
  const storedDetails = state.hackathons.byHID[hid].details;
  // Get the details into the correct format for the server
  details = convertDetailsFromUIToServer(details);

  // Find the details that need to be updated and created
  const toUpdate = [];
  const toCreate = [];
  details.forEach(item => {
    // If the detail existed before, it's a potential update
    if (item.did) {
      // If the detail has been changed, then update the server
      if (JSON.stringify(item) !== JSON.stringify(storedDetails[item.did]))
        toUpdate.push(item);
    } else {
      // The detail did not exist so we need to create it
      toCreate.push(item);
    }
  });
  dispatch(updateHackathonDetails(toUpdate, hid));
  dispatch(createHackathonDetails(toCreate, hid));
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
      dispatch(showError(`Failed to get details: ${err.message}`));
    });
};
