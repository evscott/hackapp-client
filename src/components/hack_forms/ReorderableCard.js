import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => {
  return {
    card: {
      position: "relative",
      marginTop: 20,
      marginBottom: 20
    },
    content: {
      float: "left",
      position: "relative",
      width: "calc(100% - 40px)"
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
    icon: {
      color: theme.palette.primary.contrastText
    }
  };
});

export default function ReorderableCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.content}>
        {props.children}
      </div>
      <div className={classes.sidebar}>
        <IconButton
          className={classes.icon}
          onClick={props.onMoveUp}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton
          className={classes.icon}
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          className={classes.icon}
          onClick={props.onMoveDown}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
    </Card>
  );
}

ReorderableCard.propTypes = {
  onMoveUp: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired
};
