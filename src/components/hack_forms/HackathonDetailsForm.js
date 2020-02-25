import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./markdown/mde-override-styles.css";
import MdEditor from "./markdown/MdEditor";
import Button from "@material-ui/core/Button";
import RightButtonBar from "../buttons/RightButtonBar";
import ReorderableCard from "./ReorderableCard";

const useStyles = makeStyles(theme => {
  return {
    root: {},
    fab: {
      position: "fixed",
      right: 20,
      bottom: 20
    },
    icon: {
      marginRight: 10
    },
    fabContents: {
      display: "flex",
      alignItems: "center"
    },
    button: {
      marginRight: 10
    }
  };
});

export default function HackathonDetailsForm(props) {
  const classes = useStyles();

  const [text, setText] = useState("**HELLO WORLD**");
  const [viewMode, setViewMode] = useState(false);

  const getFab = () => {
    return (
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => setViewMode(!viewMode)}
        variant="extended"
      >
        {viewMode ? (
          <div className={classes.fabContents}>
            <EditIcon className={classes.icon}/>
            <Typography variant="button" display="inline">Edit</Typography>
          </div>
        ) : (
          <div className={classes.fabContents}>
            <VisibilityIcon className={classes.icon} />
            <Typography variant="button" display="inline">Preview</Typography>
          </div>
        )}
      </Fab>
    );
  };

  return (
    <div className={classes.root}>
      <ReorderableCard>
        <MdEditor text={text} setText={setText} view={viewMode} />
      </ReorderableCard>
      <RightButtonBar>
        <Button
          className={classes.button}
          onClick={props.prvPage}
          size="large"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={props.nextPage}
        >
          Next
        </Button>
      </RightButtonBar>
      {getFab()}
    </div>
  );
}

HackathonDetailsForm.propTypes = {
  prvPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
};
