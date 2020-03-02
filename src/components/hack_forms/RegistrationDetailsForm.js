import React from "react";
import PropTypes from "prop-types";
import SubjectIcon from "@material-ui/icons/Subject";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import RegQuestionEditor from "./questions/RegQuestionEditor";
import { QUESTION_TYPE } from "./questions/QuestionType";
import ReorderableCardForm from "../reusable/ReorderableCardForm";

export default function RegistrationDetailsForm(props) {
  const [questions, setQuestions] = React.useState([
    {
      question: "",
      desc: "",
      options: [""],
      required: false,
      type: QUESTION_TYPE.TXT
    }
  ]);

  const speedDialItems = [
    {
      icon: <SubjectIcon />,
      title: `Add ${QUESTION_TYPE.TXT} Question`,
      getNewItem: () => ({
        question: "",
        desc: "",
        options: [""],
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
        options: [""],
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
        options: [""],
        required: false,
        type: QUESTION_TYPE.CK
      })
    }
  ];

  return (
    <ReorderableCardForm
      array={questions}
      setArray={setQuestions}
      prvPage={props.prvPage}
      nextPage={props.nextPage}
      getCardContents={index => (
        <RegQuestionEditor
          regQuestion={questions[index]}
          setRegQuestion={newQuestion => {
            const newQuestions = [...questions];
            newQuestions[index] = newQuestion;
            setQuestions(newQuestions);
          }}
        />
      )}
      speedDialItems={speedDialItems}
    />
  );
}

RegistrationDetailsForm.propTypes = {
  prvPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
};
