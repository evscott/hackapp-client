import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./markdown/mde-override-styles.css";
import MdEditor from "./markdown/MdEditor";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SubjectIcon from "@material-ui/icons/Subject";
import ImageIcon from "@material-ui/icons/Image";
import RightButtonBar from "../buttons/RightButtonBar";
import ReorderableCard from "./ReorderableCard";

const useStyles = makeStyles(theme => {
  return {
    root: {},
    fab: {
      position: "fixed",
      right: 20,
      bottom: 20,
      zIndex: 1051
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
    },
    spacer: {
      marginBottom: 75
    },
    speedDial: {
      position: "relative",
      top: -37,
      right: -25,
      marginBottom: -75
    },
    speedDialFab: {
      backgroundColor: theme.palette.secondary.main
    }
  };
});

export default function HackathonDetailsForm(props) {
  const classes = useStyles();

  const [text, setText] = useState(["# What the Hack?", "Heck"]);
  // Managing the IDs of each text element is required for
  // React to get state management correct.
  const [ids, setIds] = useState([1, 2]);
  const [nextId, setNextId] = useState(3);
  const [viewMode, setViewMode] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

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
            <EditIcon className={classes.icon} />
            <Typography variant="button" display="inline">
              Edit
            </Typography>
          </div>
        ) : (
          <div className={classes.fabContents}>
            <VisibilityIcon className={classes.icon} />
            <Typography variant="button" display="inline">
              Preview
            </Typography>
          </div>
        )}
      </Fab>
    );
  };

  return (
    <div className={classes.root}>
      {text.map((txt, idx) => (
        <React.Fragment key={ids[idx]}>
          <ReorderableCard
            onMoveUp={() => {
              // Move the item one position higher
              if (idx > 0) {
                const newText = [...text];
                newText[idx] = text[idx - 1];
                newText[idx - 1] = text[idx];
                setText(newText);
                const newIds = [...ids];
                newIds[idx] = ids[idx - 1];
                newIds[idx - 1] = ids[idx];
                setIds(newIds);
              }
            }}
            onMoveDown={() => {
              // Move the item one position lower
              if (idx < text.length - 1) {
                const newText = [...text];
                newText[idx] = text[idx + 1];
                newText[idx + 1] = text[idx];
                setText(newText);
                const newIds = [...ids];
                newIds[idx] = ids[idx + 1];
                newIds[idx + 1] = ids[idx];
                setIds(newIds);
              }
            }}
            onDelete={() => {
              if (text.length > 1) {
                // Delete the item from the list
                const newText = [...text];
                newText.splice(idx, 1);
                setText(newText);
                const newIds = [...ids];
                newIds.splice(idx, 1);
                setIds(newIds);
              }
            }}
          >
            <MdEditor
              text={txt}
              setText={newTxt => {
                const newText = [...text];
                newText[idx] = newTxt;
                setText(newText);
              }}
              view={viewMode}
            />
          </ReorderableCard>
          <SpeedDial
            ariaLabel="Add Component"
            className={classes.speedDial}
            classes={{
              fab: classes.speedDialFab
            }}
            icon={<SpeedDialIcon />}
            onClose={() => setOptionsOpen(false)}
            onOpen={() => setOptionsOpen(true)}
            open={optionsOpen}
            direction="left"
          >
            <SpeedDialAction
              icon={<SubjectIcon />}
              tooltipTitle="Add Text"
              onClick={() => {
                const newText = [...text];
                newText.splice(idx + 1, 0, "");
                setText(newText);
                const newIds = [...ids];
                newIds.splice(idx + 1, 0, nextId);
                setNextId(nextId + 1);
                setIds(newIds);
              }}
            />
            <SpeedDialAction
              icon={<ImageIcon />}
              tooltipTitle="Add Image"
              onClick={() => console.log("WOO")}
            />
          </SpeedDial>
        </React.Fragment>
      ))}
      <div className={classes.spacer} />
      <RightButtonBar>
        <Button className={classes.button} onClick={props.prvPage} size="large">
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
