/** The path for authenticating a user */
export const AUTH_PATH = `${process.env.REACT_APP_API_ADDRESS}/auth/`;
/** The path for updating a user */
export const UPDATE_USER_PATH = `${process.env.REACT_APP_API_ADDRESS}/u/users`;

/** The path for creating an organization */
export const CREATE_ORG_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/org/`;
/** The path for getting an organization */
export const GET_ORG_PATH = `${process.env.REACT_APP_API_ADDRESS}/org/`;

/** The path for getting all hackathons */
export const GET_ALL_HACKS_PATH = `${process.env.REACT_APP_API_ADDRESS}/hacks/ov/`;

/** The path for creating a new hackathon and its overview */
export const CREATE_NEW_HACK_OVERVIEW_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/`;
/** The path for updating a hackathon */
export const UPDATE_HACK_OVERVIEW_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/`;
/** The path for deleting a hackathon */
export const getDeleteHackPath = hid => `${process.env.REACT_APP_API_ADDRESS}/a/hacks/search?hid=${hid}`;

/** The path for creating an array of hackathon details */
export const CREATE_HACK_DETAILS_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/det/`;
/** The path for updating a hackathon detail */
export const UPDATE_HACK_DETAILS_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/det/`;
/** The path for getting an array of hackathon details */
export const getGetHackDetailsPath = hid => `${process.env.REACT_APP_API_ADDRESS}/hacks/det/search?hid=${hid}`;
/** The path for deleting a detail for a hackathon */
export const getDeleteHackDetailPath = did => `${process.env.REACT_APP_API_ADDRESS}/a/hacks/det/search?did=${did}`;

/** The path for creating an array of hackathon questions */
export const CREATE_HACK_QUESTIONS_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/reg/`;
/** The path for getting an array of hackathon questions */
export const getGetHackQuestionsPath = hid => `${process.env.REACT_APP_API_ADDRESS}/hacks/reg/search?hid=${hid}`;
/** The path for updating an array of hackathon questions */
export const UPDATE_HACK_QUESTIONS_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/reg/`;

/** The path for publishing a hackathon */
export const PUBLISH_HACK_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/pub/`;
