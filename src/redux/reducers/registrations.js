import {
  UPDATE_REGISTRATION_IN_STATE,
  DELETE_REGISTRATION_FROM_STATE
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
    case UPDATE_REGISTRATION_IN_STATE:
      return {
        byHID: {
          ...state.byHID,
          [action.hid]: action.registration
        }
      };
    case DELETE_REGISTRATION_FROM_STATE:
      const byHID = state.byHID;
      delete byHID[action.hid];
      return { byHID };
    default:
      return state;
  }
}
