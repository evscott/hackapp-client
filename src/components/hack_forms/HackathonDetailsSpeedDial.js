import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SubjectIcon from "@material-ui/icons/Subject";
import ImageIcon from "@material-ui/icons/Image";
import RightSpeedDial from "../reusable/RightSpeedDial";

export default function HackathonDetailsSpeedDial(props) {
  return (
    <RightSpeedDial hidden={props.hidden}>
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
    </RightSpeedDial>
  );
}

HackathonDetailsSpeedDial.propTypes = {
  hidden: PropTypes.bool,
  addText: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired
};
