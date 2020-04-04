import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE, UPDATE_USER_IN_STATE } from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 */
const initialState = {
  loggedIn: true,
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkM2QxNGZkNC03NmFiLTExZWEtOGQ3MS0wMjQyYWMxMjAwMDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTg2MDMxMzUyLCJleHAiOjE1ODYwNzQ1NTJ9.brCEGPQM-iWY-ruajV6BstMUWdrcUlcA6Vqn2yNpKk_5ELOxHPxunxjQ5WdJujumGIbuXj2BVWsAwI7bItGbPMKlYhcpTwjonV8A1rzrXB-1KgRS6CvC65N8DF6shkLy6zvww_cTjCIY4r6Mzk7xF94oThzzVqGjfJbUzSMx2Ev8LcsfbSPT-TmRaE3REU33G-CoKWtXtwuMq0joVD3-DQx_P5C-bZGyzXbYN1JNd4RX69FffofyIh0Jzv3NyBw0RMTz31s4zLQhyNOavKQqbdfqMEW9Wc_lMGjwvqLMxV1fGNZto6oyl6z7qGh1POlTDPH72WJ01Z_RYiaB6Rv5XNX93MNzFDnEuxFr2jbm6tHn8G3c0QFG276SaUpWQHoc6aARqVccYdjOAup0pHmGUo4YUxUxtvCK9AoYuFIU47QrDFmWIoL9kSwl5dxQQiF5R9c3XLLI_tg1DXFPwiLo2MwPGkg1qa_Kfd_fliwH8Ip6L70Lf1FDHMLs1JiM61YtApKL2N39pbsEDyEt4LWnNaes0GMfMU-BS5wvUu52kvqVMeQUvgKwaFWexILZcZmNqQTitsTM_kD4CbOEaAOv6d0Fi9PMDUrzNr6bu1yJyRIAEq5tiyiV47-1iYsv_edsoLn38CygT3pYFVBraxRnMC53llSPLhUs0lj_BVjNp4U",
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
    case UPDATE_USER_IN_STATE:
      return { ...state, user: action.user };
    case REMOVE_USER_FROM_STATE:
      return { loggedIn: false };
    default:
      return state;
  }
}
