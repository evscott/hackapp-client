import { UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE } from "./actionTypes";
import {
  convertQuestionsFromServerToRedux,
  convertQuestionsFromUIToServer
} from "../util/questionsAdapter";
import fetch from "../fetchWithTimeout";
import {
  CREATE_HACK_QUESTIONS_PATH,
  getGetHackQuestionsPath, UPDATE_HACK_QUESTIONS_PATH
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
      dispatch(updateHackathonQuestionsArrayInState(res, hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to create questions: ${err.message}`));
    });
};

const updateHackathonQuestions = (questions, hid) => (dispatch, getState) => {
  const state = getState();
  return fetch(UPDATE_HACK_QUESTIONS_PATH, {
    method: "PUT",
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
      dispatch(updateHackathonQuestionsArrayInState(res, hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to update questions: ${err.message}`));
    });
};

const deleteHackathonQuestion = (question, hid) => (dispatch, getState) => {

};

const createHackathonQuestionOption = (option, qid, hid) => (dispatch, getState) => {

};

const updateHackathonQuestionOption = (option, qid, hid) => (dispatch, getState) => {

};

const deleteHackathonQuestionOption = (option, qid, hid) => (dispatch, getState) => {

};

export const updateAllHackathonQuestions = (questions, hid) => (dispatch, getState) => {
  const state = getState();
  const storedQuestions = state.hackathons.byHID[hid].questions;
  console.log(storedQuestions);
  // Get the questions in the correct format for the server
  questions = convertQuestionsFromUIToServer(questions);
  console.log(questions);

  // Find all the questions that need to be updated/created/deleted
  const qToDelete = new Set(Object.keys(storedQuestions));
  const qToUpdate = [];
  const qToCreate = [];
  questions.forEach(item => {
    // If the question existed before, it's a potential update
    if (item.qid) {
      // Remove this from qToDelete
      qToDelete.delete(item.qid);
      const options = item.options;
      delete item[options]; // Don't consider the options in our comparison
      // If the detail has been changed, update the server
      if (JSON.stringify(item) !== JSON.stringify(storedQuestions[item.qid]))
        qToUpdate.push(item);
    } else {
      // The question did not exist so we need to create it
      // We don't need to remove the options in this case,
      // since they'll get created
      qToCreate.push(item);
    }
  });
  dispatch(updateHackathonQuestions(qToUpdate, hid));
  dispatch(createHackathonQuestions(qToCreate, hid));
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
      dispatch(updateHackathonQuestionsArrayInState(res, hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to get questions: ${err.message}`));
    });
};
