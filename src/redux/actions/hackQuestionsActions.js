import { UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE } from "./actionTypes";
import {
  convertQuestionsFromServerToRedux,
  convertQuestionsFromUIToServer
} from "../util/questionsAdapter";
import fetch from "../fetchWithTimeout";
import {
  CREATE_HACK_QUESTIONS_PATH,
  getGetHackQuestionsPath
} from "../apiPaths";
import { showError } from "./notificationActions";

/** Action for loading an array of questions into the app */
const updateHackathonQuestionsArrayInState = (questions, hid) => ({
  type: UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE,
  questions,
  hid
});

/**
 * Action for creating an array of hackathon questions.
 * Note: make sure to call convertDetailsFromUIToServer on
 * questions beforehand if you're creating an all-new
 * hackathon.
 *
 * @param questions {Array} Question objects
 * @param hid {String} The id of the hackathon to add questions to
 */
export const createHackathonQuestions = (questions, hid) => (
  dispatch,
  getState
) => {
  const state = getState();
  return fetch(CREATE_HACK_QUESTIONS_PATH, {
    method: "POST",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ questions, hid })
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      // Get the new array of questions that we'll need
      const newQuestions = convertQuestionsFromServerToRedux(
        res,
        state.hackathons.byHID[hid].questions
      );
      // Update in the store!
      dispatch(updateHackathonQuestionsArrayInState(newQuestions, hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to update questions: ${err.message}`));
    });
};

/**
 * Action for getting the array of questions for a hackathon from
 * the server
 *
 * @param hid {String} The id of the hackathon to get questions for
 */
export const getHackathonQuestions = hid => dispatch => {
  return fetch(getGetHackQuestionsPath(hid), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      const newQuestions = convertQuestionsFromServerToRedux(res);
      dispatch(updateHackathonQuestionsArrayInState(newQuestions, hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to get questions: ${err.message}`));
    });
};
