import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { QUESTION_TYPE } from "./QuestionType";
import RegQuestionOptionEditor from "./RegQuestionOptionEditor";

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
    formControl: {
      minWidth: 120
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
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <FormControl className={classes.formControl}>
          <InputLabel>Type</InputLabel>
          <Select
            value={props.regQuestion.type}
            onChange={event => {
              const newRegQuestion = { ...props.regQuestion };
              newRegQuestion.type = event.target.value;
              props.setRegQuestion(newRegQuestion);
            }}
          >
            <MenuItem value={QUESTION_TYPE.CK}>{QUESTION_TYPE.CK}</MenuItem>
            <MenuItem value={QUESTION_TYPE.RD}>{QUESTION_TYPE.RD}</MenuItem>
            <MenuItem value={QUESTION_TYPE.TXT}>{QUESTION_TYPE.TXT}</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.requiredCheckboxDiv}>
          <InputLabel shrink={true} className={classes.requiredCheckboxLabel}>
            Required
          </InputLabel>
          <Checkbox
            checked={props.regQuestion.required}
            onChange={event => {
              const newRegQuestion = { ...props.regQuestion };
              newRegQuestion.required = event.target.checked;
              props.setRegQuestion(newRegQuestion);
            }}
            // onChange={handleChange}
            value="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
            className={classes.requiredCheckbox}
          />
        </div>
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
        />
        <TextField
          fullWidth
          multiline
          rows="2"
          id="reg-question-description"
          label="Description"
          name="description"
        />
      </div>
      <div className={classes.options}>
        <RegQuestionOptionEditor
          type={props.regQuestion.type}
          options={props.regQuestion.options}
          setRegOptions={options => {
            const newRegQuestion = { ...props.regQuestion };
            newRegQuestion.options = options;
            props.setRegQuestion(newRegQuestion);
          }}
        />
      </div>
    </div>
  );
}

RegQuestionEditor.propTypes = {
  regQuestion: PropTypes.object.isRequired,
  setRegQuestion: PropTypes.func.isRequired
};
