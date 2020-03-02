import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import RegQuestionOptionEditor from "./RegQuestionOptionEditor";
import RegQuestionTypeSelector from "./RegQuestionTypeSelector";
import RegQuestionRequiredCheckbox from "./RegQuestionRequiredCheckbox";

const useStyles = makeStyles(theme => {
  return {
    root: {},
    header: {
      padding: theme.spacing(2),
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

export default function RegQuestionEditor(props) {
  const classes = useStyles();

  const updateQuestion = (property, value) => {
    props.setRegQuestion({
      ...props.regQuestion,
      [property]: value
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <RegQuestionTypeSelector
          questionType={props.regQuestion.type}
          setQuestionType={type => updateQuestion("type", type)}
        />
        <RegQuestionRequiredCheckbox
          required={props.regQuestion.required}
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
          value={props.regQuestion.question}
          onChange={event => updateQuestion("question", event.target.value)}
        />
        <TextField
          fullWidth
          multiline
          rows="2"
          id="reg-question-description"
          label="Description"
          name="description"
          value={props.regQuestion.desc}
          onChange={event => updateQuestion("desc", event.target.value)}
        />
      </div>
      <div className={classes.options}>
        <RegQuestionOptionEditor
          type={props.regQuestion.type}
          options={props.regQuestion.options}
          setRegOptions={options => updateQuestion("options", options)}
        />
      </div>
    </div>
  );
}

RegQuestionEditor.propTypes = {
  regQuestion: PropTypes.object.isRequired,
  setRegQuestion: PropTypes.func.isRequired
};
