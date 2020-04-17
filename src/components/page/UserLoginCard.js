import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

/**
 * Styles for the user card.
 */
const useStyles = makeStyles(theme => {
  return {
    content: {
      paddingBottom: 0,
      textAlign: "center"
    },
    button: {
      padding: 5,
      margin: 3
    },
    icon: {
      marginRight: 5
    }
  };
});

/**
 * A card with buttons that allow a user to log in or sign up.
 * Clicking one of the buttons will call functions passed as props.
 */
export default function UserLoginCard(props) {
  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography variant="h6" component="p">
          Join the hacker community.
        </Typography>
      </CardContent>
      <CardActions className={classes.centered}>
        <Button
          className={classes.button}
          size="small"
          color="primary"
          onClick={props.onSignUp}
        >
          <PersonAddIcon className={classes.icon} />
          Sign Up
        </Button>
        <Button
          className={classes.button}
          size="small"
          color="primary"
          onClick={props.onSignIn}
        >
          <ArrowForwardIcon className={classes.icon} />
          Sign In
        </Button>
      </CardActions>
    </Card>
  )
}

UserLoginCard.propTypes = {
  // Function called when click sign out
  onSignUp: PropTypes.func.isRequired,
  // Function called when click sign in
  onSignIn: PropTypes.func.isRequired,
};
