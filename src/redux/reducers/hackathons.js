import {
  ADD_HACKATHON_OVERVIEWS_TO_STATE,
  UPDATE_HACKATHON_OVERVIEW_IN_STATE,
  DELETE_HACKATHON_FROM_STATE,
  UPDATE_HACKATHON_DETAILS_ARRAY_IN_STATE,
  UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE,
  SET_HACKATHON_DRAFT_IN_STATE,
  DELETE_HACKATHON_DETAIL_IN_STATE,
  DELETE_HACKATHON_QUESTION_FROM_STATE,
  UPDATE_HACKATHON_QUESTION_OPTION_IN_STATE,
  DELETE_HACKATHON_QUESTION_OPTION_FROM_STATE
} from "../actions/actionTypes";
import { convertDetailsFromServerToRedux } from "../util/detailsAdapter";
import { convertQuestionsFromServerToRedux } from "../util/questionsAdapter";

/** The initial state for this branch of the Redux store tree */
const initialState = {
  loading: true,
  // Dictionary to find hackathon by hackathon ID
  byHID: {}
};

/**
 * Reducer for the hackathons branch of the Redux state tree. It accepts
 * actions that modify the hackathons and modifies the state to accommodate.
 * @param state The hackathons that are currently held in the app
 * @param action The action to perform on the state tree
 */
export default function hackathons(state = initialState, action) {
  let hid = 0;
  let oldHackathon = {};
  switch (action.type) {
    case ADD_HACKATHON_OVERVIEWS_TO_STATE:
      return {
        ...state,
        loading: false,
        byHID: action.overviews.reduce((map, hack) => {
          map[hack.hid] = hack;
          return map;
        }, {})
      };
    case UPDATE_HACKATHON_OVERVIEW_IN_STATE:
      hid = action.hid;
      oldHackathon = state.byHID[hid] || {};
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: {
            hid: action.hid,
            ...oldHackathon,
            overview: action.overview
          }
        }
      };
    case UPDATE_HACKATHON_DETAILS_ARRAY_IN_STATE:
      hid = action.hid;
      oldHackathon = state.byHID[hid] || {};
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: {
            ...oldHackathon,
            details: convertDetailsFromServerToRedux(
              action.details,
              oldHackathon.details
            )
          }
        }
      };
    case UPDATE_HACKATHON_QUESTIONS_ARRAY_IN_STATE:
      hid = action.hid;
      oldHackathon = state.byHID[hid] || {};
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: {
            ...oldHackathon,
            questions: convertQuestionsFromServerToRedux(
              action.questions,
              oldHackathon.questions
            )
          }
        }
      };
    case UPDATE_HACKATHON_QUESTION_OPTION_IN_STATE:
      hid = action.hid;
      oldHackathon = state.byHID[hid] || {};
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: {
            ...oldHackathon,
            questions: {
              ...oldHackathon.questions,
              [action.qid]: {
                ...oldHackathon.questions[action.qid],
                options: {
                  ...oldHackathon.questions[action.qid].options,
                  [action.oid]: action.option
                }
              }
            }
          }
        }
      };
    case DELETE_HACKATHON_QUESTION_OPTION_FROM_STATE:
      hid = action.hid;
      oldHackathon = state.byHID[hid] || {};
      let options = {...oldHackathon.questions[action.qid].options};
      delete options[action.oid];
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: {
            ...oldHackathon,
            questions: {
              ...oldHackathon.questions,
              [action.qid]: {
                ...oldHackathon.questions[action.qid],
                options
              }
            }
          }
        }
      };
    case DELETE_HACKATHON_QUESTION_FROM_STATE:
      hid = action.hid;
      oldHackathon = state.byHID[hid] || {};
      let questions = {...oldHackathon.questions};
      delete questions[action.qid];
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: {
            ...oldHackathon,
            questions
          }
        }
      };
    case DELETE_HACKATHON_DETAIL_IN_STATE:
      hid = action.hid;
      oldHackathon = state.byHID[hid] || {};
      let details = {...oldHackathon.details};
      delete details[action.did];
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: {
            ...oldHackathon,
            details
          }
        }
      };
    case DELETE_HACKATHON_FROM_STATE:
      hid = action.hid;
      let byHID = { ...state.byHID };
      delete byHID[hid];
      return {
        ...state,
        byHID: byHID
      };
    case SET_HACKATHON_DRAFT_IN_STATE:
      hid = action.hid;
      oldHackathon = state.byHID[hid];
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: {
            ...oldHackathon,
            overview: {
              ...oldHackathon.overview,
              draft: action.draft
            }
          }
        }
      };
    default:
      return state;
  }
}
