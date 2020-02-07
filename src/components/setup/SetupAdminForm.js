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
