import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ExitIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PropTypes from "prop-types";
import hackathonImg from "../../img/hackathon-default.jpg";
import { signOut } from "../../redux/actions/userActions";

/**
 * Styles for the user popover.
 */
const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: 20
    },
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
 * A popover card that displays some user information.
 * @param props The anchor and closePopover method for managing when the popover
 * is visible, and the user name and userType.
 */
function UserPopover(props) {
  const classes = useStyles();
  const open = Boolean(props.anchor);

  /** Gets the content of the popover based on if the user is logged in. */
  const getCardContent = () => {
    if (!props.loggedIn) {
      return (
        <React.Fragment>
          <CardContent className={classes.content}>
            <Typography variant="h6" component="p">
              Join the hacker community.
            </Typography>
          </CardContent>
          <CardActions className={classes.centered}>
            <Button className={classes.button} size="small" color="primary">
              <PersonAddIcon className={classes.icon} />
              Sign Up
            </Button>
            <Button className={classes.button} size="small" color="primary">
              <ArrowForwardIcon className={classes.icon} />
              Sign In
            </Button>
          </CardActions>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CardMedia
            className={classes.media}
            image={hackathonImg}
            title="User Profile"
          />
          <CardContent className={classes.content}>
            <Typography variant="h6" component="p">
              {props.name}
            </Typography>
            <Typography variant="body1" component="p">
              {props.details}
            </Typography>
          </CardContent>
          <CardActions className={classes.centered}>
            <Button className={classes.button} size="small" color="primary">
              <SettingsIcon className={classes.icon} />
              User Settings
            </Button>
            <Button
              className={classes.button}
              size="small"
              color="primary"
              onClick={() => {
                props.closePopover();
                props.signOut();
              }}
            >
              <ExitIcon className={classes.icon} />
              Sign Out
            </Button>
          </CardActions>
        </React.Fragment>
      );
    }
  };

  return (
    <Popover
      classes={{
        paper: classes.root
      }}
      open={open}
      id="user-popover"
      anchorEl={props.anchor}
      onClose={props.closePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
    >
      <Card>{getCardContent()}</Card>
    </Popover>
  );
}

UserPopover.propTypes = {
  // The element to which the popover is anchored/positioned
  anchor: PropTypes.object,
  // The function that closes the popover
  closePopover: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  if (state.user.loggedIn) {
    return {
      name: `${state.user.firstName} ${state.user.lastName}`,
      details: state.user.admin ? "Admin" : "User",
      loggedIn: true
    };
  } else {
    return {
      loggedIn: false
    };
  }
};

export default connect(mapStateToProps, { signOut })(UserPopover);
