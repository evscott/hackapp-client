import React from "react";
import PropTypes from "prop-types";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import EditIcon from "@material-ui/icons/Edit";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

/** This defines the styles for the React component */
const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "fixed",
      right: 20,
      bottom: 20
    },
    icon: {
      marginRight: 10
    }
  };
});

/**
 * A floating action button for a user to register for a hackathon.
 * It displays different options depending on:
 *  - If the hackathon is still loading in
 *  - If the registration deadline is passed
 *  - If the user is not logged in
 *  - If the user already registered
 *  - If the user is logged in and able to register
 */
export default function UserRegFab(props) {
  const { loading, regDeadline, openModal, loggedIn, registered } = props;
  const classes = useStyles();
  if (loading) {
    return (
      <Fab className={classes.fab} disabled>
        <CircularProgress />
      </Fab>
    );
  } else if (regDeadline <= new Date()) {
    return (
      <Fab variant="extended" className={classes.fab} disabled>
        <EmojiPeopleIcon className={classes.icon} />
        Registration Closed
      </Fab>
    );
  } else if (!loggedIn) {
    return (
      <Fab
        variant="extended"
        color="primary"
        className={classes.fab}
        onClick={openModal}
      >
        <ArrowForwardIcon className={classes.icon} />
        Sign In to Register
      </Fab>
    );
  } else if (registered) {
    return (
      <Fab
        variant="extended"
        color="primary"
        className={classes.fab}
        onClick={openModal}
      >
        <EditIcon className={classes.icon} />
        Edit Registration
      </Fab>
    );
  } else {
    return (
      <Fab
        variant="extended"
        color="primary"
        className={classes.fab}
        onClick={openModal}
      >
        <EmojiPeopleIcon className={classes.icon} />
        Register
      </Fab>
    );
  }
}

UserRegFab.propTypes = {
  // Funtion to open the registration modal
  openModal: PropTypes.func.isRequired,
  // Whether or not it's loading
  loading: PropTypes.bool,
  // The registration deadline
  regDeadline: PropTypes.object,
  // Whether the user is logged in
  loggedIn: PropTypes.bool,
  // Whether the user has already been registered or not
  registered: PropTypes.bool
};
