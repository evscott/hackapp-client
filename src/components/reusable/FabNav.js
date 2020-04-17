import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

/** The styles for the component. */
const useStyles = makeStyles(theme => {
  return {
    fabBox: {
      position: "fixed",
      right: 20,
      bottom: 20,
      zIndex: 1051
    },
    icon: {
      marginRight: 10
    },
    fab: {
      marginLeft: 10
    },
    fabContents: {
      display: "flex",
      alignItems: "center"
    }
  };
});

/**
 * A navigation floating action button that appears at the bottom
 * right of every page in major flows of the application. It has a
 * right/left button as well as a preview/edit button for pages that
 * require the feature.
 */
export default function FabNav(props) {
  const classes = useStyles();

  /** Gets the back button, if the back button function defined */
  const getBackButton = () => {
    if (props.onClickBack) {
      return (
        <Tooltip title={props.backText} arrow>
          <Fab
            className={classes.fab}
            color="primary"
            onClick={props.onClickBack}
            size="medium"
          >
            <ArrowBackIcon />
          </Fab>
        </Tooltip>
      );
    }
  };

  /** Gets the next button, if the next button function defined */
  const getNextButton = () => {
    if (props.onClickNext) {
      return (
        <Tooltip title={props.nextText} arrow>
          <Fab
            className={classes.fab}
            color="primary"
            onClick={props.onClickNext}
          >
            <ArrowForwardIcon />
          </Fab>
        </Tooltip>
      );
    }
  };

  const getPreviewButton = () => {
    if (props.onClickPreview) {
      return (
        <Tooltip title={props.viewMode ? "Edit" : "Preview"} arrow>
          <Fab onClick={props.onClickPreview} color="secondary" size="medium">
            {props.viewMode ? <EditIcon /> : <VisibilityIcon />}
          </Fab>
        </Tooltip>
      );
    }
  };

  return (
    <React.Fragment>
      <div className={classes.fabBox}>
        {getPreviewButton()}
        {getBackButton()}
        {getNextButton()}
      </div>
    </React.Fragment>
  );
}

FabNav.propTypes = {
  // Function for what happens when click preview
  // (if undefined, preview button is hidden)
  onClickPreview: PropTypes.func,
  // Whether we're in view mode (only needed if the preview
  // button is used for the page).
  viewMode: PropTypes.bool,
  // Function for what happens when click the next button
  // (if undefined, next button is hidden)
  onClickNext: PropTypes.func,
  // Function for what happens when click the back button
  // (if undefined, back button is hidden)
  onClickBack: PropTypes.func,
  // The text for the tooltip for the next button
  nextText: PropTypes.string,
  // The text for the tooltip for the back button
  backText: PropTypes.string
};
