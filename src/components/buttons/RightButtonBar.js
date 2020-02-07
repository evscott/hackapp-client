import Container from "@material-ui/core/Container";
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  return {
    rightButtonBox: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      margin: "10px 0",
      padding: 0
    }
  };
});

const RightButtonBar = props => {
  const classes = useStyles();
  return (
    <Container className={classes.rightButtonBox}>
      {props.children}
    </Container>
  );
};

export default RightButtonBar;
