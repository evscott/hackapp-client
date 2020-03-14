import {
  ADD_HACKATHON,
  UPDATE_HACKATHON,
  DELETE_HACKATHON
} from "./actionTypes";

export const addHackathon = hackathon => ({
  type: ADD_HACKATHON,
  hackathon
});

export const updateHackathon = hackathon => ({
  type: UPDATE_HACKATHON,
  hackathon
});

export const deleteHackathon = hid => ({
  type: DELETE_HACKATHON,
  hid
});
