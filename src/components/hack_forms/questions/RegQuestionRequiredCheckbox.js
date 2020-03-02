import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => {
  return {
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
    }
  };
});

export default function RegQuestionRequiredCheckbox(props) {
  const classes = useStyles();
  return (
    <div className={classes.requiredCheckboxDiv}>
      <InputLabel shrink={true} className={classes.requiredCheckboxLabel}>
        Required
      </InputLabel>
      <Checkbox
        checked={props.required}
        onChange={event => props.setRequired(event.target.checked)}
        value="required"
        inputProps={{ "aria-label": "question required checkbox" }}
        className={classes.requiredCheckbox}
      />
    </div>
  );
}

RegQuestionRequiredCheckbox.propTypes = {
  required: PropTypes.bool.isRequired,
  setRequired: PropTypes.func.isRequired
};
