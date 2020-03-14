import { combineReducers } from "redux";
import hackathons from "./hackathons";

/** Combines all of the Redux reducers into a single state tree */
export default combineReducers({ hackathons });
