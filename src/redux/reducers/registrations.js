import {
  ADD_REGISTRATION,
  DELETE_REGISTRATION,
  UPDATE_REGISTRATION
} from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store. Initially,
 * it has no registrations for any hackathon.
 */
const initialState = {
  byHID: {}
};

/**
 * Reducer for the registrations branch of the Redux state tree. It
 * accepts actions that register a user for a hackathon, update the
 * registration, and deleting the registration.
 * @param state The user's current registrations
 * @param action The action to perform (add/update/delete)
 */
export default function registrations(state = initialState, action) {
  switch (action.type) {
    case ADD_REGISTRATION:
      return {
        byHID: {
          ...state.byHID,
          [action.hid]: action.registration
        }
      };
    case UPDATE_REGISTRATION:
      return {
        byHID: {
          ...state.byHID,
          [action.hid]: action.registration
        }
      };
    case DELETE_REGISTRATION:
      const byHID = state.byHID;
      delete byHID[action.hid];
      return { byHID };
    default:
      return state;
  }
}
