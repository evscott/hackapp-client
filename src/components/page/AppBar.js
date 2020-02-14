import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";

const scrollThreshold = 100;

const useStyles = makeStyles(theme => {
  return {
    appBar: {
      position: "fixed",
      top: 0,
      zIndex: 1301 // Ensures it is in front of any drawers
    },
    container: {
      position: "relative",
      overflow: "hidden",
      height: 120
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
    megaTitle: {
      display: "none",
      marginLeft: 25
    },
    menu: {
      display: "inline-block",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  };
});

export default function AppBarComponent(props) {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = event => {
      let scrollTop = window.pageYOffset;
      if (scrollTop > scrollThreshold && expanded) {
        setExpanded(false);
      } else if (scrollTop <= scrollThreshold) {
        setExpanded(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

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
            <Typography
              component="h6"
              variant="h6"
              className={classes.title}
              nowrap="true"
            >
              {props.title ? props.title : "HackApp"}
            </Typography>
          </div>
          <div className={classes.appBarRight}>
            <IconButton
              color="inherit"
              aria-label="account of the current user"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
        <Typography
          component="p"
          variant="h6"
          className={expanded ? classes.megaTitleExpanded : classes.megaTitle}
          nowrap="true"
        >
          {props.title ? props.title : "HackApp"}
        </Typography>
      </div>
    </AppBar>
  );
}

AppBarComponent.propTypes = {
  title: PropTypes.string,
  onClickMenu: PropTypes.func.isRequired
};
