import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import UserPopover from "./UserPopover";

// The theshold scroll value where the app bar gets a title
// (it is hidden before since the title is elsewhere on the page).
const scrollThreshold = 130;

/**
 * The styles for the app bar.
 */
const useStyles = makeStyles(theme => {
  return {
    appBar: {
      position: "fixed",
      top: 0,
      zIndex: 1301 // Ensures it is in front of any drawers
    },
    appBarLeft: {
      marginLeft: "20px",
      position: "absolute",
      left: 0
    },
    appBarRight: {
      marginRight: "20px",
      position: "absolute",
      right: 0
    },
    title: {
      display: "inline-block",
      padding: "0 10px",
      verticalAlign: "middle"
    },
    menu: {
      display: "inline-block",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  };
});

/**
 * The app bar at the top of the page most of the time in the application.
 * @param props The title and onClickMenu (what clicking the menu button does).
 */
export default function AppBarComponent(props) {
  // Keep track of whether we have scrolled or not
  const [scrolled, setScrolled] = useState(false);

  // Whenever we scroll, have an effect
  useEffect(() => {
    /**
     * When scroll down, set that we have scrolled beyond the threshold.
     * When scroll up, set that we have scrolled back before the threshold.
     */
    const handleScroll = () => {
      let scrollTop = window.pageYOffset;
      if (scrollTop > scrollThreshold && !scrolled) {
        setScrolled(true);
      } else if (scrollTop <= scrollThreshold && scrolled) {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // When component dismounts, remove listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // For storing the state of whethr the popover is open and what element
  // it is attached to
  const [popoverAnchor, setPopoverAnchor] = React.useState(null);

  /**
   * Opens/closes the popover
   * @param event The event triggering the toggle with an anchor to use.
   */
  const togglePopover = (event) => {
    if(popoverAnchor === null) {
      setPopoverAnchor(event.currentTarget);
    } else {
      setPopoverAnchor(null);
    }
  };

  /**
   * Closes the popover.
   */
  const closePopover = () => {
    setPopoverAnchor(null);
  };

  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static">
      <div className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.appBarLeft}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              className={classes.menu}
              onClick={props.onClickMenu}
            >
              <MenuIcon />
            </IconButton>
            <Fade in={scrolled}>
              <Typography
                component="h6"
                variant="h6"
                className={classes.title}
                nowrap="true"
              >
                {props.title}
              </Typography>
            </Fade>
          </div>
          <div className={classes.appBarRight}>
            <IconButton
              color="inherit"
              aria-label="account of the current user"
              onClick={togglePopover}
            >
              <AccountCircle />
            </IconButton>
            <UserPopover
              anchor={popoverAnchor}
              closePopover={closePopover}
              name="Graeme Zinck"
              userType="Admin"
            />
          </div>
        </Toolbar>
      </div>
    </AppBar>
  );
}

AppBarComponent.propTypes = {
  // The page's title (only visible after scrolling)
  title: PropTypes.string,
  // A function with what clicking the menu button does (i.e., open a drawer).
  onClickMenu: PropTypes.func.isRequired
};
