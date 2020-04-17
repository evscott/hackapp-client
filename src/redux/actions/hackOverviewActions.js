import {
  ADD_HACKATHON_OVERVIEWS_TO_STATE,
  UPDATE_HACKATHON_OVERVIEW_IN_STATE
} from "./actionTypes";
import {
  CREATE_NEW_HACK_OVERVIEW_PATH,
  GET_ALL_HACKS_PATH,
  UPDATE_HACK_OVERVIEW_PATH
} from "../apiPaths";
import fetch from "../fetchWithTimeout";
import { showError, showNotification } from "./notificationActions";
import { convertOverview } from "../util/dateConverter";

/** Action for loading an array of hackathon overviews into the app */
const addHackathonOverviewsToState = overviews => ({
  type: ADD_HACKATHON_OVERVIEWS_TO_STATE,
  overviews
});

/** Action for updating a hackathon overview in the app */
const updateHackathonOverviewInState = (overview, hid) => ({
  type: UPDATE_HACKATHON_OVERVIEW_IN_STATE,
  overview,
  hid
});

/**
 * Action for loading in all hackathon overviews from the server.
 */
export const getHackathonOverviews = () => dispatch => {
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
      const overviews = res.map(item => ({
        overview: convertOverview(item),
        hid: item.hid
      }));
      dispatch(addHackathonOverviewsToState(overviews));
    })
    .catch(err => {
      dispatch(showError(`Failed to get hackathons: ${err.message}`));
    });
};

/**
 * Action for adding a hackathon's overview to the app. It does a
 * POST request to the server to create a new hackathon overview.
 * This should typically only be done within the createHackathon
 * action (in hackathonActions).
 *
 * @param overview The overview to add
 */
export const createHackathonOverview = overview => (dispatch, getState) => {
  const state = getState();
  // First, add the overview.
  return fetch(CREATE_NEW_HACK_OVERVIEW_PATH, {
    method: "POST",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(overview)
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      res = convertOverview(res);
      dispatch(updateHackathonOverviewInState(res, res.hid));
      dispatch(showNotification("Hackathon created!"));
      return res.hid; // Pass on the hid if all is well
    })
    .catch(err => {
      dispatch(showError(`Failed to create hackathon: ${err.message}`));
    });
};

/**
 * Action for updating/editing a hackathon in the app. It sends the
 * new hackathon to the server to update it.
 *
 * @param overview The overview of the hackathon to update
 */
export const updateHackathonOverview = overview => (dispatch, getState) => {
  const state = getState();
  return fetch(UPDATE_HACK_OVERVIEW_PATH, {
    method: "PUT",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(overview)
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      res = convertOverview(res);
      dispatch(updateHackathonOverviewInState(res, res.hid));
      dispatch(showNotification("Hackathon updated!"));
    })
    .catch(err => {
      dispatch(showError(`Failed to update hackathon: ${err.message}`));
    });
};
