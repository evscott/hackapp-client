import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return {
    appBar: {
      position: "relative",
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
    appBarItem: {
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

export default function AppBarComponent(props) {
  const classes = useStyles();
  return (
    <div className={classes.appBar}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
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
              className={classes.appBarItem}
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
      </AppBar>
    </div>
  );
}

AppBarComponent.propTypes = {
  title: PropTypes.string,
  onClickMenu: PropTypes.func.isRequired
};
