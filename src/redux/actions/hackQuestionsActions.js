import {
  UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE,
  DELETE_HACKATHON_QUESTION_FROM_STATE,
  UPDATE_HACKATHON_QUESTION_OPTION_IN_STATE,
  DELETE_HACKATHON_QUESTION_OPTION_FROM_STATE
} from "./actionTypes";
import { convertQuestionsFromUIToServer } from "../util/questionsAdapter";
import fetch from "../fetchWithTimeout";
import {
  CREATE_HACK_QUESTIONS_PATH,
  getDeleteHackQuestionPath,
  getGetHackQuestionsPath,
  UPDATE_HACK_QUESTIONS_PATH,
  CREATE_HACK_Q_OPTION_PATH,
  UPDATE_HACK_Q_OPTION_PATH
} from "../apiPaths";
import { showError } from "./notificationActions";

/** Action for loading an array of questions into the app */
const updateHackathonQuestionsArrayInState = (questions, hid) => ({
  type: UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE,
  questions,
  hid
});

/** Action for deleting a hackathon question in the app */
const deleteHackathonQuestionFromState = (qid, hid) => ({
  type: DELETE_HACKATHON_QUESTION_FROM_STATE,
  qid,
  hid
});

/** Action for updating a hackathon question option */
const updateHackathonQuestionOptionInState = (option, oid, qid, hid) => ({
  type: UPDATE_HACKATHON_QUESTION_OPTION_IN_STATE,
  option,
  oid,
  qid,
  hid
});

/** Action for deleting a hackathon question option */
const deleteHackathonQuestionOptionFromState = (oid, qid, hid) => ({
  type: DELETE_HACKATHON_QUESTION_OPTION_FROM_STATE,
  oid,
  qid,
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

/**
 * Action for updating an array of questions that already exist in the
 * database.
 *
 * @param questions {Array} The questions to update
 * @param hid {String} The id of the hackathon to update questions for
 */
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

const deleteHackathonQuestion = (qid, hid) => (dispatch, getState) => {
  const state = getState();
  return fetch(getDeleteHackQuestionPath(qid), {
    method: "DELETE",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      dispatch(deleteHackathonQuestionFromState(qid, hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to delete question: ${err.message}`));
    });
};

const createHackathonQuestionOption = (option, qid, hid) => (
  dispatch,
  getState
) => {
  const state = getState();
  return fetch(CREATE_HACK_Q_OPTION_PATH, {
    method: "POST",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...option, qid })
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      dispatch(updateHackathonQuestionOptionInState(res, res.oid, qid, hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to create option: ${err.message}`));
    });
};

const updateHackathonQuestionOption = (option, qid, hid) => (
  dispatch,
  getState
) => {
  const state = getState();
  return fetch(UPDATE_HACK_Q_OPTION_PATH, {
    method: "PUT",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(option)
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(res => {
      dispatch(
        updateHackathonQuestionOptionInState(res, option.oid, qid, hid)
      );
    })
    .catch(err => {
      dispatch(showError(`Failed to update option: ${err.message}`));
    });
};

const deleteHackathonQuestionOption = (oid, qid, hid) => (
  dispatch,
  getState
) => {
  dispatch(deleteHackathonQuestionOptionFromState(oid, qid, hid));
  console.log("DELETING AN OPTION");
};

const updateAllHackathonQuestionOptions = (options, qid, hid) => (
  dispatch,
  getState
) => {
  const state = getState();
  const storedOptions = state.hackathons.byHID[hid].questions[qid].options;

  const toDelete = new Set(Object.keys(storedOptions));
  options.forEach(item => {
    // If the option existed before, it's a potential update
    if (item.oid) {
      // We don't want to delete this one
      toDelete.delete(item.oid);
      // Check if it has changed
      if (JSON.stringify(item) !== JSON.stringify(storedOptions[item.oid]))
        dispatch(updateHackathonQuestionOption(item, qid, hid));
    } else {
      // Otherwise, create the option
      dispatch(createHackathonQuestionOption(item, qid, hid));
    }
  });
  toDelete.forEach(oid =>
    dispatch(deleteHackathonQuestionOption(oid, qid, hid))
  );
};

export const updateAllHackathonQuestions = (questions, hid) => (
  dispatch,
  getState
) => {
  const state = getState();
  const storedQuestions = state.hackathons.byHID[hid].questions;
  // Get the questions in the correct format for the server
  questions = convertQuestionsFromUIToServer(questions);

  // Find all the questions that need to be updated/created/deleted
  const qToDelete = new Set(Object.keys(storedQuestions));
  const qToUpdate = [];
  const qToCreate = [];
  questions.forEach(item => {
    // If the question existed before, it's a potential update
    if (item.qid) {
      // Remove this from qToDelete
      qToDelete.delete(item.qid);
      // Check if it has changed (excluding options, we do that separately)
      if (
        JSON.stringify({ ...item, options: [] }) !==
        JSON.stringify({ ...storedQuestions[item.qid], options: [] })
      )
        qToUpdate.push({ ...item, options: [] }); // remove options from it
      // Now, update the options appropriately
      dispatch(updateAllHackathonQuestionOptions(item.options, item.qid, hid));
    } else {
      // The question did not exist so we need to create it
      // We don't need to remove the options in this case,
      // since they'll get created with the request
      qToCreate.push(item);
    }
  });
  dispatch(updateHackathonQuestions(qToUpdate, hid));
  dispatch(createHackathonQuestions(qToCreate, hid));
  qToDelete.forEach(qid => dispatch(deleteHackathonQuestion(qid, hid)));
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
