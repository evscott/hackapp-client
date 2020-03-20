import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import RightButtonBar from "../reusable/RightButtonBar";

/**
 * This defines the styles for the React component.
 */
const useStyles = makeStyles(theme => {
  return {
    form: {
      width: "100%",
      marginTop: theme.spacing(1)
    },
    row: {
      display: "flex"
    },
    rowItem: {
      flexGrow: 1,
      maxWidth: "none"
    },
    leftMargin: {
      marginLeft: 10
    },
    marginedButton: {
      marginRight: 10
    }
  };
});

/**
 * A user login/signup form that accepts the email and password.
 * Optionally, it can also take in a first and last name.
 * Has a submit button (with custom text/functionality) and an
 * optional cancel button.
 */
export default function UserForm(props) {
  // The user's inputted first name
  const [firstName, setFirstName] = useState("");
  // The user's inputted last name
  const [lastName, setLastName] = useState("");
  // The user's inputted email address
  const [email, setEmail] = useState("");
  // The user's inputted password
  const [password, setPassword] = useState("");

  const classes = useStyles();

  /**
   * Gets fields for accepting the user's first and last name.
   * Only shows if there is a property "getUsername" set to true.
   */
  const getUsernameFields = () => {
    if (props.getUsername) {
      return (
        <div className={classes.row}>
          <TextField
            className={classes.rowItem}
            variant="outlined"
            required
            label="First Name"
            margin="normal"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            className={`${classes.rowItem} ${classes.leftMargin}`}
            variant="outlined"
            required
            label="Last Name"
            margin="normal"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
      );
    }
  };

  /** Gets the cancel button, if cancel functionality is passed as a prop */
  const getCancelButton = () => {
    if (props.onCancel) {
      return (
        <Button className={classes.marginedButton} onClick={props.onCancel}>
          Cancel
        </Button>
      );
    }
  };

  /** Gets the accessory button, if functionality is enabled */
  const getAccessoryButton = () => {
    if(props.onAccessory) {
      return (
        <Button className={classes.marginedButton} onClick={props.onAccessory}>
          {props.accessoryText || "Change Mode"}
        </Button>
      )
    }
  };

  /** Passes the user information to the onComplete prop function */
  const onComplete = () => {
    props.onComplete({ firstName, lastName, email, password });
  };

  return (
    <form className={classes.form} noValidate>
      {getUsernameFields()}
      <TextField
        variant="outlined"
        required
        fullWidth
        label="Email Address"
        margin="normal"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="password"
        required
        fullWidth
        label="Password"
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <RightButtonBar>
        {getCancelButton()}
        {getAccessoryButton()}
        <Button variant="contained" color="primary" onClick={onComplete}>
          {props.onCompleteText}
        </Button>
      </RightButtonBar>
    </form>
  );
}

UserForm.propTypes = {
  // Whether or not it should accept the user's name
  getUsername: PropTypes.bool,
  // The function called on cancelling the input
  onCancel: PropTypes.func,
  // The function called on completing the input
  onComplete: PropTypes.func.isRequired,
  // The text on the button for completing the input
  onCompleteText: PropTypes.string.isRequired,
  // The function called on clicking an (optional) accessory button
  onAccessory: PropTypes.func,
  // The text on the accessory button
  accessoryText: PropTypes.string
};
