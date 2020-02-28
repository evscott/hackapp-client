import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

/**
 * The styles for the list of items in the drawer.
 */
const useStyles = makeStyles(theme => {
  return {
    spacer: theme.mixins.toolbar,
    header: {
      height: 200,
      backgroundColor: theme.palette.primary.light,
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: 20
    }
  };
});

/**
 * A component which can be injected into a drawer that has two sections of list items
 * and one header.
 * @param props A header, a list of primaryButtons, and a list of secondaryButtons.
 */
export default function DrawerList(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.spacer} />
      <div className={classes.header}>{props.header}</div>
      <List>
        {props.primaryButtons.map(button => (
          <ListItem button key={button.text} onClick={button.onClick}>
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText primary={button.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {props.secondaryButtons.map(button => (
          <ListItem button key={button.text} onClick={button.onClick}>
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText primary={button.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

DrawerList.propTypes = {
  // The component with all the items to inject in the header of the drawer.
  header: PropTypes.any,
  // A list of all primary (important) buttons.
  // Each button has the format {button: string, icon: component, onClick: func}
  primaryButtons: PropTypes.array,
  // A list of all secondary (less important) buttons.
  secondaryButtons: PropTypes.array
};
