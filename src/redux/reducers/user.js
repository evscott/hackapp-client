import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE } from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 */
const initialState = {
  loggedIn: true,
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiNmE1ZDg3Ni03MmQyLTExZWEtYjJlNy0wMjQyYWMxMjAwMDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTg1NjA2MjMzLCJleHAiOjE1ODU2NDk0MzN9.LIm1pHVqpOMGshoLQaQm4fEf_aw8DCVTta4_EooXbYrVHJJHe0KKeCVmgNZdnM7j1coFO9ylLIdH41F6jjeo24TjPZ-QItvfd2SfV89TEouxfpfheTZ0twP5G1E-Mm40HclnXNUY3UUu8Y26jc_DsQ28NGX6yemBJ_fgyuWm3tGembYcXh4L9K6Z_rxwculkpXf61Go75OiQlg_-RtrdI6Rx8gTKfC-IDoYVlqn0SMN2ti7vKuxjsx3VMaaJT7CkahdhNos78J2MmbjJE9LoKzbVcG0vVx6QuEUqBoZVpz_DJkmyCt8f7iEB3nMJck2xHjnh_Sd_CHL_pqkFmeAFx8JFVCRws2lNPO-cqa1KhTGlqAAAKGxSm4VL7yhegwZzr4XsXGLpU2S5n8FElUDQBqK3H0bvYiUNzj57x50WfubnbQBx-Gu22eGXHzXOcxfZ6WQG1-wmgaiQGYAnGiQGXmQZwzDsKAVV_-1yO233rkfUC11oX_cVcYDOj5lEdY5GYK2VW2H1fUfimUT05waOKq6twa2DYTCUNKoVZoSssVeVRVD1xv2PsOlN9BG1KvfjJX4TLQjCerq0VO-Aif41gLlBJjpa9fUJUoJfBH31ZoxRLawIRTHhyDGz6xstIgCPcwiGVpPoqEarDbPmwwBG7Z9s5W6PN_Ty4i880dcoCGA",
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
