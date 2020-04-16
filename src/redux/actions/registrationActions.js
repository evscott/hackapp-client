import {
  DELETE_REGISTRATION_FROM_STATE,
  UPDATE_REGISTRATION_IN_STATE
} from "./actionTypes";
import DayJS from "dayjs";
import fetch from "../fetchWithTimeout";
import {
  CREATE_REG_ANSWERS_PATH,
  UPDATE_REG_ANSWERS_PATH,
  getGetRegAnswersPath,
  getGetRegCSVPath,
  getDeleteRegPath
} from "../apiPaths";
import { showError, showNotification } from "./notificationActions";
import {
  convertAnswersFromServerToRedux,
  convertAnswersFromUIToServer
} from "../util/answerAdapter";

/** Action for updating a user's registration info in the state */
export const updateRegistrationInState = (hid, registration) => ({
  type: UPDATE_REGISTRATION_IN_STATE,
  hid,
  registration
});

/** Action for deregistering a user from a hackathon */
export const deleteRegistrationInState = hid => ({
  type: DELETE_REGISTRATION_FROM_STATE,
  hid
});

/**
 * Updates the user's registration answers by comparing the answers
 * with answers already in the database. Then, it sends these updates
 * to the server and updates the answers locally.
 *
 * @param hid {String} The id for the hackathon
 * @param answers {Array} The array of answers from the UI
 */
export const updateRegistration = (hid, answers) => (dispatch, getState) => {
  const state = getState();
  const oldAnswers = state.registrations.byHID[hid];
  answers = convertAnswersFromUIToServer(answers);
  // Get a list of all aids to delete
  const toDelete = new Set();
  const toCreate = [];
  const toUpdate = [];
  Object.values(oldAnswers).forEach(question => {
    Object.values(question).forEach(ans => {
      toDelete.add(ans.aid);
    });
  });
  // Now, cycle through all of the questions to update
  answers.forEach(ans => {
    // Check if it's a create, update, or neither
    if (ans.answer !== null) {
      // Find the old one
      const oldAns = (oldAnswers[ans.qid] || {}).answer;
      if (oldAns === undefined) {
        // Then, create!
        toCreate.push(ans);
      } else {
        toDelete.delete(oldAns.aid); // Don't delete it!
        if (oldAns.answer !== ans.answer) {
          // Then, update!
          ans.aid = oldAns.aid;
          toUpdate.push(ans);
        }
      }
    } else if (ans.oid !== null) {
      // Find the old one
      const oldAns = (oldAnswers[ans.qid] || {})[ans.oid];
      if (oldAns === undefined) toCreate.push(ans);
      else toDelete.delete(oldAns.aid);
    }
  });

  return fetch(UPDATE_REG_ANSWERS_PATH, {
    method: "PUT",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      answersToBeCreated: toCreate,
      answersToBeUpdated: toUpdate,
      answersToBeDeleted: [...toDelete]
    })
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      dispatch(getRegistration(hid));
      dispatch(showNotification("Registration updated!"));
    })
    .catch(err => {
      dispatch(showError(`Failed to update registration: ${err.message}`));
    });
};

/**
 * Adds a new registration for a user.
 * @param hid {String} The id for the hackathon
 * @param answers {Array} The answers to the registration questions
 */
export const addRegistration = (hid, answers) => (dispatch, getState) => {
  answers = convertAnswersFromUIToServer(answers);
  const state = getState();
  return fetch(CREATE_REG_ANSWERS_PATH, {
    method: "POST",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ answers })
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      const reduxAnswers = convertAnswersFromServerToRedux(res);
      dispatch(updateRegistrationInState(hid, reduxAnswers));
      dispatch(showNotification("Registration successful!"));
    })
    .catch(err => {
      dispatch(showError(`Registration failed: ${err.message}`));
    });
};

/**
 * Gets a user's registration for a hackathon from the server.
 *
 * @param hid {String} The hackathon for which to get the registration.
 */
export const getRegistration = hid => (dispatch, getState) => {
  const state = getState();
  return fetch(getGetRegAnswersPath(hid), {
    method: "GET",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      if (res.length > 0) {
        const reduxAnswers = convertAnswersFromServerToRedux(res);
        dispatch(updateRegistrationInState(hid, reduxAnswers));
      }
    })
    .catch(err => {
      dispatch(showError(`Failed to get registration: ${err.message}`));
    });
};

/**
 * Deletes a user's registration for a hackathon from the server.
 *
 * @param hid {String} The hackathon for which to remove the registration.
 */
export const deleteRegistration = hid => (dispatch, getState) => {
  const state = getState();
  return fetch(getDeleteRegPath(hid), {
    method: "DELETE",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      dispatch(showNotification("Registration cancelled."));
      dispatch(deleteRegistrationInState(hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to deregister: ${err.message}`));
    });
};

/**
 * Gets a CSV with the registrants for all hackathons. Only for admins.
 *
 * @param hid {String} The id for the hackathon to get registrants for.
 */
export const getCSV = hid => (dispatch, getState) => {
  const state = getState();
  return fetch(getGetRegCSVPath(hid), {
    method: "GET",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      // Download the file programmatically
      const linkToFile = document.createElement("a");
      const file = new Blob([res.csv], { type: "text/csv" });
      linkToFile.href = URL.createObjectURL(file);
      linkToFile.download = `${DayJS().format(
        "YYYY-MM-DD-HH:mm"
      )}-registration-${hid}.csv`;
      document.body.appendChild(linkToFile);
      linkToFile.click();
    })
    .catch(err => {
      dispatch(showError(`Failed to get CSV: ${err.message}`));
    });
};
