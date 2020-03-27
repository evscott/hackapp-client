import { ADD_USER_TO_STATE, REMOVE_USER_FROM_STATE } from "../actions/actionTypes";

/**
 * The initial state for this branch of the redux store containing
 * the user information (for the logged in user).
 */
const initialState = {
  loggedIn: true,
  token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2YmM1YTFiNi03MDUxLTExZWEtYWIwYy0wMjQyYWMxNDAwMDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTg1MzMyNzA4LCJleHAiOjE1ODUzNzU5MDh9.PNVcaHJ9oagRcruPpPSlioz-pWJ5sjdSpV8WyvTCHDf-JCZ-rV24bxjLNgT2CcZbJRBG6dvoC7N0da9yVsLgeeWk69NsZmvM7BieThSQ5CS5MJqpSyjjSzJ6_puylBO1WEGFTB4Z8DhPeP5BX3rBJwUfZObTNQuDdyR31Tl-fqlyU0JpwttlxSun3PwVNULPaLxXJYDwBwMprL6WwUbcTPuIpgwN8PPBDEYguUWAnxx8kBgbjtr-iLMGbnu5KAzhKdmWUKwptZrIjgF7jKeiOyHun6E4BTc7T0Fz8IAeC28JlI3o9DEfXi2sGmQSynxru1TCkyZWS5MGf_9tDx526wwS1OjJBkZF08_B8s60qQD756YJD94jPzb-YUsVSLKspzxtRzR93r3gUvgF4lXLBaxYygAwCXcmQHp3URHRxPiEBKYjr498kHmyrvN8sr-O2u3MlU2g-1xZBQRi6pdiZIqDrkK6MUEoKVJXJP2DolFOgf5U4zWApyyk8ByFg-eUWcTNZW7Phl2paX4d_xic0s7b8migu0i5xL3RsTcYeOUedwLt2fuHaFvFZCA0OgcEZ4f5qVAK8nGAIbUopq8PyLWfvQxzqmRP1uEPLa7vdw5piJRsV6VaFghfo5_jPUqhEABG_vGgYzNqx7XpbWnoAmB8pnmuLwgcDSJ1WofLMJU",
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
