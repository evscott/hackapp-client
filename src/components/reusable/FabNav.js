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

export default function FabNav(props) {
  const classes = useStyles();

  const getBackButton = () => {
    if (props.onClickPrev) {
      return (
        <Tooltip title={props.prevText}>
          <Fab
            className={classes.fab}
            color="primary"
            onClick={props.onClickPrev}
            size="medium"
          >
            <ArrowBackIcon />
          </Fab>
        </Tooltip>
      );
    }
  };

  const getNextButton = () => {
    return (
      <Tooltip title={props.nextText}>
        <Fab
          className={classes.fab}
          color="primary"
          onClick={props.onClickNext}
        >
          <ArrowForwardIcon />
        </Fab>
      </Tooltip>
    );
  };

  const getPreviewButton = () => {
    if (props.onClickPreview) {
      return (
        <Tooltip title={props.viewMode ? "Edit" : "Preview"}>
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
  viewMode: PropTypes.bool,
  onClickNext: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func,
  nextText: PropTypes.string,
  prevText: PropTypes.string
};
