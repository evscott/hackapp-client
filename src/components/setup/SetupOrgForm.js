import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RightButtonBar from "../buttons/RightButtonBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return {
    form: {
      width: "100%",
      marginTop: theme.spacing(1)
    }
  };
});

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
