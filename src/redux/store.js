import { createStore } from "redux";
import rootReducer from "./reducers";

/** Creates a Redux store with an empty state tree */
export default createStore(rootReducer);
