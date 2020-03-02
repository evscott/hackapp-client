import React, { useState } from "react";
import PropTypes from "prop-types";
import SubjectIcon from "@material-ui/icons/Subject";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import RegQuestionEditor from "./questions/RegQuestionEditor";
import { QUESTION_TYPE } from "./questions/QuestionType";
import ReorderableCardForm from "../reusable/ReorderableCardForm";

export default function RegistrationDetailsForm(props) {
  const [viewMode, setViewMode] = useState(false);

  const speedDialItems = [
    {
      icon: <SubjectIcon />,
      title: `Add ${QUESTION_TYPE.TXT} Question`,
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
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      required: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  setQuestions: PropTypes.func.isRequired,
  prvPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
};
