/**
 * Converts the format of the answers from the server's format to
 * the redux format. It essentially puts things into dictionaries
 * for faster access.
 *
 * @param answers {Array} The answers from the server
 * @returns {Object} The answers formatted for the redux store
 */
export const convertAnswersFromServerToRedux = answers => {
  const reduxAns = {};
  answers.forEach(ans => {
    if(reduxAns[ans.qid] === undefined) reduxAns[ans.qid] = {};
    if(ans.oid) {
      // For an answer that has an option id, add it here
      reduxAns[ans.qid][ans.oid] = ans;
    } else {
      // Default place for an option without an option id
      reduxAns[ans.qid].answer = ans;
    }
  });
  return reduxAns;
};

/**
 * Converts the format of the answers from the redux format to the
 * format used by the GUI.
 *
 * @param answers {Object} The answers stored in the redux store
 * @param qidList {Array} The qids in the order displayed on front end
 * @returns {Array} The answers to show on the front end
 */
export const convertAnswersFromReduxToUI = (answers, qidList) => {
  if(answers === undefined || qidList === undefined) return undefined;
  const uiAnswers = qidList.reduce((ans, qid) => {
    ans[qid] = {qid, oid: [], answer: null};
    return ans;
  }, {});
  // Now, plug in the answers!
  qidList.forEach(qid => {
    // First, get all oids
    const oids = Object.keys(answers[qid]);
    if(oids.includes("answer")) {
      // Put the answer in
      uiAnswers[qid].answer = answers[qid].answer.answer;
      // Remove that oid
      const index = oids.findIndex(oid => oid === "answer");
      oids.splice(index, 1);
    }
    // Now, plop in the oid array
    uiAnswers[qid].oid = oids;
  });
  return qidList.map(qid => uiAnswers[qid]);
};

/**
 * Converts answers to registration questions from the format
 * used in React components to the format used to communicate
 * with the server.
 *
 * @param answers {Array} The answers from the GUI.
 * @returns {Array} The answers to send to the server.
 */
export const convertAnswersFromUIToServer = answers => {
  const serverAns = [];
  answers.forEach(ans => {
    if (ans.answer) {
      // It's easy when we have a text answer
      serverAns.push({...ans, oid: null}); // Remove oids right away
    } else if (ans.oid) {
      // FOR CHECKBOXES AND RADIO BUTTONS:
      // We have to make answers for each option selected
      ans.oid.forEach(oid => {
        serverAns.push({ qid: ans.qid, oid, answer: null });
      });
    }
  });
  return serverAns;
};
