import Container from "@material-ui/core/Container";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

/**
 * This defines the styles for the React component.
 */
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

/**
 * A button bar where everything is arranged on the right side.
 * Typically used for navigating pages.
 * @param props The properties, including child elements.
 */
export default function RightButtonBar(props) {
  const classes = useStyles();
  return (
    <Container className={classes.rightButtonBox}>{props.children}</Container>
  );
}
