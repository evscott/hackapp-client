import {
  ADD_HACKATHON,
  UPDATE_HACKATHON,
  DELETE_HACKATHON
} from "./actionTypes";

/** Action for adding a hackathon to the app */
export const addHackathon = hackathon => ({
  type: ADD_HACKATHON,
  hackathon
});

/** Action for updating a hackathon in the app */
export const updateHackathon = hackathon => ({
  type: UPDATE_HACKATHON,
  hackathon
});

/** Action for deleting a hackathon from the app */
export const deleteHackathon = hid => ({
  type: DELETE_HACKATHON,
  hid
});
