import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SubjectIcon from "@material-ui/icons/Subject";
import ImageIcon from "@material-ui/icons/Image";

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

export default function HackathonDetailsSpeedDial(props) {
  const classes = useStyles();
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
      <SpeedDialAction
        icon={<SubjectIcon />}
        tooltipTitle="Add Text"
        onClick={props.addText}
      />
      <SpeedDialAction
        icon={<ImageIcon />}
        tooltipTitle="Add Image"
        onClick={props.addImage}
      />
    </SpeedDial>
  );
}

HackathonDetailsSpeedDial.propTypes = {
  hidden: PropTypes.bool,
  addText: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired
};
