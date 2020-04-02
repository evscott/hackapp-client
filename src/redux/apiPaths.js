/** The path for authenticating a user */
export const AUTH_PATH = `${process.env.REACT_APP_API_ADDRESS}/auth/`;
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
export const CREATE_HACK_QUESTIONS_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/reg/quest/`;
/** The path for getting an array of hackathon questions */
export const getGetHackQuestionsPath = hid => `${process.env.REACT_APP_API_ADDRESS}/hacks/reg/search?hid=${hid}`;
/** The path for updating an array of hackathon questions */
export const UPDATE_HACK_QUESTIONS_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/reg/quest/`;
/** The path for deleting a question for a hackathon */
export const getDeleteHackQuestionPath = qid => `${process.env.REACT_APP_API_ADDRESS}/a/hacks/reg/quest/search?qid=${qid}`;

/** The path for creating an option for a hackathon question */
export const CREATE_HACK_Q_OPTION_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/reg/opt/`;
/** The path for updating an option for a hackathon question */
export const UPDATE_HACK_Q_OPTION_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/reg/opt/`;
/** The path for deleting an option for a hackathon question */
export const getDeleteHackQOptionPath = oid => `${process.env.REACT_APP_API_ADDRESS}/a/hacks/reg/opt/search?oid=${oid}`;

/** The path for publishing a hackathon */
export const PUBLISH_HACK_PATH = `${process.env.REACT_APP_API_ADDRESS}/a/hacks/pub/`;
