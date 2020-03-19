import { combineReducers } from "redux";
import hackathons from "./hackathons";
import user from "./user";

/** Combines all of the Redux reducers into a single state tree */
export default combineReducers({ hackathons, user });
