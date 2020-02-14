import React from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RightButtonBar from "../buttons/RightButtonBar";
import { makeStyles } from "@material-ui/core/styles";

/**
 * This defines the styles for the React component.
 */
const useStyles = makeStyles(theme => {
  return {
    form: {
      width: "100%",
      marginTop: theme.spacing(1)
    }
  };
});

/**
 * The form for creating an administrator when first setting up
 * the web application.
 * @param props The properties passed in
 */
export default function SetupAdminForm(props) {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant={"outlined"}
        required
        fullWidth
        id={"email"}
        label={"Email Address"}
        name={"email"}
        margin={"normal"}
      />
      <TextField
        variant={"outlined"}
        required
        fullWidth
        id={"password"}
        label={"Password"}
        name={"password"}
        margin={"normal"}
      />
      <RightButtonBar>
        <Button
          variant="contained"
          color="primary"
          onClick={props.handleCreateAdmin}
        >
          Create Admin
        </Button>
      </RightButtonBar>
    </form>
  );
}

SetupAdminForm.propTypes = {
    // Function for what to do when want to create an admin
    handleCreateAdmin: PropTypes.func.isRequired
};
