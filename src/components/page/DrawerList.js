import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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

export default function DrawerList(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.spacer} />
      <div className={classes.header}>
        {props.header}
      </div>
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
  header: PropTypes.any,
  primaryButtons: PropTypes.array,
  secondaryButtons: PropTypes.array
};
