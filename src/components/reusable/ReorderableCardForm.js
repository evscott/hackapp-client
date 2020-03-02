import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./markdown/mde-override-styles.css";
import Button from "@material-ui/core/Button";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import RightButtonBar from "../reusable/RightButtonBar";
import ReorderableCard from "../reusable/ReorderableCard";
import RightSpeedDial from "./RightSpeedDial";

const useStyles = makeStyles(theme => {
  return {
    button: {
      marginRight: 10
    },
    spacer: {
      marginBottom: 40
    }
  };
});

export default function ReorderableCardForm(props) {
  const classes = useStyles();

  // Managing the IDs of each text element is required for
  // React to get state management correct.
  const [keys, setKeys] = useState([...Array(props.array.length).keys()]);
  const [nextKey, setNextKey] = useState(props.array.length);

  const moveCard = (fromIndex, toIndex) => {
    if (toIndex >= 0 && toIndex < props.array.length) {
      const newArray = [...props.array];
      newArray[fromIndex] = props.array[toIndex];
      newArray[toIndex] = props.array[fromIndex];
      props.setArray(newArray);
      const newKeys = [...keys];
      newKeys[fromIndex] = keys[toIndex];
      newKeys[toIndex] = keys[fromIndex];
      setKeys(newKeys);
    }
  };

  const deleteCard = index => {
    // Only delete if there are at least two cards
    if (props.array.length > 1) {
      const newArray = [...props.array];
      newArray.splice(index, 1);
      props.setArray(newArray);
      const newKeys = [...keys];
      newKeys.splice(index, 1);
      setKeys(newKeys);
    }
  };

  const addCard = (index, getNewItem) => {
    const newArray = [...props.array];
    newArray.splice(index + 1, 0, getNewItem());
    props.setArray(newArray);
    const newKeys = [...keys];
    newKeys.splice(index + 1, 0, nextKey);
    setNextKey(nextKey + 1);
    setKeys(newKeys);
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
      {props.fab ? props.fab : ""}
    </div>
  );
}

ReorderableCardForm.propTypes = {
  array: PropTypes.array.isRequired,
  setArray: PropTypes.func.isRequired,
  prvPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  getCardContents: PropTypes.func.isRequired,
  speedDialItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object,
      title: PropTypes.string,
      getNewItem: PropTypes.func
    })
  ).isRequired,
  speedDialHidden: PropTypes.bool,
  fab: PropTypes.object
};
