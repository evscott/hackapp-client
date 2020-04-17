import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

/** Styles for the component */
const useStyles = makeStyles(theme => {
  return {
    root: {
      display: "flex",
      minHeight: 150,
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      marginTop: 20,
      marginBottom: 20
    },
    text: {
      marginLeft: 15
    }
  };
});

/** A pretty loading card */
export default function LoadingCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CircularProgress />
      <Typography className={classes.text}>
        {props.message || "Loading..."}
      </Typography>
    </Card>
  );
}

LoadingCard.propTypes = {
  message: PropTypes.string
};
