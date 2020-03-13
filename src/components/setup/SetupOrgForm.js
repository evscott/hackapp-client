import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RightButtonBar from "../reusable/RightButtonBar";
import PropTypes from "prop-types";
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
 * This form allows a user to set up an organization by
 * specifying its name.
 * @param props The properties passed to the component. This
 * includes the trigger to handle when an organization should
 * be created.
 */
export default function SetupOrgForm(props) {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant={"outlined"}
        required
        fullWidth
        id={"org-name"}
        label={"Organization Name"}
        name={"org-name"}
        margin={"normal"}
      />
      <RightButtonBar>
        <Button
          variant="contained"
          color="primary"
          onClick={props.handleCreateOrg}
        >
          Create Organization
        </Button>
      </RightButtonBar>
    </form>
  );
}

SetupOrgForm.propTypes = {
  // Function for what to do when creating the organization
  handleCreateOrg: PropTypes.func.isRequired
};
