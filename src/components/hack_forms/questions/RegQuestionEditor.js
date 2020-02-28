import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

const QUESTION_TYPE = {
  CK: "Checkbox",
  RD: "Radio Button",
  TXT: "Text"
};

const useStyles = makeStyles(theme => {
  return {
    root: {
      margin: theme.spacing(4),
      position: "relative"
    },
    formControl: {
      minWidth: 120
    },
    requiredCheckboxDiv: {
      position: "absolute",
      display: "flex",
      justifyContent: "flex-end",
      top: 0,
      right: 0
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
    }
  };
});

export default function RegQuestionEditor(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
        <InputLabel shrink={true} className={classes.requiredCheckboxLabel}>Required</InputLabel>
        <Checkbox
          // checked={checked}
          // onChange={handleChange}
          value="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
          className={classes.requiredCheckbox}
        />
      </div>
    </div>
  );
}

RegQuestionEditor.propTypes = {
  regQuestion: PropTypes.object.isRequired,
  setRegQuestion: PropTypes.func.isRequired
};
