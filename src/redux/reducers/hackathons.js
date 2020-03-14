import { QUESTION_TYPE } from "../../components/hack_forms/questions/QuestionType";

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
  // TODO: actually implement what actions will do.
  switch (action) {
    default:
      return state;
  }
}
