import { SIGNIN_USER, SIGNOUT_USER } from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 *
 * @TODO: remove the temporary example user
 */
const initialState = {
  loggedIn: true,
  uid: 0,
  firstName: "Graeme",
  lastName: "Zinck",
  email: "graeme@zinck.com",
  admin: true
};

/**
 * Reducer for the user branch of the Redux state tree. It accepts actions that
 * change user information and modifies the state to accommodate.
 * @param state The currently signed in user
 * @param action The action to perform on the data
 */
export default function user(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return action.user;
    case SIGNOUT_USER:
      return { loggedIn: false };
    default:
      return state;
  }
}
