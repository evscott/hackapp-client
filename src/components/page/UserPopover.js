import React from "react";
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
import PropTypes from "prop-types";
import hackathonImg from "../../img/hackathon-default.jpg";

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
    }
  };
});

/**
 * A popover card that displays some user information.
 * @param props The anchor and closePopover method for managing when the popover
 * is visible, and the user name and userType.
 */
export default function UserPopover(props) {
  const classes = useStyles();
  const open = Boolean(props.anchor);
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
      <Card>
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
            {props.userType}
          </Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.button} size="small" color="primary">
            <SettingsIcon className={classes.icon} />
            User Settings
          </Button>
          <Button className={classes.button} size="small" color="primary">
            <ExitIcon className={classes.icon} />
            Sign Out
          </Button>
        </CardActions>
      </Card>
    </Popover>
  );
}

UserPopover.propTypes = {
  // The element to which the popover is anchored/positioned
  anchor: PropTypes.object,
  // The function that closes the popover
  closePopover: PropTypes.func.isRequired,
  // The name of the popover
  name: PropTypes.string.isRequired,
  // The type of the user (admin, etc)
  userType: PropTypes.string.isRequired
};
