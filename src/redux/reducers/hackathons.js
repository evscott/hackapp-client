import { QUESTION_TYPE } from "../../components/hack_forms/questions/QuestionType";
import { ADD_HACKATHON, DELETE_HACKATHON, UPDATE_HACKATHON } from "../actions/actionTypes";

/**
 * The hackathon ID for the next hackathon that gets created.
 *
 * @TODO: replace this with an actual database call.
 */
let nextHID = 3;

/**
 * The initial state for this branch of the Redux store tree.
 *
 * @TODO: remove the temporary example hackathons
 */
const initialState = {
  // Dictionary to find hackathon by hackathon ID
  byHID: {
    0: {
      hid: 0,
      // Primary information is in the overview
      overview: {
        name: "MtA Hacks",
        startDate: new Date("February 6, 1995 07:30:00"),
        endDate: new Date("February 6, 1995 16:30:00"),
        location: "Mount Allison University",
        maxReg: 59,
        regDeadline: new Date("February 6, 1995 06:30:00"),
        draft: false
      },
      // Text information is in the details section
      details: ["# This is a hackathon", "With cool stuff"],
      // Registration questions for the hackathon
      questions: [
        {
          question: "Very important question",
          desc: "Everybody should answer this very important question",
          options: ["Option 1", "Option 2", "Option 3"],
          required: true,
          type: QUESTION_TYPE.RD
        },
        {
          question: "Another (less important) question",
          desc: "Most people should answer this question",
          options: ["Option 1!", "Option 2!", "Option 3!"],
          required: false,
          type: QUESTION_TYPE.CK
        },
        {
          question: "Additional information",
          desc: "We don't want to hear it in person, so complain here.",
          options: [],
          required: false,
          type: QUESTION_TYPE.TXT
        }
      ]
    },
    1: {
      hid: 1,
      // Primary information is in the overview
      overview: {
        name: "MtA Hacks 2",
        startDate: new Date("February 6, 2021 07:30:00"),
        endDate: new Date("February 6, 2021 16:30:00"),
        location: "Meal Hall",
        maxReg: 150,
        regDeadline: new Date("February 6, 2021 06:30:00"),
        draft: false
      },
      // Text information is in the details section
      details: ["# This is a hackathon", "With even more cool stuff"],
      // Registration questions for the hackathon
      questions: [
        {
          question: "Most important question",
          desc: "This is fun!",
          options: ["Option 1", "Option 2", "Option 3"],
          required: true,
          type: QUESTION_TYPE.CK
        },
        {
          question: "Answer me!",
          desc: "Please.",
          options: ["Option 1!", "Option 2!", "Option 3!"],
          required: false,
          type: QUESTION_TYPE.RD
        },
        {
          question: "Additional information",
          desc: "",
          options: [],
          required: false,
          type: QUESTION_TYPE.TXT
        }
      ]
    },
    2: {
      hid: 2,
      // Primary information is in the overview
      overview: {
        name: "Draft Hacks 3",
        startDate: new Date("February 6, 2022 07:30:00"),
        endDate: new Date("February 6, 2022 16:30:00"),
        location: "Meal Hall",
        maxReg: 150,
        regDeadline: new Date("February 6, 2022 06:30:00"),
        draft: true
      },
      // Text information is in the details section
      details: ["# This is a hackathon", "With even more cool stuff"],
      // Registration questions for the hackathon
      questions: [
        {
          question: "Most important question",
          desc: "This is fun!",
          options: ["Option 1", "Option 2", "Option 3"],
          required: true,
          type: QUESTION_TYPE.CK
        },
        {
          question: "Answer me!",
          desc: "Please.",
          options: ["Option 1!", "Option 2!", "Option 3!"],
          required: false,
          type: QUESTION_TYPE.RD
        },
        {
          question: "Additional information",
          desc: "",
          options: [],
          required: false,
          type: QUESTION_TYPE.TXT
        }
      ]
    }
  }
};

/**
 * Reducer for the hackathons branch of the Redux state tree. It accepts
 * actions that modify the hackathons and modifies the state to accommodate.
 * @param state The hackathons that are currently held in the app
 * @param action The action to perform on the state tree
 */
export default function hackathons(state = initialState, action) {
  let hid = 0;
  switch (action.type) {
    case ADD_HACKATHON:
      hid = nextHID++;
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: {
            ...action.hackathon,
            hid
          }
        }
      };
    case UPDATE_HACKATHON:
      hid = action.hackathon.hid;
      return {
        ...state,
        byHID: {
          ...state.byHID,
          [hid]: action.hackathon
        }
      };
    case DELETE_HACKATHON:
      hid = action.hid;
      let byHID = {...state.byHID};
      delete byHID[hid];
      return {
        ...state,
        byHID: byHID
      };
    default:
      return state;
  }
}