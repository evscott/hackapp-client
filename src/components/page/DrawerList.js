import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => {
  return {
    spacer: theme.mixins.toolbar,
    header: {
      height: 150,
      backgroundColor: theme.palette.primary.light
    }
  };
});

export default function DrawerList(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.spacer} />
      <div className={classes.header} />
      <List>
        {props.primaryButtons.map(button => (
          <ListItem button key={button.text}>
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText primary={button.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {props.secondaryButtons.map(button => (
          <ListItem button key={button.text}>
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText primary={button.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

DrawerList.propTypes = {
  primaryButtons: PropTypes.array,
  secondaryButtons: PropTypes.array
};
