import {
  ADD_USER_TO_STATE,
  REMOVE_USER_FROM_STATE,
  UPDATE_USER_IN_STATE
} from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 */
const initialState = {
  loggedIn: false
  // When logged in, we also have the below properties:
  // token: "some token",
  // user: {
  //   uid: "some id",
  //   firstName: "some name",
  //   lastName: "some name",
  //   email: "some email",
  //   admin: true
  // }
};

/**
 * Reducer for the user branch of the Redux state tree. It accepts actions that
 * change user information and modifies the state to accommodate.
 *
 * @param state The currently signed in user
 * @param action The action to perform on the data
 */
export default function user(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_TO_STATE:
      return { loggedIn: true, user: action.user, token: action.token };
    case UPDATE_USER_IN_STATE:
      return { ...state, user: { admin: state.user.admin, ...action.user } };
    case REMOVE_USER_FROM_STATE:
      return { loggedIn: false };
    default:
      return state;
  }
}
