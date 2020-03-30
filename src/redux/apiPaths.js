/** The path for authenticating a user */
export const AUTH_PATH = `${process.env.REACT_APP_API_ADDRESS}/auth/`;
/** The path for getting all hackathons */
export const GET_ALL_HACKS_PATH = `${process.env.REACT_APP_API_ADDRESS}/hacks/ov/`;
/** The path for creating a new hackathon */
export const CREATE_NEW_HACK_OVERVIEW_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/`;
/** The path for updating a hackathon */
export const UPDATE_HACK_OVERVIEW_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/`;
/** The path for deleting a hackathon */
export const getDeleteHackPath = hid =>
         `${process.env.REACT_APP_API_ADDRESS}/a/hacks/${hid}/`;
