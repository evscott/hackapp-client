import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { QUESTION_TYPE } from "./QuestionType";
import RegQuestionEditor from "./RegQuestionEditor";

const useStyles = makeStyles(theme => {
  return {
    formControl: {
      minWidth: 120
    }
  };
});

export default function RegQuestionTypeSelector(props) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Type</InputLabel>
      <Select
        value={props.questionType}
        onChange={event => props.setQuestionType(event.target.value)}
      >
        <MenuItem value={QUESTION_TYPE.CK}>{QUESTION_TYPE.CK}</MenuItem>
        <MenuItem value={QUESTION_TYPE.RD}>{QUESTION_TYPE.RD}</MenuItem>
        <MenuItem value={QUESTION_TYPE.TXT}>{QUESTION_TYPE.TXT}</MenuItem>
      </Select>
    </FormControl>
  );
}

RegQuestionEditor.propTypes = {
  questionType: PropTypes.object.isRequired,
  setQuestionType: PropTypes.func.isRequired
};
