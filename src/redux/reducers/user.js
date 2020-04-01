import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE } from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 */
const initialState = {
  loggedIn: true,
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0MzA3YjVhNi03NDE3LTExZWEtYTZiMi0wMjQyYWMxMjAwMDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTg1NzQ2MTI5LCJleHAiOjE1ODU3ODkzMjl9.asKxIB_4y04RZIiOWNY4bf-XiPsLvkXxmWpNuJPwKyvq9bFparvIJ2-sWb5OUjcTN7T3_3DhkteGYLBdjni8rYfka0PUipqtNjE9WyDiSoN5Wxg77B18kGU7ACwe_EhOyCYwtrRIdheA6gpePFOF6iq59DEAOQknfBKQPr89KfsXjOyMS5CKB82ZMtqbPWM0sbnqaFiu8Gyiot9veHmX1M-0VV6bqSVQr87eskPw3aO4g6qVYG64nG7k5Z9UWYhoK2GBEZbhG69W28Cj4smi8RIv3bCnFrvkI_5WJcIfTMIi3vMpG32UNqqxTZ8X6BaTdmsVohGtSo80HEKRjWrn2z0cErIKCO5fwPNBiyR5Ov2tRx02w_gvRdnvdVyFQlDOYvEsYOnKHkOPmG3Fc1HQRVo14jtKs3MoFByEUKlCAvkH0O6PWAd9g0Z5542R_FLM-nygWKVASXnDnI-OJsg-tt2i-ZMjjIPtwOsXNjqB0pG5LAqfMkZWow1Yml3PRgVvZLTwKZiEMtOpj_8-dJGRjXI1Upv5qZjbYfkeRD1aqnvj1QK4UMK2DeCimh0BM81CpsR_o0wITchT7oHIHVcpWkZ3rVi9zq3xH9nEV7-Ld8GH2FrOYaIk3XNZJBrMpINr3aS1F-j5Geek1ex0edeS254jWvUTrhmkfhAMALFfqEI",
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
    case REMOVE_USER_FROM_STATE:
      return { loggedIn: false };
    default:
      return state;
  }
}
