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
      backgroundColor: theme.palette.type === "dark" ? theme.palette.primary.dark : theme.palette.primary.light,
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: 20
    },
    highlighted: {
      backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : theme.palette.grey[200]
    },
    highlightedText: {
      fontWeight: 700
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

  /** Gets the list of secondary buttons, if needed. */
  const getSecondaryList = () => {
    if (props.secondaryButtons) {
      return (
        <List>
          {props.secondaryButtons.map(button => (
            <ListItem
              button
              key={button.text}
              onClick={button.onClick}
              className={button.highlighted ? classes.highlighted : ""}
            >
              <ListItemIcon>{button.icon}</ListItemIcon>
              <ListItemText
                classes={
                  button.highlighted ? { primary: classes.highlightedText } : {}
                }
                primary={button.text}
              />
            </ListItem>
          ))}
        </List>
      );
    }
  };

  return (
    <div>
      <div className={classes.spacer} />
      <div className={classes.header}>{props.header}</div>
      <List>
        {props.primaryButtons.map(button => (
          <ListItem
            button
            key={button.text}
            onClick={button.onClick}
            className={button.highlighted ? classes.highlighted : ""}
          >
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText
              classes={
                button.highlighted ? { primary: classes.highlightedText } : {}
              }
              primary={button.text}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      {getSecondaryList()}
    </div>
  );
}

DrawerList.propTypes = {
  // The component with all the items to inject in the header of the drawer.
  header: PropTypes.any,
  // A list of all primary (important) buttons.
  // Each button has the format {button: string, icon: component, onClick: func}
  primaryButtons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object.isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      highlighted: PropTypes.bool
    })
  ).isRequired,
  // A list of all secondary (less important) buttons.
  secondaryButtons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object.isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      highlighted: PropTypes.bool
    })
  )
};
