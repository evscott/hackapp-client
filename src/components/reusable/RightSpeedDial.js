import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

/** Styles for the component. */
const useStyles = makeStyles(theme => {
  return {
    speedDial: {
      position: "relative",
      top: -30,
      right: -25,
      marginBottom: -60
    },
    speedDialHidden: {
      position: "relative",
      top: -40,
      right: -25,
      marginBottom: -80
    },
    speedDialFab: {
      backgroundColor: theme.palette.secondary.main
    }
  };
});

/**
 * A speed dial component with options that pop out to the left side of the
 * dial. It positions itself on the right side of the screen using relative
 * positioning, making it overlap with components above and below it.
 */
export default function RightSpeedDial(props) {
  const classes = useStyles();
  // Sets whether or not it is showing all of its options.
  const [open, setOpen] = React.useState(false);

  return (
    <SpeedDial
      ariaLabel="Add Component"
      className={props.hidden ? classes.speedDialHidden : classes.speedDial}
      classes={{
        fab: classes.speedDialFab
      }}
      icon={<SpeedDialIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      hidden={props.hidden}
      direction="left"
    >
      {props.children}
    </SpeedDial>
  );
}

RightSpeedDial.propTypes = {
  // Whether or not to show the speed dial.
  hidden: PropTypes.bool
};
