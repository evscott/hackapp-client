import { combineReducers } from "redux";
import hackathons from "./hackathons";
import user from "./user";
import registrations from "./registrations";
import notifications from "./notifications"

/** Combines all of the Redux reducers into a single state tree */
export default combineReducers({ hackathons, user, registrations, notifications });
