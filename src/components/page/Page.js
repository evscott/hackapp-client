import React from "react";
import AppBar from "./AppBar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "./Drawer";
import { largeDrawerWidth } from "./Drawer";
import PropTypes from "prop-types";
import DrawerList from "./DrawerList";

/**
 * The styles for a page in the UI.
 */
const useStyles = makeStyles(theme => {
  return {
    appBarContainer: {
      marginRight: 0,
      maxWidth: "none",
      padding: 0
    },
    content: {
      marginTop: 75,
      maxWidth: 650,
      marginBottom: 100,
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${largeDrawerWidth}px)`,
        marginLeft: `calc(${largeDrawerWidth}px + ((50% - ${0.5 *
          largeDrawerWidth}px) - 325px))`
      }
    },
    contentNoDrawer: {
      marginTop: 75,
      maxWidth: 650,
      marginBottom: 100
    },
    title: {
      paddingTop: 50
    }
  };
});

/**
 * A default template for a page in the application. It features a toolbar, a drawer,
 * and content that adapt to different screen sizes. Content gets injected using props.
 * @param props Contains drawerHeader, drawerPrimary, drawerSecondary, title, and
 * children.
 */
export default function Page(props) {
  const classes = useStyles();

  // Keep track of whether the drawer is open (mobile only)
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  /**
   * Toggles whether the drawer is open or not.
   */
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  /** Gets the drawer, if we need one for the page (based on props). */
  const getDrawer = () => {
    if (props.drawerPrimary) {
      return (
        <Drawer isOpen={drawerOpen} setIsOpen={toggleDrawer}>
          <DrawerList
            header={props.drawerHeader}
            primaryButtons={props.drawerPrimary}
            secondaryButtons={props.drawerSecondary}
          />
        </Drawer>
      );
    }
  };

  return (
    <div>
      <Container className={classes.appBarContainer}>
        <AppBar title={props.title} onClickMenu={toggleDrawer} noMenu />
      </Container>
      {getDrawer()}
      <Container
        className={
          props.drawerPrimary ? classes.content : classes.contentNoDrawer
        }
      >
        <Typography variant="h2" component="h1" className={classes.title}>
          {props.title}
        </Typography>
        {props.children}
      </Container>
    </div>
  );
}

Page.propTypes = {
  // A page must have some content
  children: PropTypes.any.isRequired,
  // The header components in the drawer
  drawerHeader: PropTypes.any,
  // A list of all primary (important) buttons.
  // Each button has the format {button: string, icon: component, onClick: func}
  drawerPrimary: PropTypes.array,
  // A list of all the secondary (less important) buttons.
  drawerSecondary: PropTypes.array,
  // The title of the page.
  title: PropTypes.string.isRequired
};
