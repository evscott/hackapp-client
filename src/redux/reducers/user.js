import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE, UPDATE_USER_IN_STATE } from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 */
const initialState = {
  loggedIn: true,
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmMzczYmI3Mi03OTAwLTExZWEtODVkYS0wMjQyYWMxMjAwMDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTg2Mjg1ODY4LCJleHAiOjE1ODYzMjkwNjh9.mswvsAAIKWM9wRB5AGc4kkIacghdbtB0260E-NGdFXhmIKjcyL3oMhtokU35T26b9e0aBAvshMYZbHsiBO2yW8IFgE3Tut42vntR-1ByV68gHt55BRTrp24K6supn1LejNQhO4CDupoiJgsKev3u9KgxvSHTE9FHh_N28Mu5zRyvpyFL84b1RGR_EzqM0Gf3-oytsDvYq5iRxrevLC36VcIbxf25PJ9JcZdpJamLa0sS4BbFdu6vcEXx9r1s_qfU9uoXQT4QTHkOhjOC4FH6NFaVui3DRlWd3CY15_BlNMWOqTX_SAlt3ZNGHDNzmRhW8NmDjyPqcuMPqtR1Yjtd1aA13fOfBoosUN5tUvXTYTrheZyzHc4yHVFiluOKRayeTeARBJFCEz2OUcjOgsDtwMY463J50qtofW5ykoKuIRfaxsAmtgAKCyF3_fRXfwzWJ6aCWCqvOJl_5tA1sG7Hh_bJQ5wbaRZ6MqzaflY3R2hIEQc94AaafZZIsC4_EQgDgIVWENHqgWIiuWH9LN8G-61xyRb1t_a4hOHU5GkeEoEmDmefqbVDNp7TZWIcZToWsfKX4mk44OW3qnnE0dOh8DbRY_cyycHywx42kkM1gbBWXnH4OSgFT-94bc6-Zr-sMzEhLOG4MvomO2yx6Ju0VAetjKN09ethpGVXgRm1_rw",
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
