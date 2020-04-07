import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE, UPDATE_USER_IN_STATE } from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 */
const initialState = {
  loggedIn: true,
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhNjgzZTVlNC03ODQyLTExZWEtOTdjYi0wMjQyYWMxMjAwMDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTg2MjAzODg3LCJleHAiOjE1ODYyNDcwODd9.P7KHXtsK79mocLHzZxV469opZ7zHIy6D9VxcTeSQOlu7GQuhp88dNHROaJYlwKxSIGl34pypEhAPW7r8opJAqYi8UvDxXLaJfRzmqlo-66NljDWfuC4qZkBTS42mTFSQW70NsYn4YzC0n4NNor9WxGtBPwjTOOuKLCfqs3NSGz3rO_DIParwqvjOpAn13fJRkeaaPrzKQ2optQjFApCslBZ1V2wiDpjakkCtBbTXL88uQ2DozgJVC__tJu0u1KLm5c6B4WpP0b3dTToTdgtibIUvWSlBOZYLdXvH2AMGaSHzz3GJcUA0H4-XhD9NgKl9uuMUiQmBDiBOrK_8wvs1RTZppSHuypHIYIx2PJpEocmV0W8QQupXwlhAT_vj7YO0J1vk1Qe10mULlnXh_fv_wKS21ivScxRUkv1SrN80lD218lEUaBqECLVbg9Xb4OZUQjbrd_sWfNgioLAOZqGYUZ1g4IL0bpIZbNfdsfTvx-wzbO4w6lLSxqc7OSQOrjv6_xNnYYi1Lq-S9LrLWnJethXj8CQ8lFAMLPg7yjxMQ6uj5ZUFujOnUyl65SbjC2cHK4x-XLu72zYbxCPMfxwCUFxkBSksqztpOlmEYkPiXCntTn-kfTBK3CQbXzyY7CwgnqjIdv8viRqDYxkX2lyAWirYj8vwNHM7_jFLtD3NjP8",
  user: {
    uid: "6bc5a1b6-7051-11ea-ab0c-0242ac140002",
    firstName: "admin",
    lastName: "admin",
    email: "admin",
    admin: false
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
    case UPDATE_USER_IN_STATE:
      return { ...state, user: action.user };
    case REMOVE_USER_FROM_STATE:
      return { loggedIn: false };
    default:
      return state;
  }
}
