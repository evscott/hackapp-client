import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

/** The styles for the component. */
const useStyles = makeStyles(theme => {
  return {
    card: {
      position: "relative",
      marginTop: 20,
      marginBottom: 20,
      minHeight: 150
    },
    content: {
      float: "left",
      position: "relative",
      width: "calc(100% - 40px)"
    },
    contentBig: {
      float: "left",
      position: "relative",
      width: "100%"
    },
    sidebar: {
      float: "left",
      clear: "none",
      width: 40,
      display: "flex",
      position: "absolute",
      top: 0,
      right: 0,
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      backgroundColor: theme.palette.primary.main
    },
    sidebarHidden: {
      display: "none"
    },
    icon: {
      color: theme.palette.primary.contrastText
    }
  };
});

/**
 * A card with buttons for reordering it. It can be moved up and down
 * or trashed entirely, depending on the button pressed.
 * It should always be given children to display.
 */
export default function ReorderableCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div
        className={
          props.viewMode ? classes.contentBig : classes.content
        }
      >
        {props.children}
      </div>
      <div
        className={
          props.viewMode ? classes.sidebarHidden : classes.sidebar
        }
      >
        <IconButton className={classes.icon} onClick={props.onMoveUp}>
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton className={classes.icon} onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton className={classes.icon} onClick={props.onMoveDown}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
    </Card>
  );
}

ReorderableCard.propTypes = {
  // What happens when moving the card up
  onMoveUp: PropTypes.func.isRequired,
  // What happens when we try to delete the card
  onDelete: PropTypes.func.isRequired,
  // What happens when moving the card down
  onMoveDown: PropTypes.func.isRequired,
  // Disables the reordering and hides those functions
  viewMode: PropTypes.bool
};
