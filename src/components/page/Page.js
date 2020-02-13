import React from "react";
import AppBar from "./AppBar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "./Drawer";
import { drawerWidth } from "./Drawer";
import PropTypes from "prop-types";
import DrawerList from "./DrawerList";

const useStyles = makeStyles(theme => {
  return {
    appBarContainer: {
      marginRight: 0,
      maxWidth: "none",
      padding: 0
    },
    content: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      }
    }
  };
});

export default function Page(props) {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleMenu = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <Container className={classes.appBarContainer}>
        <AppBar title="Dashboard" onClickMenu={toggleMenu} />
      </Container>
      <Drawer className={classes.drawer} isOpen={drawerOpen} setIsOpen={toggleMenu}>
        <DrawerList primaryButtons={props.drawerPrimary} secondaryButtons={props.drawerSecondary}/>
      </Drawer>
      <Container className={classes.content}>
        {props.children}
      </Container>
    </div>
  );
}

Drawer.propTypes = {
  drawerPrimary: PropTypes.array.isRequired,
  drawerSecondary: PropTypes.array.isRequired
};
