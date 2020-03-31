import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE } from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 */
const initialState = {
  loggedIn: true,
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyMmIyMmQ3YS03MzNkLTExZWEtYWM0Yy0wMjQyYWMxMjAwMDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTg1NjUxODYxLCJleHAiOjE1ODU2OTUwNjF9.J-_fyIltfTT7p5FRgcub99dMlsxbuWVFOGFdgSSLgCMuB_hZ6Frh5gPh13Odkg1ieSx55CocYaEV5sKpV_0Uujc3VH9-MEOcPPbkoi7SXqqk42WhmBnBFXjPsFy75by9B-dd3N1e79pQ12t2qRkf8jNdhgBMI6Zh7Vm1B1j_kDfsepYpGikNhHucmLoksZiymc2btEw7gXEfY7yLhuMwe_ROaJ4GrJxS96BaMX0VhJNHct8uH8mcsgM2CzDAWK9wjqOpOjHDxDEUKclTSDnj9InhvpHP2qoXLzJXqHFV2c4Q0Q5zvW54lCK3_JTJybs0DGejAKG0CQ6QcvBRbmv41ocWvKGm-kqcCcs2vkdxzhCA3jhzDnk2sQA_A6I7dlyTzx1ot57cxtFBumquoANVwIkOsqPPDHRCmAGmksrgyMF-qD54FsUfMrPspRceuLMKWPFHXioKHAzr6oGRW3Rp7wO4Tats_YbmNPIsO-Qy83HBzdcT4NDVNVhli9-upU46fS0RailX4brYaGhDk7AVwmiXrTG2MkTY9-0ydEaTlC62lkI90iVO84fh4UjFoW98MdX6KWislaqIr2qZXiBOZS_5J2gWOBwBHeX2f1ocQQMXbLh1vl0mZmZvxRhLsX9WvJqNBv70n773eoFK_V5-hfkiNUVwVoB8EeogMHZYiXI",
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
