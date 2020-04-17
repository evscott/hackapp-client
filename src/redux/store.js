import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

// Allow functional actions using redux-thunk
const middleware = [thunk];
// Add logging if we're not in production
if (process.env.NODE_ENV !== "production") middleware.push(createLogger());
const store = createStore(rootReducer, applyMiddleware(...middleware));

/** Creates a Redux store with an empty state tree */
export default store;
