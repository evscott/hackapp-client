import React from "react";
import AppBar from "./AppBar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "./Drawer";
import { largeDrawerWidth } from "./Drawer";
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
      marginTop: 75,
      maxWidth: 700,
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${largeDrawerWidth}px)`,
        marginLeft: `calc(${largeDrawerWidth}px + ((50% - ${0.5 * largeDrawerWidth}px) - 350px))`
      }
    },
    title: {
      paddingTop: 50
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
        <AppBar title={props.title} onClickMenu={toggleMenu} />
      </Container>
      <Drawer
        className={classes.drawer}
        isOpen={drawerOpen}
        setIsOpen={toggleMenu}
      >
        <DrawerList
          header={props.drawerHeader}
          primaryButtons={props.drawerPrimary}
          secondaryButtons={props.drawerSecondary}
        />
      </Drawer>
      <Container className={classes.content}>
        <Typography
          variant="h2"
          component="h1"
          className={classes.title}
        >
          {props.title}
        </Typography>
        {props.children}
      </Container>
    </div>
  );
}

Drawer.propTypes = {
  drawerHeader: PropTypes.any,
  drawerPrimary: PropTypes.array,
  drawerSecondary: PropTypes.array,
  title: PropTypes.string
};
