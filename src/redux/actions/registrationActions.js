import {
  ADD_REGISTRATION,
  UPDATE_REGISTRATION,
  DELETE_REGISTRATION
} from "./actionTypes";

/** Action for registering a user for a hackathon */
export const addRegistration = (hid, registration) => ({
  type: ADD_REGISTRATION,
  hid,
  registration
});

/** Action for updating a user's registration for a hackathon */
export const updateRegistration = (hid, registration) => ({
  type: UPDATE_REGISTRATION,
  hid,
  registration
});

/** Action for deregistering a user from a hackathon */
export const deleteRegistration = hid => ({
  type: DELETE_REGISTRATION,
  hid
});
