import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
      flexDirection: "column",
      marginTop: 20,
      marginBottom: 20,
      paddingTop: 30,
      paddingBottom: 30
    },
    button: {
      marginTop: 20
    }
  };
});

export default function NoHackathonCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography variant="h2">{props.admin ? "Tragic." : "Sorry."}</Typography>
      <Typography>There are no upcoming hackathons.</Typography>
      {props.admin ? (
        <Button
          onClick={props.createHackathon}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Create one now!
        </Button>
      ) : (
        <Typography>Check back soon!</Typography>
      )}
    </Card>
  );
}

NoHackathonCard.propTypes = {
  admin: PropTypes.bool,
  createHackathon: PropTypes.func
};
