import {
  UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE
} from "./actionTypes";
import { convertQuestionsFromUIToServer } from "../util/questionsAdapter";
import fetch from "../fetchWithTimeout";
import {
  CREATE_HACK_QUESTIONS_PATH,
  getGetHackQuestionsPath,
  UPDATE_HACK_QUESTIONS_PATH
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

const getOptionsToUpdate = (options, storedOptions, qid) => {
  const toDelete = new Set(Object.keys(storedOptions));
  const toUpdate = [];
  const toCreate = [];
  options.forEach(item => {
    // If option previously existed, check if need to update
    if (item.oid) {
      toDelete.delete(item.oid); // Don't delete it
      // If it has changed
      if (JSON.stringify(item) !== JSON.stringify(storedOptions[item.oid]))
        toUpdate.push(item);
    } else {
      toCreate.push({ ...item, qid }); // Add qid to item to create it
    }
  });
  return { toDelete: [...toDelete], toUpdate, toCreate };
};

/**
 * Updates all hackathon questions for a given hackathon by creating/
 * updating/deleting questions accordingly to match the provided questions
 * object.
 *
 * @param questions {Array} The questions from the UI that need to be
 * present on the server (some may already exist; this function does all
 * the messy work with figuring out what questions and options need to be
 * created, updated, and deleted)
 * @param hid {String} The id for the hackathon to update questions for
 */
export const updateAllHackathonQuestions = (questions, hid) => (
  dispatch,
  getState
) => {
  const state = getState();
  const storedQuestions = state.hackathons.byHID[hid].questions;
  // Get the questions in the correct format for the server
  questions = convertQuestionsFromUIToServer(questions, hid);

  // Find everything that needs creating/updating/deleting
  const questionsToDelete = new Set(Object.keys(storedQuestions));
  const questionsToUpdate = [];
  const questionsToCreate = [];
  const optionsToDelete = [];
  const optionsToUpdate = [];
  const optionsToCreate = [];
  questions.forEach(item => {
    if (item.qid) {
      // If the question existed before, it's a potential update
      questionsToDelete.delete(item.qid);
      // Update the question if necessary
      if (
        JSON.stringify({ ...item, options: [] }) !==
        JSON.stringify({ ...storedQuestions[item.qid], options: [] })
      )
        questionsToUpdate.push(item);
      // Now, update the options appropriately
      const opts = getOptionsToUpdate(
        item.options,
        storedQuestions[item.qid].options,
        item.qid
      );
      optionsToDelete.push(...opts.toDelete);
      optionsToUpdate.push(...opts.toUpdate);
      optionsToCreate.push(...opts.toCreate);
    } else {
      // The question did not exist so we need to create it
      questionsToCreate.push(item);
    }
  });
  return fetch(UPDATE_HACK_QUESTIONS_PATH, {
    method: "PUT",
    headers: {
      "ha-api-token": state.user.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questionsToCreate,
      questionsToUpdate,
      questionsToDelete: [...questionsToDelete], // Convert to array
      optionsToCreate,
      optionsToUpdate,
      optionsToDelete
    })
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      dispatch(getHackathonQuestions(hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to update questions: ${err.message}`));
      dispatch(getHackathonQuestions(hid));
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
      dispatch(updateHackathonQuestionsArrayInState(res, hid));
    })
    .catch(err => {
      dispatch(showError(`Failed to get questions: ${err.message}`));
    });
};
