import React, { useState } from "react";
import PropTypes from "prop-types";
import SubjectIcon from "@material-ui/icons/Subject";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import RegQuestionEditor from "./questions/RegQuestionEditor";
import { QUESTION_TYPE } from "./questions/QuestionType";
import ReorderableCardForm from "../reusable/ReorderableCardForm";

/**
 * The form that asks the user to select the registration questions
 * that will be given to the user.
 */
export default function RegistrationDetailsForm(props) {
  // When in view mode, we'll get to preview and not edit anything
  const [viewMode, setViewMode] = useState(false);

  /**
   * All available options for creating new items on the form.
   * These are available through a popup menu on the right called
   * a SpeedDial.
   */
  const speedDialItems = [
    {
      icon: <SubjectIcon />,
      title: `Add ${QUESTION_TYPE.TXT} Question`,
      // The function for creating a new, empty question on click
      getNewItem: () => ({
        question: "",
        desc: "",
        options: [],
        required: false,
        type: QUESTION_TYPE.TXT
      })
    },
    {
      icon: <RadioButtonCheckedIcon />,
      title: `Add ${QUESTION_TYPE.RD} Question`,
      getNewItem: () => ({
        question: "",
        desc: "",
        options: [],
        required: false,
        type: QUESTION_TYPE.RD
      })
    },
    {
      icon: <CheckBoxIcon />,
      title: `Add ${QUESTION_TYPE.CK} Question`,
      getNewItem: () => ({
        question: "",
        desc: "",
        options: [],
        required: false,
        type: QUESTION_TYPE.CK
      })
    }
  ];

  return (
    <ReorderableCardForm
      array={props.questions}
      setArray={props.setQuestions}
      prvPage={props.prvPage}
      nextPage={props.nextPage}
      getCardContents={index => (
        <RegQuestionEditor
          question={props.questions[index]}
          setQuestion={newQuestion => {
            const newQuestions = [...props.questions];
            newQuestions[index] = newQuestion;
            props.setQuestions(newQuestions);
          }}
          viewMode={viewMode}
        />
      )}
      speedDialItems={speedDialItems}
      speedDialHidden={viewMode}
      viewMode={viewMode}
      setViewMode={setViewMode}
    />
  );
}

RegistrationDetailsForm.propTypes = {
  // The questions for the registration form, which is an array of
  // objects
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      required: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  // The function to update the questions
  setQuestions: PropTypes.func.isRequired,
  // The function for going to the previous page
  prvPage: PropTypes.func.isRequired,
  // The function for going to the next page
  nextPage: PropTypes.func.isRequired
};
