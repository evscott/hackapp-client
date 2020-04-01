/**
 * Converts the questions returned from the server into a format
 * we can load into the redux store.
 *
 * @param questionsToUpdate {Array} Question objects to update
 * @param oldQuestions {Object} A dictionary of questions in the store
 * @returns {Object} New dictionary of questions for the redux store
 */
export const convertQuestionsFromServerToRedux = (
  questionsToUpdate,
  oldQuestions = {}
) => {
  const questions = { ...oldQuestions };
  questionsToUpdate.forEach(item => {
    item.desc = item.descr; // Convert naming conventions
    questions[item.qid] = item;
  });
  return questions;
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
  return Object.values(questions).sort((q1, q2) => {
    if (q1.index < q2.index) return -1;
    if (q1.index > q2.index) return 1;
    return 0;
  });
};

/**
 * Converts the questions created on the GUI to a format usable
 * for sending to the server.
 *
 * @param questions {Array} The questions to send to the server
 * @returns {Array} The questions in server format
 */
export const convertQuestionsFromUIToServer = questions => {
  return questions.map((q, index) => ({
    ...q,
    descr: q.desc,
    index
  }));
};
