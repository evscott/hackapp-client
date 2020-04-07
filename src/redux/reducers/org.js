import {
  UPDATE_ORG_IN_STATE,
  FAILURE_GET_ORG,
  GETTING_ORG
} from "../actions/actionTypes";

/** The initial state for this branch of the Redux store tree */
const initialState = {
  loading: true,
  name: undefined
};

/**
 * Reducer for the organization branch of the Redux state tree. It
 * accepts actions that modify the organization in the Redux store.
 *
 * @param state {Object} The organization currently stored
 * @param action {Object} The action with what to change in the store
 */
export default function org(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ORG_IN_STATE:
      return {
        loading: false,
        name: action.name
      };
    case GETTING_ORG:
      return {
        loading: true,
        name: undefined
      };
    case FAILURE_GET_ORG:
      return {
        loading: false,
        name: undefined
      };
    default:
      return state;
  }
}
