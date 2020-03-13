import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import RightButtonBar from "../reusable/RightButtonBar";
import ReorderableCard from "../reusable/ReorderableCard";
import RightSpeedDial from "./RightSpeedDial";

/** The styles for the component. */
const useStyles = makeStyles(theme => {
  return {
    button: {
      marginRight: 10
    },
    spacer: {
      marginBottom: 40
    },
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
    }
  };
});

/**
 * A form that has many cards that can be reordered and deleted as desired.
 * It also supports multiple modes: a view mode property can be passed that
 * will allow changing styles for viewing vs editing. It will not change the
 * conents of the cards themselves; that should be handled during the creation
 * of the children passed as a property.
 */
export default function ReorderableCardForm(props) {
  const classes = useStyles();

  /**
   * Gets the floating action button for switching between
   * viewMode and editMode.
   */
  const getFab = () => {
    return (
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => {
          if (props.setViewMode) {
            props.setViewMode(!props.viewMode);
          }
        }}
        variant="extended"
      >
        {props.viewMode ? (
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

  // Managing the keys of each text element is required for
  // React to get state management correct. So, keys are used here.
  const [keys, setKeys] = useState([...Array(props.array.length).keys()]);
  // We also need to know the key for the next card we add.
  const [nextKey, setNextKey] = useState(props.array.length);

  /**
   * Moves a card up or down. Checks if the destination is a valid
   * location.
   * @param fromIndex the index of the card to move.
   * @param toIndex the index of where the card should be moved to.
   */
  const moveCard = (fromIndex, toIndex) => {
    if (toIndex >= 0 && toIndex < props.array.length) {
      // First, set up the new array of items
      const newArray = [...props.array];
      newArray[fromIndex] = props.array[toIndex];
      newArray[toIndex] = props.array[fromIndex];
      props.setArray(newArray);
      // Then, set up the new array of keys for React components
      const newKeys = [...keys];
      newKeys[fromIndex] = keys[toIndex];
      newKeys[toIndex] = keys[fromIndex];
      setKeys(newKeys);
    }
  };

  /** Deletes a card and tells the parent to delete that item too. */
  const deleteCard = index => {
    // Only delete if there are at least two cards
    if (props.array.length > 1) {
      const newArray = [...props.array];
      newArray.splice(index, 1);
      props.setArray(newArray);
      // Now, perform key management for React
      const newKeys = [...keys];
      newKeys.splice(index, 1);
      setKeys(newKeys);
    }
  };

  /**
   * Adds a new card and asks the parent to create a new item to put in.
   * @param index the index where the card should be added
   * @param getNewItem the function to create a new item
   */
  const addCard = (index, getNewItem) => {
    const newArray = [...props.array];
    newArray.splice(index + 1, 0, getNewItem());
    props.setArray(newArray);
    // Now, perform key management for React
    const newKeys = [...keys];
    newKeys.splice(index + 1, 0, nextKey);
    setNextKey(nextKey + 1);
    setKeys(newKeys);
  };

  return (
    <div>
      {props.array.map((txt, idx) => (
        <React.Fragment key={keys[idx]}>
          <ReorderableCard
            onMoveUp={() => moveCard(idx, idx - 1)}
            onMoveDown={() => moveCard(idx, idx + 1)}
            onDelete={() => deleteCard(idx)}
          >
            {props.getCardContents(idx)}
          </ReorderableCard>
          <RightSpeedDial hidden={props.speedDialHidden}>
            {props.speedDialItems.map((item, actionNumber) => (
              <SpeedDialAction
                key={actionNumber}
                icon={item.icon}
                tooltipTitle={item.title}
                onClick={() => addCard(idx, item.getNewItem)}
              />
            ))}
          </RightSpeedDial>
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
      {props.setViewMode ? getFab() : ""}
    </div>
  );
}

ReorderableCardForm.propTypes = {
  // A mystery array. Each item becomes a card, which is created using
  // getCardContents (a function from the parent).
  array: PropTypes.array.isRequired,
  // Sets the array
  setArray: PropTypes.func.isRequired,
  // Goes to the previous page
  prvPage: PropTypes.func.isRequired,
  // Goes to the next page
  nextPage: PropTypes.func.isRequired,
  // Gets the contents that go into a card, given the current index
  getCardContents: PropTypes.func.isRequired,
  // A list of options for creating new cards. Each option should have
  // an icon, title, and function for actually creating the new item and
  // putting the blank item in the mystery array.
  speedDialItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object,
      title: PropTypes.string,
      getNewItem: PropTypes.func
    })
  ).isRequired,
  // Whether to hide the speed dial options for creating cards
  speedDialHidden: PropTypes.bool,
  // Whether we are in view mode or not
  viewMode: PropTypes.bool,
  // A setter for going into view mode. If not set, we do not have a view mode
  // and the floating action button for setting it does not exist.
  setViewMode: PropTypes.func
};
