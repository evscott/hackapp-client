import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import RegQuestionOptionEditor from "./RegQuestionOptionEditor";
import RegQuestionTypeSelector from "./RegQuestionTypeSelector";
import RegQuestionRequiredCheckbox from "./RegQuestionRequiredCheckbox";
import RegQuestionViewer from "./RegQuestionViewer";

/** The styles for the component. */
const useStyles = makeStyles(theme => {
  return {
    header: {
      padding: theme.spacing(2),
      paddingLeft: 26,
      position: "relative",
      backgroundColor: theme.palette.grey[100]
    },
    content: {
      padding: theme.spacing(4)
    },
    requiredCheckboxDiv: {
      position: "absolute",
      display: "flex",
      justifyContent: "flex-end",
      top: theme.spacing(2),
      right: theme.spacing(2)
    },
    requiredCheckboxLabel: {
      position: "relative",
      right: -10
    },
    requiredCheckbox: {
      position: "relative",
      top: -4,
      padding: 0,
      margin: 0
    },
    questionTitle: {
      fontSize: theme.typography.h5.fontSize
    },
    options: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.grey[50]
    }
  };
});

/**
 * An editor for any kind of question. Given a question, the user can edit
 * it (and even change the type to any other kind of question).
 */
export default function RegQuestionEditor(props) {
  const classes = useStyles();

  // Holds onto answers from when we preview the page.
  // If a `props.answers` property is passed on, it uses that
  // instead; this state is thrown away and just used when a user
  // wants to demo the question. We might want to reuse this component
  // later and allow the options to be saved with the prop.
  const [answers, setAnswers] = React.useState([]);

  /** Updates a question's property with some new value. */
  const updateQuestion = (property, value) => {
    props.setQuestion({
      ...props.question,
      [property]: value
    });
  };

  if (props.viewMode) {
    // If we're in view mode, just show the registration question
    return (
      <RegQuestionViewer
        question={props.question}
        answers={props.answers ? props.answers : answers}
        setAnswers={props.setAnswers ? props.setAnswers : setAnswers}
      />
    );
  } else {
    // Otherwise, show the editor
    return (
      <div>
        <div className={classes.header}>
          <RegQuestionTypeSelector
            questionType={props.question.type}
            setQuestionType={type => updateQuestion("type", type)}
          />
          <RegQuestionRequiredCheckbox
            required={props.question.required}
            setRequired={required => updateQuestion("required", required)}
          />
        </div>
        <div className={classes.content}>
          <TextField
            InputProps={{
              classes: {
                input: classes.questionTitle
              }
            }}
            required
            fullWidth
            id="reg-question-title"
            label="Question"
            name="question"
            value={props.question.question}
            onChange={event => updateQuestion("question", event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows="2"
            id="reg-question-description"
            label="Description"
            name="description"
            value={props.question.desc}
            onChange={event => updateQuestion("desc", event.target.value)}
            margin="normal"
          />
        </div>
        <div className={classes.options}>
          <RegQuestionOptionEditor
            type={props.question.type}
            options={props.question.options}
            setRegOptions={options => updateQuestion("options", options)}
          />
        </div>
      </div>
    );
  }
}

RegQuestionEditor.propTypes = {
  // The question to edit
  question: PropTypes.shape({
    // The string representation of the question
    question: PropTypes.string.isRequired,
    // The description of the question
    desc: PropTypes.string.isRequired,
    // The options to choose from for the question
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    // Whether filling out the question is required
    required: PropTypes.bool.isRequired,
    // The type of the question (multiple choice, radio, text)
    type: PropTypes.string.isRequired
  }).isRequired,
  // Function for setting the data for a question
  setQuestion: PropTypes.func.isRequired,
  // If we should just view rather than edit the question
  viewMode: PropTypes.bool,
  // The answers (options) chosen when viewing the question. Not required
  answers: PropTypes.array,
  // The setter for answers (options) chosen when viewing the question
  setAnswers: PropTypes.func
};
