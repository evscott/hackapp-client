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
import RightButtonBar from "../reusable/RightButtonBar";
import ReorderableCard from "../reusable/ReorderableCard";
import HackathonDetailsSpeedDial from "./HackathonDetailsSpeedDial";

const useStyles = makeStyles(theme => {
  return {
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
      marginBottom: 40
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

  const moveCard = (fromIndex, toIndex) => {
    if(toIndex >= 0 && toIndex < ids.length) {
      const newText = [...text];
      newText[fromIndex] = text[toIndex];
      newText[toIndex] = text[fromIndex];
      setText(newText);
      const newIds = [...ids];
      newIds[fromIndex] = ids[toIndex];
      newIds[toIndex] = ids[fromIndex];
      setIds(newIds);
    }
  };

  const deleteCard = (index) => {
    // Only delete if there are at least two cards
    if (text.length > 1) {
      const newText = [...text];
      newText.splice(index, 1);
      setText(newText);
      const newIds = [...ids];
      newIds.splice(index, 1);
      setIds(newIds);
    }
  };

  const addCard = (index) => {
    const newText = [...text];
    newText.splice(index + 1, 0, "");
    setText(newText);
    const newIds = [...ids];
    newIds.splice(index + 1, 0, nextId);
    setNextId(nextId + 1);
    setIds(newIds);
  };

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
    <div>
      {text.map((txt, idx) => (
        <React.Fragment key={ids[idx]}>
          <ReorderableCard
            onMoveUp={() => moveCard(idx, idx - 1)}
            onMoveDown={() => moveCard(idx, idx + 1)}
            onDelete={() => deleteCard(idx)}
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
          <HackathonDetailsSpeedDial
            hidden={viewMode}
            addText={() => addCard(idx)}
            addImage={() => console.log("Not implemented yet.")}
          />
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
