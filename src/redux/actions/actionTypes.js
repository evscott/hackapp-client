/** Updates the organization name in the state */
export const UPDATE_ORG_IN_STATE = "UPDATE_ORG_IN_STATE";
/** Indicates we're currently getting/updating org */
export const GETTING_ORG = "GETTING_ORG";
/** Indicates failed to get the organization name */
export const FAILURE_GET_ORG = "FAILURE_GET_ORG";

/** Action type for loading an array of hackathons to the app */
export const ADD_HACKATHON_OVERVIEWS_TO_STATE = "ADD_HACKATHON_OVERVIEWS_TO_STATE";
/** Action type for updating a hackathon's overview in the state */
export const UPDATE_HACKATHON_OVERVIEW_IN_STATE = "UPDATE_HACKATHON_OVERVIEW_IN_STATE";

/** Action type for updating a hackathon's details array in the state */
export const UPDATE_HACKATHON_DETAILS_ARRAY_IN_STATE = "UPDATE_HACKATHON_DETAILS_ARRAY_IN_STATE";
/** Action type for deleting a hackathon detail from the state */
export const DELETE_HACKATHON_DETAIL_IN_STATE = "DELETE_HACKATHON_DETAIL_IN_STATE";

/** Action type for updating a hackathon's questions array in the state */
export const UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE = "UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE";

/** Action type for deleting a hackathon */
export const DELETE_HACKATHON_FROM_STATE = "DELETE_HACKATHON_FROM_STATE";
/** Action type for setting whether a hackathon is a draft in the state */
export const SET_HACKATHON_DRAFT_IN_STATE = "SET_HACKATHON_DRAFT_IN_STATE";

/** Action type for adding user info in the app */
export const ADD_USER_TO_STATE = "ADD_USER_TO_STATE";
/** Action type for updating a user in the app */
export const UPDATE_USER_IN_STATE = "UPDATE_USER_IN_STATE";
/** Action type for removing user info from the app */
export const REMOVE_USER_FROM_STATE = "REMOVE_USER_FROM_STATE";

/** Action type for adding a user's registration info to the state */
export const UPDATE_REGISTRATION_IN_STATE = "UPDATE_REGISTRATION_IN_STATE";
/** Action type for removing a user's registration for a hackathon */
export const DELETE_REGISTRATION_FROM_STATE = "DELETE_REGISTRATION_FROM_STATE";

/** Action type for an error */
export const ERROR = "ERROR";
/** Action type for a notification */
export const NOTIFICATION = "NOTIFICATION";
/** Action type for dismissing notification */
export const DISMISS_NOTIFICATION = "DISMISS_NOTIFICATION";
