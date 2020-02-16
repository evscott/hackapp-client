import React from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

// The width of the drawer on mobile
export const drawerWidth = 240;
// The width of the drawer for desktop
export const largeDrawerWidth = 320;

/**
 * The styles for a drawer menu on the left side of the screen.
 * Adapts to different screen sizes, and stays behind the app bar.
 * Enlarges when the screen size is big enough.
 */
const useStyles = makeStyles(theme => {
  return {
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up("md")]: {
        width: largeDrawerWidth
      }
    }
  };
});

/**
 * The drawer menu on the left side of the screen. The items contained in it should
 * be passed as children, typically a DrawerList.
 * @param props Contains children, isOpen, setIsOpen.
 */
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
            paper: classes.drawerPaper
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
  // Must have content in the drawer
  children: PropTypes.any.isRequired,
  // Whether the drawer is open or not. This is controlled within a Page component
  // so that a menu button can toggle it.
  isOpen: PropTypes.bool.isRequired,
  // The setter method to open/close the drawer.
  setIsOpen: PropTypes.func.isRequired
};
