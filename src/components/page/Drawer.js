import React from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

export const drawerWidth = 240;

const useStyles = makeStyles(theme => {
  return {
    drawerPaper: {
      width: drawerWidth
    }
  }
});

export default function DrawerMenu(props) {
  const classes = useStyles();
  return (
    <nav className={classes.drawer} aria-label="drawer menu">
      {/* Open-up drawer for smaller screen sizes */}
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor="left"
          open={props.isOpen}
          onClose={() => props.setIsOpen(!props.isOpen)}
          ModalProps={{
            keepMounted: true // better mobile performance
          }}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {props.children}
        </Drawer>
      </Hidden>
      {/* Permanent drawer for larger screen sizes */}
      <Hidden smDown implementation="js">
        <Drawer
          variant="permanent"
          anchor="left"
          classes={{
            paper: classes.drawerPaper,
          }}
          open
        >
          {props.children}
        </Drawer>
      </Hidden>
    </nav>
  );
}

DrawerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
