import {
  ADD_HACKATHONS_TO_STATE,
  UPDATE_HACKATHON_OVERVIEW_IN_STATE,
  DELETE_HACKATHON
} from "./actionTypes";
import {
  CREATE_NEW_HACK_PATH,
  GET_ALL_HACKS_PATH,
  UPDATE_HACK_PATH
} from "../apiPaths";
import fetch from "../fetchWithTimeout";
import { showError, showNotification } from "./notificationActions";
import { convertOverview } from "../util/dateConverter";

/** Action for loading an array of hackathons into the app */
const addHackathonsToState = hackathons => ({
  type: ADD_HACKATHONS_TO_STATE,
  hackathons
});

/** Action for adding a hackathon to the app */
const updateHackathonOverviewInState = (overview, hid) => ({
  type: UPDATE_HACKATHON_OVERVIEW_IN_STATE,
  overview,
  hid
});

/** Action for deleting a hackathon from the app */
export const deleteHackathon = hid => ({
  type: DELETE_HACKATHON,
  hid
});

/**
 * Action for loading in all hackathons from the server.
 *
 * @returns {function} A redux-thunk function that fetchs from the server
 */
export const getHackathons = () => dispatch => {
  return fetch(GET_ALL_HACKS_PATH, {
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
      // Convert them for the redux store
      const hacks = res.map(item => ({
        overview: convertOverview(item),
        hid: item.hid
      }));
      dispatch(addHackathonsToState(hacks));
    })
    .catch(err => {
      dispatch(showError(`Failed to get hackathons: ${err.message}`));
    });
};

/**
 * Action for adding a hackathon to the app. Sends it to the server.
 * If fails to update for the server, it also fails locally.
 *
 * @param hackathon The hackathon to add
 * @returns {Function} A redux-thunk function that fetchs from the server
 */
export const addHackathon = hackathon => (dispatch, getState) => {
  const state = getState();
  // First, add the overview.
  return fetch(CREATE_NEW_HACK_PATH, {
    method: "POST",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hackathon.overview)
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      res = convertOverview(res);
      dispatch(updateHackathonOverviewInState(res, res.hid));
      dispatch(showNotification("Hackathon created!"));
    })
    .catch(err => {
      dispatch(showError(`Failed to add hackathon: ${err.message}`));
    });
};

/**
 * Action for updating/editing a hackathon in the app. It sends the
 * new hackathon to the server to update it.
 *
 * @param hackathon The hackathon to update
 * @returns {Function} A redux-thunk function that fetchs from the server
 */
export const updateHackathon = hackathon => (dispatch, getState) => {
  const state = getState();
  return fetch(UPDATE_HACK_PATH, {
    method: "PUT",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hackathon.overview)
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      dispatch(updateHackathonOverviewInState(res, res.hid));
      dispatch(showNotification("Hackathon updated!"));
    })
    .catch(err => {
      dispatch(showError(`Failed to update hackathon: ${err.message}`));
    });
};
