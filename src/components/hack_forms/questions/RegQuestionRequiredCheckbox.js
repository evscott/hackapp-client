import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";

/** Creates styles for the component. */
const useStyles = makeStyles(theme => {
  return {
    requiredCheckboxDiv: {
      position: "absolute",
      display: "flex",
      justifyContent: "flex-end",
      top: theme.spacing(2),
      right: 26
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

/**
 * The checkbox at the top right corner of a registration question editor
 * that allows a user to specify if a registration question is required.
 */
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
  // The current setting for whether the question is required
  required: PropTypes.bool.isRequired,
  // Setter for whether the question is required
  setRequired: PropTypes.func.isRequired
};
