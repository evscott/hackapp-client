import {
  DELETE_HACKATHON_FROM_STATE,
  SET_HACKATHON_DRAFT_IN_STATE
} from "./actionTypes";
import fetch from "../fetchWithTimeout";
import { getDeleteHackPath, PUBLISH_HACK_PATH } from "../apiPaths";
import { showError, showNotification } from "./notificationActions";
import { createHackathonOverview } from "./hackOverviewActions";
import { createHackathonDetails } from "./hackDetailsActions";
import { createHackathonQuestions } from "./hackQuestionsActions";
import { convertDetailsFromUIToServer } from "../util/detailsAdapter";
import { convertQuestionsFromUIToServer } from "../util/questionsAdapter";

/** Action for setting the draft property of a hackathon in the state */
const setHackathonDraftInState = (hid, draft) => ({
  type: SET_HACKATHON_DRAFT_IN_STATE,
  hid,
  draft
});

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
export const createHackathon = hackathon => dispatch => {
  return dispatch(createHackathonOverview(hackathon.overview)).then(hid => {
    if (!hid) return undefined;
    const details = convertDetailsFromUIToServer(hackathon.details);
    const questions = convertQuestionsFromUIToServer(hackathon.questions, hid);
    dispatch(createHackathonDetails(details, hid));
    dispatch(createHackathonQuestions(questions, hid));
    return hid;
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

/**
 * Action for publishing or unpublishing a hackathon based on the draft
 * property.
 *
 * @param hid {String} The hackathon to publish/unpublish
 * @param draft {Boolean} If draft is false, it publishes; otherwise, it
 * unpublishes.
 */
export const publishHackathon = (hid, draft) => (dispatch, getState) => {
  const state = getState();
  return fetch(PUBLISH_HACK_PATH, {
    method: "PUT",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ hid })
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      dispatch(setHackathonDraftInState(hid, draft));
      const publishText = draft ? "unpublished" : "published";
      dispatch(showNotification(`Hackathon ${publishText}!`));
    })
    .catch(err => {
      const publishText = draft ? "unpublish" : "publish";
      dispatch(showError(`Failed to ${publishText} hackathon: ${err.message}`));
    });
};

/**
 * Action for creating a new hackathon and publishing it immediately after.
 *
 * @param hackathon {Object} The hackathon to create
 */
export const createPublishedHackathon = hackathon => dispatch => {
  dispatch(createHackathon(hackathon)).then(hid => {
    if (hid) dispatch(publishHackathon(hid, false));
  });
};
