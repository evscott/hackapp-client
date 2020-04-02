import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE } from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 */
const initialState = {
  loggedIn: true,
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0MTI3ZTdkNC03NDdhLTExZWEtODhmYi0wMjQyYWMxMjAwMDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTg1Nzg5NjU3LCJleHAiOjE1ODU4MzI4NTd9.LqHRjA5gYtsjRY4tMpltgUYuvftHWvY5Zajj1DrDo4Sw2ueVEJ504L9zNfrWgCFj3kA8vP4bul1zCqitctPh8X_I7XD2vYOSx_-3etTrmQmT7Re9wYvLqz_bXsncEKvaP4ta0ur09KiWYmoK_gkMBOfltlogtW2XObeARLW7HqTV9j3Irsl8LYOA5bQ8RnXpAbE80l9qJnSsp75QL1WN1jwzRfjOgOkFeQqgx4X-hhBzwuLeMWxxNTo_krPwB-4D_tS6YcAXeWt-uZxxxM2bqtZwzdjZTmSoO-SVHbLYoV1LYy4rQT-Xslx2DYCFv6a4mit3WI6Gi_hHMvsxly91WnNi0Ee0WFfltbGs5b_zyvOrG0riumjFopSaCo924otE_aEmBszM2oECXtjxU7tmWzIMM0Ay040kzpZtkQ7TZy4QH1c8BTx9lEF7If1peyvD43jgAoVQfT8eElkB9clJIn4CqEIa2Pb43wlzpqOcl6XRk3pys2D5VdG01xcYheDOXiGL8qekWop_qDYQ2uFwZAwpsOMF1aSIlSJUqLvftB3tAnLJkFj8hZd-3HZd8aacrOdfRhy9ap25VHmU_CtDP4G_GgW_yaB6NTIhm54IQPBtgZN3EHSC4eTB2N3xTqzbbaIM51hqCuSEtYWWqtTymfrmPopRxFr1lm5HbX0EXl4",
  user: {
    uid: "6bc5a1b6-7051-11ea-ab0c-0242ac140002",
    firstName: "admin",
    lastName: "admin",
    email: "admin",
    admin: true
  }
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
      return { loggedIn: true, user: action.user, token: action.token};
    case REMOVE_USER_FROM_STATE:
      return { loggedIn: false };
    default:
      return state;
  }
}
