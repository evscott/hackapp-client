import { DELETE_HACKATHON_FROM_STATE } from "./actionTypes";
import fetch from "../fetchWithTimeout";
import { getDeleteHackPath } from "../apiPaths";
import { showError, showNotification } from "./notificationActions";
import { createHackathonOverview } from "./hackOverviewActions";
import { createHackathonDetails } from "./hackDetailsActions";
import { createHackathonQuestions } from "./hackQuestionsActions";

/** Action for deleting a hackathon from the app */
const deleteHackathonFromState = hid => ({
  type: DELETE_HACKATHON_FROM_STATE,
  hid
});

/**
 * Action for creating a hackathon and sending it to the server.
 *
 * @param hackathon The hackathon to create
 */
export const createHackathon = hackathon => (dispatch, getState) => {
  dispatch(createHackathonOverview(hackathon.overview)).then(hid => {
    if(!hid) return;
    console.log(`Currently creating a hackathon, got hid ${hid}`);
    dispatch(createHackathonDetails(hackathon.details, hid));
    dispatch(createHackathonQuestions(hackathon.questions, hid));
  });
};

/**
 * Action for deleting a hackathon permanently from the server.
 *
 * @param hid The id of the hackathon to delete
 */
export const deleteHackathon = hid => (dispatch, getState) => {
  const state = getState();
  return fetch(getDeleteHackPath(hid), {
    method: "DELETE",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      dispatch(deleteHackathonFromState(hid));
      dispatch(showNotification("Hackathon deleted!"));
    })
    .catch(err => {
      dispatch(showError(`Failed to delete hackathon: ${err.message}`));
    });
};
