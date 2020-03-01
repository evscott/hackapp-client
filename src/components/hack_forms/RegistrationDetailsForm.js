import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ReorderableCard from "./ReorderableCard";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import RegQuestionEditor from "./questions/RegQuestionEditor";

const useStyles = makeStyles(theme => {
  return {};
});

export default function RegistrationDetailsForm(props) {
  const classes = useStyles();

  const [questions, setQuestions] = React.useState([
    {
      question: "Question",
      desc: "Description",
      options: ["Option 1", "Option TWO"],
      required: true,
      type: "Checkbox"
    }
  ]);
  const [ids, setIds] = React.useState([1]);
  const [nextId, setNextId] = React.useState(2);

  return (
    <div>
      {questions.map((question, idx) => (
        <React.Fragment key={ids[idx]}>
          <ReorderableCard
            onMoveUp={() => {}}
            onDelete={() => {}}
            onMoveDown={() => {}}
          >
            <RegQuestionEditor
              regQuestion={question}
              setRegQuestion={newQuestion => {
                const newQuestions = [...questions];
                newQuestions[idx] = newQuestion;
                setQuestions(newQuestions);
              }}
            />
          </ReorderableCard>
        </React.Fragment>
      ))}
    </div>
  );
}
