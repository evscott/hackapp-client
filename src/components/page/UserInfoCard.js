import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import ExitIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import hackathonImg from "../../img/hackathon-default.jpg";

/**
 * Styles for the user card.
 */
const useStyles = makeStyles(theme => {
  return {
    content: {
      paddingBottom: 0,
      textAlign: "center"
    },
    media: {
      height: 100
    },
    button: {
      padding: 5,
      margin: 3
    },
    icon: {
      marginRight: 5
    },
    centered: {
      display: "flex",
      alignContent: "flex-end",
      justifyContent: "flex-end"
    }
  };
});

/**
 * A card with all of the information about a user. It also has a
 * button for signing out, which calls the prop function.
 */
export default function UserInfoCard(props) {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={hackathonImg}
        title="User Profile"
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" component="p">
          {props.name || "Anonymous User"}
        </Typography>
        <Typography variant="body1" component="p">
          {props.details || "User"}
        </Typography>
      </CardContent>
      <CardActions className={classes.centered}>
        <Button
          className={classes.button}
          size="small"
          color="primary"
          onClick={props.onSettings}
        >
          <SettingsIcon className={classes.icon} />
          User Settings
        </Button>
        <Button
          className={classes.button}
          size="small"
          color="primary"
          onClick={props.onSignOut}
        >
          <ExitIcon className={classes.icon} />
          Sign Out
        </Button>
      </CardActions>
    </Card>
  );
}

UserInfoCard.propTypes = {
  // The user's name
  name: PropTypes.string,
  // The details about the user (such as user type)
  details: PropTypes.string,
  // Function called when click sign out
  onSignOut: PropTypes.func.isRequired,
  // Function called when click user settings
  onSettings: PropTypes.func.isRequired
};
