import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

/** This defines the styles for the React component */
const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "fixed",
      right: 20,
      bottom: 20
    }
  };
});

/**
 * A floating action button for editing something.
 * It displays a loading indicator when props.loading
 * is true.
 */
export default function EditFab(props) {
  const classes = useStyles();
  if (props.loading) {
    return (
      <Fab className={classes.fab} disabled>
        <CircularProgress />
      </Fab>
    );
  } else {
    return (
      <Fab className={classes.fab} color="primary" onClick={props.onClick}>
        <EditIcon />
      </Fab>
    );
  }
}

EditFab.propTypes = {
  // Whether to disable the edit button and show a loading circle
  loading: PropTypes.bool,
  // Function to call whenever the fab is clicked
  onClick: PropTypes.func.isRequired
};
