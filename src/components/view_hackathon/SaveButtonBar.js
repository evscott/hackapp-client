import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import RightButtonBar from "../reusable/RightButtonBar";
import { makeStyles } from "@material-ui/core/styles";

/** This defines the styles for the React component */
const useStyles = makeStyles(theme => {
  return {
    button: {
      marginLeft: theme.spacing(1)
    }
  };
});

/** A button bar with two options: Cancel and Save */
export default function SaveButtonBar(props) {
  const classes = useStyles();

  return (
    <RightButtonBar>
      <Button
        className={classes.button}
        // variant="contained"
        onClick={props.onCancel}
      >
        Cancel
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={props.onSave}
      >
        Save
      </Button>
    </RightButtonBar>
  )
}

SaveButtonBar.propTypes = {
  // Function called when clicking the Cancel button
  onCancel: PropTypes.func.isRequired,
  // Function called when clicking the Save button
  onSave: PropTypes.func.isRequired
};
