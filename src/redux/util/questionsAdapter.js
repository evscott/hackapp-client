/**
 * Converts the questions returned from the server into a format
 * we can load into the redux store.
 *
 * @param questionsToUpdate {Array} Question objects to update
 * @returns {Object} New dictionary of questions for the redux store
 */
export const convertQuestionsFromServerToRedux = (
  questionsToUpdate
) => {
  const questions = {};
  questionsToUpdate.forEach(item => {
    // Convert naming conventions
    item.desc = item.descr;
    // Now, turn the options into a dictionary
    const options = {};
    item.options.forEach(o => (options[o.oid] = o));
    item.options = options;
    // Add it to the dict
    questions[item.qid] = item;
  });
  return questions;
};

/**
 * Comparator for two items with indices. This could be two questions
 * or two options.
 */
const compareIndices = (q1, q2) => {
  if (q1.index < q2.index) return -1;
  if (q1.index > q2.index) return 1;
  return 0;
};

/**
 * Converts the questions in the redux store to a format that can
 * be used in the GUI (i.e., using an array rather than a dict).
 *
 * @param questions {Object} The questions in the redux store
 * @returns {Array} The questions for presenting in the GUI
 */
export const convertQuestionsFromReduxToUI = questions => {
  if (!questions) return undefined;
  // Unpack the questions into an array
  const questionArray = Object.values(questions).sort(compareIndices);
  return questionArray.map(question => ({
    ...question,
    options: Object.values(question.options).sort(compareIndices)
  }));
};

/**
 * Converts the questions created on the GUI to a format usable
 * for sending to the server.
 *
 * @param questions {Array} The questions to send to the server
 * @param hid {String} The id for the hackathon with the questions
 * @returns {Array} The questions in server format
 */
export const convertQuestionsFromUIToServer = (questions, hid) => {
  return questions.map((q, index) => {
    // Add indices to each option
    const options = q.options.map((option, idx) => ({
      ...option,
      index: idx
    }));
    return {
      ...q,
      descr: q.desc,
      options,
      index,
      hid
    };
  });
};
